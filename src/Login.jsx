import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Check login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  // ✅ Login
  const onSubmit = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
    setCurrentUser(data);

    alert("Login Successful");

    // ✅ IMPORTANT: reload so navbar updates
    window.location.href = "/"; 
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    alert("Logged out successfully");

    // ✅ refresh UI
    window.location.reload();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* ✅ IF LOGGED IN */}
        {currentUser ? (
          <>
            <h2>
              Welcome, {currentUser.email.split("@")[0]}
            </h2>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* ✅ LOGIN FORM */}
            <h2>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                required
              />

              <button type="submit">Login</button>
            </form>

            <p className="register-text">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Register
              </span>
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default Login;