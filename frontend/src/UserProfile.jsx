import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ name, quote }) {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  fetch("http://localhost:3000/user_profile")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProfile(data);
    })
    .catch((error) => console.error("Error", error));

  return (
    <>
      {profile.map((p, index) => (
        <div key={index} className="user-profile-card">
          <p className="quote-text">“{p.quote}”</p>
          <div className="profile-footer">
            <span className="profile-name">{p.name}</span>
          </div>
        </div>
      ))}
      <button className="nav-btn" onClick={() => navigate("/feed")}>
        Back to Feed
      </button>
      ;
    </>
  );
}
