import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };

    api
      .post("/auth/register", newUser)
      .then((response) => {
        console.log("User registered:", response.data);
        alert("Registration successful!");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;