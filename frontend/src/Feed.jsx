import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      console.error("Failed to fetch quotes", err);
    }
  };

  return (
    <div className="feed-page">
      {/* Logo */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome */}
      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation */}
      <div className="nav-bar">
        <button className="nav-btn" onClick={fetchQuotes}>
          Explore
        </button>
        <button className="nav-btn">Create</button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>

      {/* Logout */}
      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Quotes */}
      {quotes.length === 0 ? (
        <p className="empty-feed">
          Click <strong>Explore</strong> to load quotes ✨
        </p>
      ) : (
        <div className="user-profiles-grid">
          {quotes.map((q) => (
            <div className="user-profile-card" key={q.id}>
              <UserProfile
                name={q.author}
                quote={q.quote}
                date={q.created_at}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
