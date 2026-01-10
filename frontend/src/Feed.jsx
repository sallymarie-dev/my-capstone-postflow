import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]); // currently empty

  // Fetch quotes from your Express API
  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts"); // update if deployed
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();
      console.log("Fetched quotes:", data); // 🔍 Debug check
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      alert("Error fetching quotes. Check console for details.");
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

      {/* Quotes grid */}
      {quotes.length === 0 ? (
        <p>No quotes yet. Click Explore to load quotes!</p>
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
