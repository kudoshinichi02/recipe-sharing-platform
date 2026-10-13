package com.msaad.recipes.service;

import com.msaad.recipes.exception.UserException;
import com.msaad.recipes.mapper.UserMapper;
import com.msaad.recipes.model.User;
import com.msaad.recipes.repository.UserRepository;
import com.msaad.recipes.requestDTOs.UserRequestDTO;
import com.msaad.recipes.responseDTOs.UserResponseDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final EmailVerificationService emailVerificationService;


    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserMapper userMapper, EmailVerificationService emailVerificationService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.emailVerificationService = emailVerificationService;
    }

    public UserResponseDTO register(UserRequestDTO userRequestDTO) {

        if (userRequestDTO.username() == null || userRequestDTO.username().isBlank()) {
            throw new UserException("Username must not be empty");
        }

        if (userRequestDTO.password() == null || userRequestDTO.password().isBlank()) {
            throw new UserException("Password must not be empty");
        }

        if (userRequestDTO.email() == null || userRequestDTO.email().isBlank()){
            throw new UserException("Email must not be empty");
        }

        if (userRepository.findByUsername(userRequestDTO.username()).isPresent()) {
            throw new UserException("Username already exists");
        }

        if (userRepository.existsByEmail(userRequestDTO.email())) {
            throw new UserException("Email already exists");
        }

        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        user.setVerified(false);
        User saved = userRepository.save(user);
        emailVerificationService.sendVerification(saved);
        return userMapper.toResponse(saved);
    }
}
