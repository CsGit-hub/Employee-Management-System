import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Supabase client (placeholders – replace in .env later)
const supabase = createClient(
  "https://bvhstgbxsxxjkysfktvy.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aHN0Z2J4c3h4amt5c2ZrdHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTExOTksImV4cCI6MjA3NDg4NzE5OX0.aVY6YzVjSjDyz1U6H728tnKoiAEvfAKwKsMnsexfwqI"
);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Get JWT token
    const token = data.session.access_token;

    // ⚡ For simplicity, we assume Supabase `user_metadata.role` holds the role ("ADMIN"/"EMPLOYEE")
    const userRole = data.user.user_metadata?.role || "EMPLOYEE";

    // Store in localStorage for route protection
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);

    // Redirect based on role
    if (userRole === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;
