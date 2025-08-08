# Team Member Literature Review Instructions

## Overview
Each team member is required to review 5 recent literature papers or existing works related to our project (total 15 papers for the team). This helps us understand current research, identify limitations, and improve our solution.

## Steps for Each Member
1. **Find 5 recent papers (last 2 years)**
   - Use sources like Google Scholar, IEEE Xplore, etc.
   - Focus on topics: sentiment analysis, survey automation, AI question generation, ML/DL applications.

2. **Fill out the summary table in the Excel file**
   - For each paper, complete these columns:
     - Title
     - Objective/Methodology
     - Dataset
     - Evaluation Metric
     - Result
     - Limitation
     - Reviewed By (your name)

3. **Read abstract and conclusion**
   - Note main findings and limitations.

4. **Identify limitations**
   - Think about how our project can address these.

5. **Share your summaries**
   - Add your entries to the shared Excel file: `Literature_Review_Summary.xlsx`
   - Make sure your name is in the 'Reviewed By' column.

## Submission
- All team entries will be combined for final submission.
- This review will help guide our project and final report.

---
## 🔍 Detailed Search Strategy (Add to Your Process)

### Role-Based Topic Allocation
| Member | Focus Areas |
|--------|-------------|
| Member1 | AI survey question generation, adaptive question sequencing (RL), multilingual generation |
| Member2 | Sentiment analysis of survey / free-text feedback, answer quality/spam detection, bias in generated questions |
| Member3 | Data pipelines, privacy & differential privacy, active learning loops, model distillation / deployment efficiency |

### Core Databases / Sources
- Google Scholar (broad + citation chaining)
- IEEE Xplore (systems, privacy, RL applications)
- ACM Digital Library (HCI, interactive systems)
- ACL Anthology (NLP / LLM papers)
- arXiv (latest preprints – verify peer review status)

### Query Patterns (Use Year Filter 2024–2025)
Copy/adapt these in Google Scholar (set Custom Range):
- "survey question generation" AND (LLM OR "large language model") 2024..2025
- ("adaptive survey" OR "dynamic survey") AND ("reinforcement learning") 2024..2025
- "sentiment analysis" AND ("student feedback" OR "survey responses") 2024..2025
- ("answer quality" OR "response quality") AND survey AND NLP 2024..2025
- "bias" AND ("generated questions" OR "question generation") 2024..2025
- "differential privacy" AND (survey OR questionnaire) 2024..2025
- ("active learning" AND sentiment AND survey) 2024..2025
- (distillation OR "knowledge distillation") AND (sentiment OR survey) 2024..2025
- "data pipeline" AND (survey OR feedback) 2024..2025

Tips:
- Use quotes for exact phrases.
- Use OR to broaden, AND to narrow.
- Try intitle:"survey question" for more specific hits.

### Selection Criteria (Keep a Paper If):
- Published in 2024 or 2025 (conference, journal, or reputable preprint).
- Clear methodology (e.g., transformer fine-tune, RL policy, DP mechanism).
- Reports evaluation metrics (F1, Accuracy, BLEU, human rating, latency, bias score, etc.).
- States at least one limitation you can leverage (e.g., small dataset, hallucination, cost, bias, lack of multilingual support).

### Exclusion Guidelines:
- General survey/review articles (unless needed for context; limit to 1 per member if used).
- Non-academic blog posts / marketing material.
- "Survey" meaning review (of field) instead of questionnaire (unless intentionally selecting a review).

### Extraction Checklist (Use for Each Row in the Sheet)
| Field | What to Capture |
|-------|------------------|
| Title | Exact title of paper |
| Objective/Methodology | 1 concise sentence (e.g., "Fine-tunes mT5 for multilingual question generation") |
| Dataset | Name or description (public corpus, synthetic, institutional feedback) |
| Evaluation Metric | Primary metrics (e.g., F1=0.90; BLEU=32; Human relevance 4.3/5) |
| Result | Best numeric outcome or qualitative summary |
| Limitation | Directly stated or evident weakness |
| Reviewed By | Your name |
| (If using extended CSV) Year / DOI / Notes |

### Workflow Recommendation
1. Run 2–3 queries per assigned topic.
2. Open 10–15 candidate tabs; discard quickly if off-topic.
3. Export citation to Zotero / Mendeley (optional but recommended).
4. Fill spreadsheet row immediately to avoid duplication.
5. Post a daily update (list of added titles) in team chat to prevent overlap.

### Citation Tracking
Maintain a separate BibTeX or reference manager collection named: `Survey_Automation_Project_2025`.

### Quality Control Pass
After all 15 rows filled:
- Check for duplicates.
- Ensure each row has a metric & limitation.
- Replace any placeholder or vague result with a concrete number if available.

### Common Limitations to Look For (Examples)
- Limited dataset size / domain specificity
- High computation or latency cost
- Hallucination or factual inconsistency in generated questions
- Bias across demographics or language
- Lack of multilingual or cross-domain generalization
- Privacy risks / no DP applied
- Manual labeling cost (active learning motivation)

### How Our Project Addresses Them
Map each limitation to a mitigation (e.g., add DP layer, active learning loop, multilingual prompt strategy, lightweight distilled model for deployment).

---
If you have questions or need help refining queries, ask the team lead.
