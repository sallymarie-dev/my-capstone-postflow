import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [author, setAuthor] = useState(user?.name || "");
  const [quote, setQuote] = useState("");
  // Fetch quotes
  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  };

  // Submit new quote
  const submitQuote = async (e) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, quote }),
    });

    setQuote("");
    setShowCreate(false);
    fetchQuotes();
  };


  return (
    <div className="feed-page">
      {/* Logo */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation */}
      <div className="nav-bar">
        <button className="nav-btn" onClick={fetchQuotes}>Explore</button>
        <button className="nav-btn" onClick={() => setShowCreate(true)}>Create</button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>Profile</button>
      </div>

      <button className="btn logout-btn" onClick={onLogout}>Logout</button>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Create a Quote</h2>

            <form onSubmit={submitQuote}>
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <textarea
                placeholder="Write your quote..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreate(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quotes grid */}
      <div className="user-profiles-grid">
        {quotes.map((q) => (
          <UserProfile
            key={q.id}
            name={q.author}
            quote={q.quote}
            date={q.created_at}
            randomHeight={Math.floor(Math.random() * 150) + 120} 
          />
        ))}
      </div>
    </div>
  );
}
