package com.msaad.recipes.service;

import com.msaad.recipes.exception.UserException;
import com.msaad.recipes.model.User;
import com.msaad.recipes.model.VerificationToken;
import com.msaad.recipes.repository.UserRepository;
import com.msaad.recipes.repository.VerificationTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class EmailVerificationService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final EmailService emailService;


    public EmailVerificationService(UserRepository userRepository, VerificationTokenRepository tokenRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void sendVerification(User user) {

        VerificationToken vt = VerificationToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiresAt(Instant.now().plus(24, ChronoUnit.HOURS))
                .build();
        tokenRepository.save(vt);

        String link = baseUrl + "/api/auth/verify?token=" + vt.getToken();
        emailService.sendVerificationEmail(user.getEmail(), link);
    }

    @Transactional
    public void verify(String token) {
        VerificationToken vt = tokenRepository.findByToken(token)
                .orElseThrow(() -> new UserException("Invalid verification link"));

        if (vt.getExpiresAt().isBefore(Instant.now())) {
            throw new UserException("Verification link expired");
        }

        User user = vt.getUser();
        user.setVerified(true);
        userRepository.save(user);
        tokenRepository.delete(vt);
    }
}
