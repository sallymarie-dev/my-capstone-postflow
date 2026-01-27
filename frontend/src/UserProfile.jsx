import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
import NavBar from "./components/NavBar"; // Adjust path if necessary

export default function UserProfile() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserQuotes();
  }, []);

  const fetchUserQuotes = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("user_profile")
        .select("id, quote, name, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setQuotes(data);
    } catch (err) {
      console.error("Error fetching user quotes:", err);
    }
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <NavBar 
        onExplore={() => navigate("/feed")} 
        onCreate={() => navigate("/feed")} // Or your specific logic
        onProfile={() => navigate("/profile")}
      />
      
      <div className="container" style={{ margin: "20px auto", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
        <h1>Your Saved Quotes</h1>
        
        {loading ? (
          <p>Loading your quotes...</p>
        ) : !quotes.length ? (
          <p>You haven't saved any quotes yet.</p>
        ) : (
          <div className="user-profiles-grid" style={{ marginLeft: 0, width: '100%' }}>
            {quotes.map((q) => (
              <div key={q.id} className="user-profile-card">
                <p className="user-quote">"{q.quote}"</p>
                <div className="profile-footer">
                  <span className="profile-name">{q.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn" onClick={() => navigate("/feed")} style={{ marginTop: "20px" }}>
          Back to Feed
        </button>
      </div>
    </div>
  );
}
