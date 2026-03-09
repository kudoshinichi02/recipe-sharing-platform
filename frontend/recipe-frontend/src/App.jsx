import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </>
  );
}

export default App;