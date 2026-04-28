import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    if (loggedInUser) {
      api.get("/recipes/favorites")
        .then((response) => {
          const favorites = response.data;
          const found = favorites.some((fav) => fav.id === recipe.id);
          setIsFavorite(found);
        })
        .catch((err) => console.error("Error checking favorites", err));
    }
  }, [recipe.id, loggedInUser]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    if (!loggedInUser) {
      alert("Please login to favorite recipes!");
      return;
    }

    api.post(`/recipes/${recipe.id}/favorite`)
      .then(() => {
        setIsFavorite(!isFavorite);
      })
      .catch((err) => console.error("Error toggling favorite", err));
  };

  const imageMap = {
    "Spaghetti Carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    "Chicken Curry": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    "Beef Tacos": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    "Pancakes": "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    "Greek Salad": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    "Tomato Soup": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsliLgEx2XpvucLCZtUtyunHZdb3X827c5w&s",
    "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    "Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    "Grilled Cheese": "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d",
    "Caesar Salad": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    "Chocolate Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  };

  const defaultImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061";
  const image = imageMap[recipe.title] || defaultImage;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">
        
        <button 
          onClick={toggleFavorite}
          className="btn position-absolute top-0 end-0 m-2 shadow-sm"
          style={{ 
            backgroundColor: "white", 
            borderRadius: "50%", 
            width: "40px", 
            height: "40px", 
            zIndex: 10,
            border: "none" 
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <img
          src={image}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block"
          }}
        />

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold m-0">{recipe.title}</h5>
            <span className="badge bg-secondary rounded-pill small">
              {recipe.category || "General"}
            </span>
          </div>

          <p className="card-text text-muted small">
            {recipe.description}
          </p>

          <p className="text-secondary small mt-auto">
            👨‍🍳 {recipe.createdByUsername}
          </p>

          <Link
            to={`/recipes/${recipe.id}`}
            className="btn btn-dark w-100 mt-2 rounded-pill"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}