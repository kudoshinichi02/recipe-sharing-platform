import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    api.get(`/recipes/${id}`).then((response) => {
      const recipe = response.data;

      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      description,
      ingredients,
      instructions,
    };

    api
      .put(`/recipes/${id}`, updatedRecipe)
      .then(() => {
        alert("Recipe updated successfully!");
        navigate("/my-recipes");
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  return (
    <div>
      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br />

        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <br />

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}