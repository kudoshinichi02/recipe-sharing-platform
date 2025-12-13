package com.msaad.recipes.service;

import com.msaad.recipes.exception.RecipeException;
import com.msaad.recipes.exception.UserException;
import com.msaad.recipes.mapper.RecipeMapper;
import com.msaad.recipes.model.Recipe;
import com.msaad.recipes.model.User;
import com.msaad.recipes.repository.RecipeRepository;
import com.msaad.recipes.repository.UserRepository;
import com.msaad.recipes.requestDTOs.RecipeRequestDTO;
import com.msaad.recipes.responseDTOs.RecipeResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final RecipeMapper recipeMapper;

    public RecipeService(RecipeRepository recipeRepository,
                         UserRepository userRepository,
                         RecipeMapper recipeMapper) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.recipeMapper = recipeMapper;
    }

    public RecipeResponseDTO createRecipe(RecipeRequestDTO dto) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserException("Authenticated user not found"));

        if (dto.title() == null || dto.title().isBlank()) {
            throw new RecipeException("Title must not be empty");
        }

        if (dto.description() == null || dto.description().isBlank()) {
            throw new RecipeException("Description must not be empty");
        }

        if (dto.ingredients() == null || dto.ingredients().isBlank()) {
            throw new RecipeException("Ingredients must not be empty");
        }

        if (dto.instructions() == null || dto.instructions().isBlank()) {
            throw new RecipeException("Instructions must not be empty");
        }

        Recipe recipe = recipeMapper.toEntity(dto, user);

        Recipe savedRecipe = recipeRepository.save(recipe);

        return recipeMapper.toResponse(savedRecipe);
    }

    public List<RecipeResponseDTO> getAllRecipes() {
        return recipeRepository.findAll()
                .stream()
                .map(recipeMapper::toResponse)
                .toList();
    }

    public Page<RecipeResponseDTO> getAllRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipeRepository.findAll(pageable)
                .map(recipeMapper::toResponse);
    }


    public RecipeResponseDTO getRecipeById(Long id) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RecipeException("Recipe with ID " + id + " not found"));

        return recipeMapper.toResponse(recipe);
    }

    public List<RecipeResponseDTO> searchByIngredient(String ingredient) {

        if (ingredient == null || ingredient.isBlank()) {
            throw new RecipeException("Ingredient must not be empty");
        }

        List<Recipe> recipes = recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);

        return recipes.stream()
                .map(recipeMapper::toResponse)
                .toList();
    }

}
