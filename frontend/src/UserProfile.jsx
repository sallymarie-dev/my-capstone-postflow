import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

export default function UserProfile() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserQuotes();
  }, []);

  // Fetch all quotes saved by the logged-in user
  const fetchUserQuotes = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("No authenticated user");
        navigate("/");
        return;
      }

      // Fetch from user_profile where user_id matches
      const { data, error } = await supabase
        .from("user_profile")
        .select("id, quote, name, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user quotes:", error);
      } else {
        setQuotes(data);
      }
    } catch (err) {
      console.error("Error fetching user quotes:", err);
    }

    setLoading(false);
  };

  if (loading) return <p>Loading your quotes...</p>;
  if (!quotes.length) return <p>You haven't saved any quotes yet.</p>;

  return (
    <>
      <h1>Welcome to your profile</h1>
      <h4>Here are all your loved quotes</h4>

      <div className="user-profiles-grid">
        {quotes.map((q) => (
          <div key={q.id} className="user-profile-card">
            <p className="quote-text">“{q.quote}”</p>
            <div className="profile-footer">
              <span className="profile-name">{q.name}</span>
            </div>
            <small>{new Date(q.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <button className="btn" onClick={() => navigate("/feed")}>
        Back to Feed
      </button>
    </>
  );
}
