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
    "Spaghetti Carbonara":
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9",
    "Chicken Curry":
      "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg",
    "Beef Tacos":
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    "Pancakes":
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    "Greek Salad":
      "https://hips.hearstapps.com/hmg-prod/images/greek-salad-index-642f292397bbf.jpg",
    "Tomato Soup":
      "https://www.allrecipes.com/thmb/EGp48npVJqDku38H1CFWwgwfAmM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57661-tomato-bisque-iii-VAT-007-4x3.jpg",
    "Pizza":
      "https://images.unsplash.com/photo-1548365328-9f547fb0953c",
    "Fried Rice":
      "https://www.everydayeasyeats.com/wp-content/uploads/2016/06/Chinese-Fried-Rice-2.jpg",
    "Grilled Cheese":
      "https://www.allrecipes.com/thmb/pnEUcAXDg5GUJ77fUDzZp41NWkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-238891.jpg",
    "Caesar Salad":
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9"
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061";

  const image = imageMap[recipe.title] || defaultImage;

  return (
    <div className="container mt-5">

      <div className="card shadow border-0 rounded-4 overflow-hidden">

        {/* IMAGE */}
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

          {/* TITLE */}
          <h2 className="fw-bold mb-3">{recipe.title}</h2>

          {/* AUTHOR */}
          <p className="text-muted mb-4">
            👨‍🍳 By {recipe.createdByUsername}
          </p>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>
            <p>{recipe.description}</p>
          </div>

          {/* INGREDIENTS */}
          <div className="mb-4">
            <h5 className="fw-bold">Ingredients</h5>
            <p>{recipe.ingredients}</p>
          </div>

          {/* INSTRUCTIONS */}
          <div>
            <h5 className="fw-bold">Instructions</h5>
            <p>{recipe.instructions}</p>
          </div>

        </div>
      </div>

    </div>
  );
}