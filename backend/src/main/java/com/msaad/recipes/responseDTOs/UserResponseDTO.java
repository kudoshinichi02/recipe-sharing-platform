package com.msaad.recipes.responseDTOs;

import lombok.Builder;

@Builder
public record UserResponseDTO(
        Long id,
        String username,
        String role
) {}
