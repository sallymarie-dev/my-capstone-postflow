import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]); // store backend quotes
  const [loading, setLoading] = useState(false);

  // Fetch backend quotes (Explore)
  async function handleExplore() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/posts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuotes(data); // directly set backend quotes
    } catch (err) {
      console.error("Error fetching backend quotes:", err);
      setQuotes([]); // fallback if error occurs
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="feed-page">
      {/* Logo */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome */}
      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation */}
      <div className="nav-bar">
        <button className="nav-btn" onClick={handleExplore}>
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

      {/* Quotes grid */}
      {loading ? (
        <p>Loading quotes...</p>
      ) : (
        <div className="user-profiles-grid">
          {quotes.map((q) => (
            <UserProfile
              key={q.id}
              name={q.author}
              quote={q.quote}
              date={q.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
