import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {

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
      "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg",

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
    <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">

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

        <h5 className="card-title fw-bold">{recipe.title}</h5>

        <p className="card-text text-muted">
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
  );
}