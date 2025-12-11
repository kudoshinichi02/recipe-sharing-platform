package com.msaad.recipes.controller;

import com.msaad.recipes.requestDTOs.RecipeRequestDTO;
import com.msaad.recipes.responseDTOs.RecipeResponseDTO;
import com.msaad.recipes.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDTO> createRecipe(@RequestBody RecipeRequestDTO dto) {

        RecipeResponseDTO response = recipeService.createRecipe(dto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
