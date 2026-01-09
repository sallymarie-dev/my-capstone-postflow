import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFlowImg from "./assets/PostFlow.png";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onLogin({ name });
    navigate("/"); 
  }

  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>

      <p className="tagline">Share Life’s Moments</p>

      <input
        type="text"
        className="name-box"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="container">
        <form onSubmit={handleSubmit}>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}
