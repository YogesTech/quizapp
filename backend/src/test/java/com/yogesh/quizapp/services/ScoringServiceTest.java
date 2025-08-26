package com.yogesh.quizapp.services;

import com.yogesh.quizapp.models.Answer;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class ScoringServiceTest {

    @Test
    void calculates_score_correctly() {
        var a1 = Answer.builder().correct(true).build();
        var a2 = Answer.builder().correct(false).build();
        var a3 = Answer.builder().correct(true).build();

        int score = (int) List.of(a1, a2, a3).stream().filter(Answer::isCorrect).count();
        assertEquals(2, score);
    }
}
