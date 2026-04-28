package com.msaad.recipes.controller;

import com.msaad.recipes.requestDTOs.RecipeRequestDTO;
import com.msaad.recipes.responseDTOs.RecipeResponseDTO;
import com.msaad.recipes.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
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

    @GetMapping
    public ResponseEntity<List<RecipeResponseDTO>> getAllRecipes(@RequestParam(required = false) String category) {
        List<RecipeResponseDTO> recipes;
        if (category != null && !category.isBlank()) {
            recipes = recipeService.getRecipesByCategory(category);
        } else {
            recipes = recipeService.getAllRecipes();
        }
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDTO> getRecipeById(@PathVariable Long id) {
        RecipeResponseDTO recipe = recipeService.getRecipeById(id);
        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<RecipeResponseDTO>> getRecipesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<RecipeResponseDTO> recipes = recipeService.getAllRecipes(page, size);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RecipeResponseDTO>> searchByIngredient(@RequestParam String ingredient) {
        List<RecipeResponseDTO> results = recipeService.searchByIngredient(ingredient);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping("/my")
    public ResponseEntity<List<RecipeResponseDTO>> getMyRecipes() {
        List<RecipeResponseDTO> recipes = recipeService.getMyRecipes();
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<RecipeResponseDTO>> getFavoriteRecipes() {
        List<RecipeResponseDTO> favorites = recipeService.getFavoriteRecipes();
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long id) {
        recipeService.toggleFavorite(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponseDTO> updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeRequestDTO dto) {
        RecipeResponseDTO updatedRecipe = recipeService.updateRecipe(id, dto);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }
}