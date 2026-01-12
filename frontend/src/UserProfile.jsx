import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user_profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading user quotes...</p>;
  if (profile.length === 0) return <p>No quotes yet.</p>;

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

      <button onClick={() => navigate("/feed")}>Back to Feed</button>
    </>
  );
}
