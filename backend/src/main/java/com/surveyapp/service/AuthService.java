package com.surveyapp.service;

import com.surveyapp.dto.auth.AuthResponse;
import com.surveyapp.dto.auth.LoginRequest;
import com.surveyapp.dto.auth.RegisterRequest;
import com.surveyapp.entity.User;
import com.surveyapp.exception.CustomExceptions;
import com.surveyapp.repository.UserRepository;
import com.surveyapp.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomExceptions.UserAlreadyExistsException("User already exists with this email.");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles("ROLE_USER");
        userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomExceptions.UserNotFoundException("User not found."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomExceptions.InvalidCredentialsException("Invalid email or password.");
        }
        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        return new AuthResponse(token);
    }
}