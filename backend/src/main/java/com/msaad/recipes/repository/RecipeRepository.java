package com.msaad.recipes.repository;

import com.msaad.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByIngredientsContainingIgnoreCase(String ingredient);
    List<Recipe> findByCreatedByUsername(String username);
    List<Recipe> findByCategoryIgnoreCase(String category);

    @Modifying
    @Query(value = "DELETE FROM user_favorites WHERE recipe_id = :recipeId", nativeQuery = true)
    void removeAllFavoritesForRecipe(Long recipeId);
}