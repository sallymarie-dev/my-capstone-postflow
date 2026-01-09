import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import UserProfile from "./UserProfile";
import "./Feed.css";
import postFlowImg from "./assets/PostFlow.png";

export default function Feed({ user, onLogout }) {
  // Mock profiles
  const [profiles, setProfiles] = useState([
    { name: "Alice", quote: "Life is better with coffee." },
    { name: "Bob", quote: "Code, eat, sleep, repeat." },
    { name: "Charlie", quote: "Adventure awaits." },
    { name: "Diana", quote: "Keep smiling!" },
    { name: "Eve", quote: "Dream big and hustle hard." },
    { name: "Frank", quote: "Stay curious, stay humble." },
    { name: "Grace", quote: "Kindness is contagious." },
    { name: "Hank", quote: "Make every day count." },
  ]);

  return (
    <div className="feed-page">
      {/* Small logo top-left */}
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome text */}
      <p className="feed-tagline">Welcome, {user?.name || "Guest"}</p>

      {/* Navigation bar */}
      <div className="nav-bar">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Explore</button>
        <button className="nav-btn">Create</button>
        <button className="nav-btn">Profile</button>
      </div>

      {/* Logout button */}
      <button className="btn btn-secondary logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Posts */}
      <PostForm user={user} />
      <PostList />

      {/* User Profiles / Quotes Section */}
      <div className="user-profiles-section">
        <h2>User Quotes</h2>
        <div className="user-profiles-grid">
          {profiles.map((p, index) => (
            <UserProfile key={index} name={p.name} quote={p.quote} />
          ))}
        </div>
      </div>
    </div>
  );
}
