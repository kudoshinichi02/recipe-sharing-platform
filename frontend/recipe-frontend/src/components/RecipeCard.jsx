import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {

  const imageMap = {
    "Spaghetti Carbonara":
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9",

    "Chicken Curry":
      "https://images.unsplash.com/photo-1604908176997-4319c73b1b42",

    "Beef Tacos":
      "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c",

    "Pancakes":
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93",

    "Greek Salad":
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",

    "Tomato Soup":
      "https://images.unsplash.com/photo-1547592180-85f173990554"
  };

  const image =
    imageMap[recipe.title] ||
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src={image}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h5 className="card-title">{recipe.title}</h5>

          <p className="card-text">
            {recipe.description}
          </p>

          <p className="text-muted small">
            By {recipe.createdByUsername}
          </p>

          <Link
            to={`/recipes/${recipe.id}`}
            className="btn btn-primary"
          >
            View Recipe
          </Link>

        </div>
      </div>
    </div>
  );
}