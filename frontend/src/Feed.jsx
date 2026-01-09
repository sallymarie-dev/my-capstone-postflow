import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";
import UserProfile from "./UserProfile";

export default function Feed({ user, onLogout }) {
  // Mock quotes for immediate display
  const mockQuotes = [
    { id: 1, author: "Alice", quote: "Life is better with coffee." },
    { id: 2, author: "Bob", quote: "Code, eat, sleep, repeat." },
    { id: 3, author: "Charlie", quote: "Adventure awaits." },
    { id: 4, author: "Diana", quote: "Keep smiling!" },
    { id: 5, author: "Eve", quote: "Dream big, act bigger." },
    { id: 6, author: "Frank", quote: "Music is life." },
    { id: 7, author: "Grace", quote: "Stay positive." },
    { id: 8, author: "Hank", quote: "Coffee and code." },
    { id: 9, author: "Ivy", quote: "Explore the world." },
    { id: 10, author: "Jack", quote: "Create something new today." },
  ];

  const [quotes, setQuotes] = useState(mockQuotes);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch("http://localhost:3000/posts"); // Backend endpoint
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        if (data.length > 0) {
          // Shuffle backend data for randomness
          const shuffled = data.sort(() => 0.5 - Math.random());
          setQuotes(shuffled);
        }
      } catch (err) {
        console.error("Error fetching backend quotes:", err);
        // Fallback: keep showing mock quotes
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div className="feed-page">
      {/* Logo top-left */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome message */}
      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation bar */}
      <div className="nav-bar">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Explore</button>
        <button className="nav-btn">Create</button>
        <button className="nav-btn">Profile</button>
      </div>

      {/* Logout button */}
      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Post creation form */}
      <PostForm user={user} />

      {/* User quotes grid */}
      <div className="user-profiles-grid">
        {quotes.map((q) => (
          <UserProfile key={q.id} name={q.author} quote={q.quote} />
        ))}
      </div>
    </div>
  );
}
