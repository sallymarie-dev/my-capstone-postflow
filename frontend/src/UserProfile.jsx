import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

export default function UserProfile() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  const fetchUserFavorites = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("No authenticated user");
        navigate("/");
        return;
      }

      // Fetch favorites joined with post_flow
      const { data, error } = await supabase
        .from("user_favorites")
        .select(`
          id,
          created_at,
          post_flow (
            id,
            quote,
            author,
            created_at
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        setFavorites(data);
      }
    } catch (err) {
      console.error("Error fetching user favorites:", err);
    }
    setLoading(false);
  };

  // if (loading) return <p>Loading your favorite quotes...</p>;
  // if (!favorites.length) return <p>You haven't loved any quotes yet.</p>;

  return (
    <>
      <h1>Welcome to your profile</h1>
      <h4>Here are your loved quotes</h4>

      {favorites.map((fav) => (
        <div key={fav.id} className="user-profile-card">
          <p className="quote-text">“{fav.post_flow.quote}”</p>
          <small>— {fav.post_flow.author}</small>
          <br />
          <small>{new Date(fav.post_flow.created_at).toLocaleString()}</small>
        </div>
      ))}

      <button className="btn" onClick={() => navigate("/feed")}>
        Back to Feed
      </button>
    </>
  );
}
