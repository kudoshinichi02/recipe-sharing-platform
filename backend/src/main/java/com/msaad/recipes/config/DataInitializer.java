package com.msaad.recipes.config;

import com.msaad.recipes.model.Recipe;
import com.msaad.recipes.model.User;
import com.msaad.recipes.repository.RecipeRepository;
import com.msaad.recipes.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(UserRepository userRepository, RecipeRepository recipeRepository) {
        return args -> {

            if (userRepository.count() == 0) {

                User user = User.builder()
                        .username("demo")
                        .password("$2a$10$Dow1g6H1B9UjVJ1m2yqH0u6G9S0cVf2P7nJqT1jQ8L3c4L1WZQO9e") // password: demo
                        .role("USER")
                        .favoriteRecipes(new HashSet<>())
                        .build();

                userRepository.save(user);

                recipeRepository.save(Recipe.builder()
                        .title("Spaghetti Carbonara")
                        .description("Classic Italian pasta with creamy sauce")
                        .ingredients("Spaghetti, Eggs, Parmesan, Pancetta, Pepper")
                        .instructions("Cook pasta, mix eggs and cheese, combine with pancetta.")
                        .category("Italian")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Chicken Curry")
                        .description("Spicy Indian chicken curry")
                        .ingredients("Chicken, Onion, Garlic, Ginger, Curry Powder")
                        .instructions("Saute onions, add chicken, spices, simmer.")
                        .category("Indian")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Beef Tacos")
                        .description("Mexican style tacos")
                        .ingredients("Beef, Taco shells, Lettuce, Tomato, Cheese")
                        .instructions("Cook beef with spices, assemble tacos.")
                        .category("Mexican")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Pancakes")
                        .description("Fluffy breakfast pancakes")
                        .ingredients("Flour, Eggs, Milk, Sugar")
                        .instructions("Mix ingredients and cook on pan.")
                        .category("Breakfast")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Greek Salad")
                        .description("Fresh Mediterranean salad")
                        .ingredients("Tomatoes, Cucumber, Feta, Olives")
                        .instructions("Mix ingredients and drizzle olive oil.")
                        .category("General")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Tomato Soup")
                        .description("Warm creamy tomato soup")
                        .ingredients("Tomatoes, Cream, Onion, Garlic")
                        .instructions("Cook tomatoes and blend.")
                        .category("General")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Fried Rice")
                        .description("Quick Asian fried rice")
                        .ingredients("Rice, Eggs, Soy sauce, Vegetables")
                        .instructions("Stir fry everything together.")
                        .category("Chinese")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Grilled Cheese")
                        .description("Simple grilled cheese sandwich")
                        .ingredients("Bread, Cheese, Butter")
                        .instructions("Grill sandwich until golden.")
                        .category("General")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Caesar Salad")
                        .description("Classic Caesar salad")
                        .ingredients("Lettuce, Croutons, Parmesan, Caesar dressing")
                        .instructions("Mix everything together.")
                        .category("Italian")
                        .createdBy(user)
                        .build());

                recipeRepository.save(Recipe.builder()
                        .title("Chocolate Cake")
                        .description("Rich chocolate dessert")
                        .ingredients("Flour, Cocoa, Eggs, Sugar")
                        .instructions("Bake in oven at 180C.")
                        .category("Dessert")
                        .createdBy(user)
                        .build());
            }
        };
    }
}