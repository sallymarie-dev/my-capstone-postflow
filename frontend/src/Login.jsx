import { useState } from "react";
import postFlowImg from "./assets/PostFlow.png"; // PostFlow logo
import "./index.css"; // Login styles

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name });
  }

  return (
    <div className="login-page">
      {/* Centered logo */}
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>

      <p className="tagline">Share Life’s Moments</p>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-box"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
