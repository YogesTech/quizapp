package com.yogesh.quizapp.models;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    @JsonIgnore
    private Quiz quiz;

    @Column(length = 1000)
    private String text;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    @Column(length = 1) // "A","B","C","D"
    private String correctOption;
}
