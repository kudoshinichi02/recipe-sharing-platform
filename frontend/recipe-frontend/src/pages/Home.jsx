import { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "General",
    "Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Dessert",
    "Breakfast"
  ];

  useEffect(() => {
    let url = "/recipes";
    if (selectedCategory !== "All") {
      url = `/recipes?category=${selectedCategory}`;
    }

    api.get(url)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [selectedCategory]);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchText = search.toLowerCase();
    return (
      recipe.title?.toLowerCase().includes(searchText) ||
      recipe.ingredients?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495521821757-a1efb6729352')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 20px",
          color: "white",
          textAlign: "center"
        }}
      >
        <h1 className="fw-bold display-4">
          🍽️ Discover & Share Recipes
        </h1>
        <p className="lead">
          Find your next favorite meal or share your own creations
        </p>
      </div>

      <div className="container mt-4">
        <h2 className="mb-4">All Recipes</h2>

        <div className="mb-4">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="🔍 Search by title or ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn rounded-pill ${
                selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredRecipes.length === 0 ? (
            <p className="text-center mt-5">No recipes found.</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}