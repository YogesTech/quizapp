package com.yogesh.quizapp.controllers;

import com.yogesh.quizapp.models.Role;
import com.yogesh.quizapp.models.User;
import com.yogesh.quizapp.repositories.UserRepository;
import com.yogesh.quizapp.services.EmailService;
import com.yogesh.quizapp.services.JwtService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController
 * - /auth/register : creates user and sends welcome email (via Mailtrap SMTP)
 * - /auth/login : authenticates and returns JWT token
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    // === Dependencies injected by Spring ===
    private final UserRepository repo; // access users table
    private final PasswordEncoder encoder; // hash passwords
    private final AuthenticationManager auth; // authenticate credentials
    private final JwtService jwt; // issue/parse JWT
    private final EmailService emailService; // send emails

    public AuthController(UserRepository repo,
            PasswordEncoder encoder,
            AuthenticationManager auth,
            JwtService jwt,
            EmailService emailService) {
        this.repo = repo;
        this.encoder = encoder;
        this.auth = auth;
        this.jwt = jwt;
        this.emailService = emailService;
    }

    // === DTOs for request/response ===
    public record RegisterRequest(
            @NotBlank String name,
            @Email String email,
            @Size(min = 6) String password,
            @NotNull Role role) {
    }

    public record LoginRequest(@Email String email, @NotBlank String password) {
    }

    public record AuthResponse(String token) {
    }

    /**
     * Register a new user.
     * - Validates duplicate email
     * - Saves hashed password
     * - Sends a welcome email (Mailtrap inbox will receive it)
     */
    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest req) {
        // 1) Prevent duplicate email
        if (repo.findByEmail(req.email()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2) Persist user with encoded password
        repo.save(User.builder()
                .name(req.name())
                .email(req.email())
                .password(encoder.encode(req.password()))
                .role(req.role())
                .build());

        // 3) Send welcome email
        emailService.send(
                req.email(),
                "Welcome to QuizApp",
                "Hi " + req.name() + ", your account is ready. Enjoy taking quizzes!");
    }

    /**
     * Login and get a JWT.
     * - Verifies credentials using Spring Security
     * - Returns a signed JWT containing the user's role as a claim
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        // 1) Authenticate; throws if invalid
        auth.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        // 2) Create JWT with role claim
        var role = repo.findByEmail(req.email())
                .orElseThrow()
                .getRole()
                .name();

        String token = jwt.generate(req.email(), Map.of("role", role));
        return new AuthResponse(token);
    }
}
