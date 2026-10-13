package com.msaad.recipes.controller;

import com.msaad.recipes.requestDTOs.UserRequestDTO;
import com.msaad.recipes.responseDTOs.UserResponseDTO;
import com.msaad.recipes.service.EmailVerificationService;
import com.msaad.recipes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final EmailVerificationService emailVerificationService;

    public AuthController(UserService userService, EmailVerificationService emailVerificationService) {
        this.userService = userService;
        this.emailVerificationService = emailVerificationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRequestDTO dto){
        UserResponseDTO createdUser = userService.register(dto);
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token) {
        emailVerificationService.verify(token);
        return ResponseEntity.ok("Email verified. You can now log in.");
    }
}
