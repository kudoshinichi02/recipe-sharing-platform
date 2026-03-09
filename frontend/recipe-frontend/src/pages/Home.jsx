import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Recipes</h1>

      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
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
        ))}
      </div>
    </div>
  );
}