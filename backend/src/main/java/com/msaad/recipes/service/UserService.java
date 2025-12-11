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

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public UserResponseDTO register(UserRequestDTO userRequestDTO) {

        if (userRequestDTO.username() == null || userRequestDTO.username().isBlank()) {
            throw new UserException("Username must not be empty");
        }

        if (userRequestDTO.password() == null || userRequestDTO.password().isBlank()) {
            throw new UserException("Password must not be empty");
        }

        if (userRepository.findByUsername(userRequestDTO.username()).isPresent()) {
            throw new UserException("Username already exists");
        }

        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        return userMapper.toResponse(userRepository.save(user));
    }
}
