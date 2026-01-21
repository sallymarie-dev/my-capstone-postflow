import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
import QuoteCard from "./components/QuoteCard";
import ProfileHeader from "./components/ProfileHeader";

export default function UserProfile() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserQuotes();
  }, []);

  const fetchUserQuotes = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No authenticated user");
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("user_profile")
      .select("id, name, quote, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching quotes:", error);
    } else {
      setQuotes(data);
    }

    setLoading(false);
  };

  if (loading) return <p>Loading your quotes...</p>;
  if (quotes.length === 0) return <p>No quotes yet.</p>;

  return (
    <>
      <ProfileHeader
        title="Welcome to your profile"
        subtitle="Here you will find all of your favorite quotes"
      />

      <div className="quotes-grid">
        {quotes.map((q) => (
          <QuoteCard
            key={q.id}
            quote={q.quote}
            date={q.created_at}
            name={q.name}
          />
        ))}
      </div>

      <button className="btn" onClick={() => navigate("/feed")}>
        Back to Feed
      </button>
    </>
  );
}
