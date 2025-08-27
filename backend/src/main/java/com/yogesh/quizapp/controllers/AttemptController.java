package com.yogesh.quizapp.controllers;

import com.yogesh.quizapp.dto.AttemptSummaryDTO;
import com.yogesh.quizapp.models.QuizAttempt;
import com.yogesh.quizapp.models.User;
import com.yogesh.quizapp.repositories.UserRepository;
import com.yogesh.quizapp.services.AttemptService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.*;

record AnswerRequest(Long questionId, String chosenOption) {
}

record AttemptRequest(List<AnswerRequest> answers) {
}

record AttemptResponse(Long attemptId, int score, int total, Date submittedAt) {
}

@RestController
@RequestMapping("/attempts")
public class AttemptController {
    private final AttemptService attemptService;
    private final UserRepository userRepo;

    public AttemptController(AttemptService attemptService, UserRepository userRepo) {
        this.attemptService = attemptService;
        this.userRepo = userRepo;
    }

    @PostMapping("/{quizId}/submit")
    public AttemptResponse submit(
            @PathVariable Long quizId,
            @RequestBody AttemptRequest req,
            @AuthenticationPrincipal(expression = "username") String email) {

        if (email == null)
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED, "Missing/invalid token");

        User user = userRepo.findByEmail(email).orElseThrow();
        Map<Long, String> answerMap = new HashMap<>();
        for (AnswerRequest a : req.answers()) {
            answerMap.put(a.questionId(), a.chosenOption());
        }

        QuizAttempt attempt = attemptService.submitAttempt(quizId, user, answerMap);
        return new AttemptResponse(
                attempt.getId(),
                attempt.getScore(),
                attempt.getAnswers().size(),
                Date.from(attempt.getSubmittedAt()));
    }

    @GetMapping("/my")
    public List<AttemptSummaryDTO> myAttempts(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();
        return attemptService.userAttemptSummaries(user.getId());
    }
}
