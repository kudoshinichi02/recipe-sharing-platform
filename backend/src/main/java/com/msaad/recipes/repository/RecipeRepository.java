package com.msaad.recipes.repository;

import com.msaad.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByIngredientsContainingIgnoreCase(String ingredient);

}
