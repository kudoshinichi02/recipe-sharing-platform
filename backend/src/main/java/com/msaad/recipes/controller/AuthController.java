package com.msaad.recipes.controller;

import com.msaad.recipes.requestDTOs.UserRequestDTO;
import com.msaad.recipes.responseDTOs.UserResponseDTO;
import com.msaad.recipes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRequestDTO dto){
        UserResponseDTO createdUser = userService.register(dto);
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }
}
