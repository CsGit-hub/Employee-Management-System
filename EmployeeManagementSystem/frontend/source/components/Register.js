import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Supabase client 
const supabase = createClient(
  "https://bvhstgbxsxxjkysfktvy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aHN0Z2J4c3h4amt5c2ZrdHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTExOTksImV4cCI6MjA3NDg4NzE5OX0.aVY6YzVjSjDyz1U6H728tnKoiAEvfAKwKsMnsexfwqI"
);

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE"); // default role
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Call Supabase signup with metadata for role
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // Store role inside user_metadata
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Redirect user to login after successful registration
    alert("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Dropdown for selecting role */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/">Login here</a>
      </p>
    </div>
  );
}

export default Register;
