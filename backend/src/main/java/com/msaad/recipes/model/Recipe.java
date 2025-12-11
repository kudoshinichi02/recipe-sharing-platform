package com.msaad.recipes.model;

import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User createdBy;
}
