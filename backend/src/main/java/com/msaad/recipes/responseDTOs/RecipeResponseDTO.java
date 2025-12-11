package com.msaad.recipes.responseDTOs;

import lombok.Builder;

@Builder
public record RecipeResponseDTO(
        Long id,
        String title,
        String description,
        String ingredients,
        String instructions,
        String createdByUsername
) {}
