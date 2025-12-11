package com.msaad.recipes.requestDTOs;

public record RecipeRequestDTO(
        String title,
        String description,
        String ingredients,
        String instructions
) {}
