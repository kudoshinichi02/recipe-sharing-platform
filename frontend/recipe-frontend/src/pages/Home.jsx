import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Home() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        All Recipes
      </h1>

      <div className="row">

        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}

      </div>

    </div>
  );
}