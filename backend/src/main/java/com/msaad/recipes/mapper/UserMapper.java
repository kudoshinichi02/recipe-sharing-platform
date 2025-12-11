package com.msaad.recipes.mapper;

import com.msaad.recipes.requestDTOs.UserRequestDTO;
import com.msaad.recipes.responseDTOs.UserResponseDTO;
import com.msaad.recipes.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRequestDTO dto) {
        return User.builder()
                .username(dto.username())
                .password(dto.password())
                .build();
    }

    public UserResponseDTO toResponse(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
