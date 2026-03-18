import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateRecipe() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/recipes", {
      title,
      description,
      ingredients,
      instructions,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "600px" }}>

        <h2 className="text-center mb-4 fw-bold">🍳 Create Recipe</h2>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control rounded-4"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the recipe..."
              required
            />
          </div>

          {/* INGREDIENTS */}
          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <textarea
              className="form-control rounded-4"
              rows="3"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. chicken, rice, spices..."
              required
            />
          </div>

          {/* INSTRUCTIONS */}
          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              className="form-control rounded-4"
              rows="4"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe how to prepare the recipe..."
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill mt-3"
          >
            Create Recipe
          </button>

        </form>

      </div>

    </div>
  );
}