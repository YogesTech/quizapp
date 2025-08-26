package com.yogesh.quizapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yogesh.quizapp.models.Role;
import com.yogesh.quizapp.models.User;
import com.yogesh.quizapp.repositories.UserRepository;
import com.yogesh.quizapp.services.EmailService;
import com.yogesh.quizapp.services.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    MockMvc mvc;
    @Autowired
    ObjectMapper om;

    @MockitoBean
    UserRepository repo;

    @MockitoBean
    JwtService jwtService;

    @MockitoBean
    EmailService emailService;

    record RegisterRequest(String name, String email, String password, Role role) {
    }

    @Test
    void register_ok_when_email_free() throws Exception {
        Mockito.when(repo.findByEmail("t@t.com")).thenReturn(Optional.empty());
        var body = new RegisterRequest("t", "t@t.com", "pass", Role.PARTICIPANT);

        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(body)))
                .andExpect(status().isOk());
    }

    @Test
    void register_409_when_email_taken() throws Exception {
        Mockito.when(repo.findByEmail("t@t.com")).thenReturn(
                Optional.of(User.builder().email("t@t.com").build()));
        var body = new RegisterRequest("t", "t@t.com", "pass", Role.PARTICIPANT);

        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(body)))
                .andExpect(status().isConflict());
    }
}
