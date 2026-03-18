import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    api.post("/auth/register", {
      username,
      password,
    })
      .then(() => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch(() => {
        alert("Registration failed");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "400px" }}>

        <h2 className="text-center mb-4 fw-bold">📝 Register</h2>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill mt-3"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}