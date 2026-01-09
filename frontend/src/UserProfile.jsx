import React from "react";
import "./UserProfile.css";

export default function UserProfile({ name, quote }) {
  return (
    <div className="user-card">
      <h3 className="user-name">{name}</h3>
      <p className="user-quote">{quote}</p>
    </div>
  );
}
