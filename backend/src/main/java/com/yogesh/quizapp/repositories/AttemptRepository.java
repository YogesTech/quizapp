package com.yogesh.quizapp.repositories;

import com.yogesh.quizapp.models.QuizAttempt;
import com.yogesh.quizapp.dto.AttemptSummaryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserId(Long userId);

    @Query("""
              select new com.yogesh.quizapp.dto.AttemptSummaryDTO(
                a.id, a.score, q.id, q.title
              )
              from QuizAttempt a
              join a.quiz q
              where a.user.id = :userId
              order by a.submittedAt desc
            """)
    List<AttemptSummaryDTO> findSummariesByUserId(@Param("userId") Long userId);
}
