package com.yogesh.quizapp.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${MAILTRAP_API_TOKEN}")
    private String apiToken;

    private final RestTemplate rest = new RestTemplate();

    public void send(String to, String subject, String body) {
        String url = "https://send.api.mailtrap.io/api/send";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiToken);

        Map<String, Object> payload = Map.of(
                "from", Map.of("email", "hello@demomailtrap.co", "name", "QuizApp"),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "text", body,
                "category", "QuizApp");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        rest.postForEntity(url, entity, String.class);
    }
}
