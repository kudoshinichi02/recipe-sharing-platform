import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/recipes/favorites")
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">❤️ My Favorite Recipes</h1>
        <p className="text-muted">The collection of meals you love the most.</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {recipes.length === 0 ? (
            <div className="text-center mt-5">
              <p className="lead">You haven't favorited any recipes yet.</p>
              <a href="/" className="btn btn-dark rounded-pill">Explore Recipes</a>
            </div>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      )}
    </div>
  );
}