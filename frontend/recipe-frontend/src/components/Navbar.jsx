import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          RecipeShare
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {username && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create Recipe
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-recipes">
                    My Recipes
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">
                    Favorites ❤️
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {!username ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    Hello, {username}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}