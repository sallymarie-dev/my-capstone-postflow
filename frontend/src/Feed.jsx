import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";
import mockData from "./mockData";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(mockData); // start with mock quotes
  const [loading, setLoading] = useState(false);

  // Show mock data (Home)
  function handleHome() {
    setQuotes(mockData);
  }

  // Fetch backend quotes (Explore)
  function handleExplore() {
    setLoading(true);
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        // shuffle backend quotes
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuotes(shuffled);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching backend quotes:", err);
        setQuotes([]);
        setLoading(false);
      });
  }

  return (
    <div className="feed-page">
      {/* Logo */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome */}
      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation */}
      <div className="nav-bar">
        <button className="nav-btn" onClick={handleHome}>
          Home
        </button>
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
