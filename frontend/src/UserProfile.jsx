import React from "react";
import "./Feed.css"; // Using same CSS file

export default function UserProfile({ name, quote }) {
  return (
    <div className="user-card">
      <h3 className="user-name">{name}</h3>
      <p className="user-quote">{quote}</p>
    </div>
  );
}
