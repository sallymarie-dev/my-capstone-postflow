import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import supabase from "./supabase";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();

  // Feed posts
  const [posts, setPosts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [quote, setQuote] = useState("");

  // search state
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Pagination
  const itemList = 10;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  // filter posts as user types
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const lower = search.toLowerCase();
      const matches = posts.filter(
        (p) =>
          p.quote.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower)
      );
      setFilteredPosts(matches);
      setStartIndex(0);
    }
  }, [search, posts]);

  // Fetch posts from post_flow table
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("post_flow")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data);
      setFilteredPosts(data);
      setStartIndex(0);
    } catch (err) {
      console.error("Fetch posts error:", err);
    }
  };

  // create new user_profile quote
  const submitQuote = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quote }),
      });

      if (!res.ok) throw new Error("Failed to post quote");
      await res.json();
      alert("Quote created!");
      setQuote("");
      setShowCreate(false);
      fetchPosts();
    } catch (err) {
      console.error("Submit quote error:", err);
    }
  };

  // Save post to user's favorites
  const handleSave = async (post) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("You must be logged in");
        return;
      }

      const { error } = await supabase.from("user_profile").insert([
        {
          user_id: user.id,
          quote: post.quote,
          name: user.user_metadata?.full_name || user.email,
        },
      ]);

      if (error) throw error;

      alert("Quote saved to your profile!");
    } catch (err) {
      console.error("Save quote error:", err);
      alert(err.message);
    }
  };

  //  filteredPosts instead of posts
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + itemList);

  const handleNext = () => {
    if (startIndex + itemList >= filteredPosts.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + itemList);
    }
  };

  return (
    <div className="feed-page">
      {/* Logo */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />
      <p className="feed-tagline">
        Welcome, {user?.name.toUpperCase() || "Guest"}
      </p>

      {/* Nav */}
      <div className="nav-bar">
        <button className="nav-btn" onClick={fetchPosts}>
          Explore Quotes
        </button>
        <button className="nav-btn" onClick={() => setShowCreate(true)}>
          Create
        </button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>

      {/* search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search quotes or authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/*Create Modal*/}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Create a Quote</h2>
            <form onSubmit={submitQuote}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                <button type="submit" className="primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed Posts */}
      <div className="user-profiles-grid">
        {visiblePosts.map((p, i) => (
          <div key={i} className="user-profile-card">
            <p className="quote-text">“{p.quote}”</p>
            <div className="profile-footer">
              <span className="profile-name">{p.author}</span>
            </div>
            &nbsp;
            <div className="quote-actions">
              <button className="btn" onClick={() => handleSave(p)}>
                ❤ Love This!
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="pagination">
          <button className="nav-btn" onClick={handleNext}>
            Next
          </button>
          <p className="page-count">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemList, filteredPosts.length)} of{" "}
            {filteredPosts.length}
          </p>
        </div>
      )}
    </div>
  );
}
