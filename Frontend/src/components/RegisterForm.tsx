// src/components/RegisterForm.tsx
import React, { useState } from "react";
import "../styles/FormStyles.css";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ register, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(username, password);
      await login(username, password);
      navigate("/profile");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
