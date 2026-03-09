import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {username ? (
        <>
          {" | "}
          <Link to="/create">Create Recipe</Link>
          {" | "}
          <Link to="/my-recipes">My Recipes</Link>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}