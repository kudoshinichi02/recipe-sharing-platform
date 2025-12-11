package com.msaad.recipes.mapper;

import com.msaad.recipes.model.Recipe;
import com.msaad.recipes.model.User;
import com.msaad.recipes.requestDTOs.RecipeRequestDTO;
import com.msaad.recipes.responseDTOs.RecipeResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class RecipeMapper {

    public Recipe toEntity(RecipeRequestDTO dto, User user) {
        return Recipe.builder()
                .title(dto.title())
                .description(dto.description())
                .ingredients(dto.ingredients())
                .instructions(dto.instructions())
                .createdBy(user)
                .build();
    }

    public RecipeResponseDTO toResponse(Recipe recipe) {
        return RecipeResponseDTO.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .description(recipe.getDescription())
                .ingredients(recipe.getIngredients())
                .instructions(recipe.getInstructions())
                .createdByUsername(recipe.getCreatedBy().getUsername())
                .build();
    }
}
