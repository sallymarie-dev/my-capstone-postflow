// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "./supabase";

// export default function UserProfile() {
//   const [profile, setProfile] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3000/user_profile")
//       .then((res) => res.json())
//       .then((data) => {
//         setProfile(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading user quotes...</p>;
//   if (profile.length === 0) return <p>No quotes yet.</p>;

//   return (
//     <>
//     <h1>Welcome to your profile </h1>
//     <h4>Here you will find all of your favorite quotes</h4>

//       {profile.map((p, index) => (
//         <div key={index} className="user-profile-card">
//           <p className="quote-text">“{p.quote}”</p>
//           <div className="profile-footer">
//             <span className="profile-name">{p.name}</span>
//           </div>
//         </div>
//       ))}

//       <button className="btn" onClick={() => navigate("/feed")}>Back to Feed</button>
//     </>
//   );
// }

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

  const fetchUserQuotes = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No authenticated user");
      navigate("/");
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
      <h1>Welcome to your profile</h1>
      <h4>Here you will find all of your favorite quotes</h4>

      {quotes.map((q) => (
        <div key={q.id} className="user-profile-card">
          <p className="quote-text">“{q.quote}”</p>
          <small>{new Date(q.created_at).toLocaleString()}</small>
        </div>
      ))}

      <button className="btn" onClick={() => navigate("/feed")}>
        Back to Feed
      </button>
    </>
  );
}
