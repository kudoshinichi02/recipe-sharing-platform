import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    api
      .get("/recipes")
      .then((response) => {
        const userRecipes = response.data.filter(
          (recipe) => recipe.createdByUsername === username
        );

        setRecipes(userRecipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [username]);

  return (
    <div>
      <h1>My Recipes</h1>

      {recipes.length === 0 ? (
        <p>You have not created any recipes yet.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}