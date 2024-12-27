import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // To store the success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.message) {
      // Show success message and redirect to rides list after a delay
      setSuccessMessage("Registration successful! Redirecting to rides...");
      setTimeout(() => navigate("/rides"), 2000); // Redirect after 2 seconds
    } else {
      alert(result.error || "An error occurred.");
    }
  };

  return (
    <div className="registration-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
