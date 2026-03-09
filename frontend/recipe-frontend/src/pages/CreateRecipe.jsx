import { useState } from "react";
import api from "../api/axios";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      description,
      ingredients,
      instructions,
    };

    api
      .post("/recipes", newRecipe)
      .then((response) => {
        console.log("Recipe created:", response.data);
        alert("Recipe created successfully!");
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
      });
  };

  return (
    <div>
      <h1>Create Recipe</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients</label>
          <br />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div>
          <label>Instructions</label>
          <br />
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}