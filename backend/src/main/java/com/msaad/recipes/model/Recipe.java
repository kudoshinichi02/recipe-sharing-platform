package com.msaad.recipes.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    @Column(length = 5000)
    private String ingredients;

    @Column(length = 5000)
    private String instructions;

    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User createdBy;

    @ManyToMany(mappedBy = "favoriteRecipes")
    @JsonIgnore
    private Set<User> favoritedBy = new HashSet<>();
}