import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api
      .get("/recipes")
      .then((response) => {
        console.log("Recipes response:", response.data);
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}