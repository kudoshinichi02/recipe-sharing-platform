import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

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
    <div className="container mt-4">

      <h1 className="mb-4">My Recipes</h1>

      {recipes.length === 0 ? (
        <p>You have not created any recipes yet.</p>
      ) : (
        <div className="row g-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">

              <RecipeCard recipe={recipe} />

              {/* ✅ FIXED BUTTONS */}
              <div className="d-flex gap-2 mt-2">

                <button
                  className="btn btn-outline-warning w-50 rounded-pill"
                  onClick={() => navigate(`/edit/${recipe.id}`)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn btn-outline-danger w-50 rounded-pill"
                  onClick={() => handleDelete(recipe.id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}