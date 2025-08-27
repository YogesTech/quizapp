package com.yogesh.quizapp.services;

import com.yogesh.quizapp.dto.AttemptSummaryDTO;
import com.yogesh.quizapp.models.*;
import com.yogesh.quizapp.repositories.*;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.*;

@Service
public class AttemptService {
    private final QuizRepository quizRepo;
    private final QuestionRepository qRepo;
    private final AttemptRepository attemptRepo;

    public AttemptService(QuizRepository quizRepo, QuestionRepository qRepo, AttemptRepository attemptRepo) {
        this.quizRepo = quizRepo;
        this.qRepo = qRepo;
        this.attemptRepo = attemptRepo;
    }

    public QuizAttempt submitAttempt(Long quizId, User user, Map<Long, String> answers) {
        Quiz quiz = quizRepo.findById(quizId).orElseThrow();
        List<Question> questions = qRepo.findByQuizId(quizId);

        int score = 0;
        QuizAttempt attempt = QuizAttempt.builder()
                .quiz(quiz)
                .user(user)
                .startedAt(Instant.now())
                .submittedAt(Instant.now())
                .build();

        List<Answer> answerList = new ArrayList<>();
        for (Question q : questions) {
            String chosen = answers.get(q.getId());
            boolean correct = chosen != null && chosen.equalsIgnoreCase(q.getCorrectOption());
            if (correct)
                score++;

            Answer ans = Answer.builder()
                    .attempt(attempt)
                    .question(q)
                    .chosenOption(chosen)
                    .correct(correct)
                    .build();
            answerList.add(ans);
        }
        attempt.setScore(score);
        attempt.setAnswers(answerList);
        return attemptRepo.save(attempt);
    }

    public List<QuizAttempt> userAttempts(Long userId) {
        return attemptRepo.findByUserId(userId);
    }

    public List<AttemptSummaryDTO> userAttemptSummaries(Long userId) {
        return attemptRepo.findSummariesByUserId(userId);
    }
}
