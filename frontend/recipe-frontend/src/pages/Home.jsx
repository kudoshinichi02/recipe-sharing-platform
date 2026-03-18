import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Home() {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  // ✅ Improved filter (title + ingredients)
  const filteredRecipes = recipes.filter((recipe) => {
    const searchText = search.toLowerCase();

    const titleMatch =
      recipe.title?.toLowerCase().includes(searchText);

    const ingredientsMatch =
      recipe.ingredients?.toLowerCase().includes(searchText);

    return titleMatch || ingredientsMatch;
  });

  return (
    <div className="container mt-4">

      <h1 className="mb-4">All Recipes</h1>

      {/* ✅ SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="🔍 Search by title or ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">

        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))
        )}

      </div>

    </div>
  );
}