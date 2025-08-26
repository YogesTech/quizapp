package com.yogesh.quizapp.controllers;

import com.yogesh.quizapp.models.*;
import com.yogesh.quizapp.repositories.*;
import jakarta.validation.constraints.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

record QuizRequest(@NotBlank String title, String description, @NotNull Integer timeLimitSeconds) {
}

record QuestionRequest(@NotBlank String text, @NotBlank String optionA, @NotBlank String optionB,
        @NotBlank String optionC, @NotBlank String optionD,
        @Pattern(regexp = "[ABCD]") String correctOption) {
}

@RestController
@RequestMapping("/quizzes")
public class QuizController {
    private final QuizRepository quizRepo;
    private final QuestionRepository qRepo;

    public QuizController(QuizRepository quizRepo, QuestionRepository qRepo) {
        this.quizRepo = quizRepo;
        this.qRepo = qRepo;
    }

    @GetMapping
    public List<Quiz> list() {
        return quizRepo.findAll();
    }

    @GetMapping("/{id}")
    public Quiz one(@PathVariable Long id) {
        return quizRepo.findById(id).orElseThrow();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Quiz create(@RequestBody QuizRequest req) {
        return quizRepo.save(Quiz.builder()
                .title(req.title())
                .description(req.description())
                .timeLimitSeconds(req.timeLimitSeconds())
                .build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/questions")
    public Question addQuestion(@PathVariable Long id, @RequestBody QuestionRequest req) {
        Quiz quiz = quizRepo.findById(id).orElseThrow();
        Question q = Question.builder()
                .quiz(quiz)
                .text(req.text())
                .optionA(req.optionA())
                .optionB(req.optionB())
                .optionC(req.optionC())
                .optionD(req.optionD())
                .correctOption(req.correctOption())
                .build();
        return qRepo.save(q);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        quizRepo.deleteById(id);
    }
}
