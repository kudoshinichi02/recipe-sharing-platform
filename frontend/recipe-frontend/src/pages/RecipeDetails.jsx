import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api
      .get(`/recipes/${id}`)
      .then((response) => {
        console.log("Recipe details:", response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>

      <h3>Description</h3>
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}