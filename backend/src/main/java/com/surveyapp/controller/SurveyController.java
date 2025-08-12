import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.surveyapp.dto.survey.SurveyRequest;
import com.surveyapp.dto.survey.SurveyResponse;
import com.surveyapp.service.SurveyService;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<SurveyResponse> createSurvey(@RequestBody SurveyRequest surveyRequest) {
        SurveyResponse surveyResponse = surveyService.createSurvey(surveyRequest);
        return ResponseEntity.ok(surveyResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyResponse> getSurvey(@PathVariable Long id) {
        SurveyResponse surveyResponse = surveyService.getSurveyById(id);
        return ResponseEntity.ok(surveyResponse);
    }

    @GetMapping
    public ResponseEntity<List<SurveyResponse>> getAllSurveys() {
        List<SurveyResponse> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyResponse> updateSurvey(@PathVariable Long id, @RequestBody SurveyRequest surveyRequest) {
        SurveyResponse surveyResponse = surveyService.updateSurvey(id, surveyRequest);
        return ResponseEntity.ok(surveyResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.noContent().build();
    }
}