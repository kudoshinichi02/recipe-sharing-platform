import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-5">Loading...</p>;
  }

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

  const defaultImage =
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061";

  const image = imageMap[recipe.title] || defaultImage;

  return (
    <div className="container mt-5">
      <div className="card shadow border-0 rounded-4 overflow-hidden">
        <img
          src={image}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover"
          }}
        />
        <div className="card-body p-4">
          <h2 className="fw-bold mb-3">{recipe.title}</h2>
          <p className="text-muted mb-4">
            👨‍🍳 By {recipe.createdByUsername}
          </p>
          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>
            <p>{recipe.description}</p>
          </div>
          <div className="mb-4">
            <h5 className="fw-bold">Ingredients</h5>
            <p>{recipe.ingredients}</p>
          </div>
          <div>
            <h5 className="fw-bold">Instructions</h5>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}