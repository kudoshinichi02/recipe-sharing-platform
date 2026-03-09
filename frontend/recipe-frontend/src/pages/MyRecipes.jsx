import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    api
      .delete(`/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <div>
      <h1>My Recipes</h1>

      {recipes.length === 0 ? (
        <p>You have not created any recipes yet.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {recipe.title}{" "}
              <button onClick={() => navigate(`/edit/${recipe.id}`)}>
                Edit
              </button>{" "}
              <button onClick={() => handleDelete(recipe.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}