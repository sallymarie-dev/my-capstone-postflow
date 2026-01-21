import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

// Components
import FeedHeader from "./components/FeedHeader";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import QuoteGrid from "./components/QuoteGrid";
import CreateQuoteModal from "./components/CreateQuoteModal";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();

  // --- State ---
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemList = 10;

  // --- Fetch posts from Supabase ---
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("post_flow")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data);
      setFilteredPosts(data);
      setStartIndex(0);
    } catch (err) {
      console.error("Fetch posts error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- Filter posts by search ---
  useEffect(() => {
    if (!search.trim()) {
      setFilteredPosts(posts);
    } else {
      const lower = search.toLowerCase();
      const matches = posts.filter(
        (p) =>
          p.quote.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower)
      );
      setFilteredPosts(matches);
      setStartIndex(0);
    }
  }, [search, posts]);

  // --- Pagination ---
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + itemList);
  const handleNext = () => {
    if (startIndex + itemList >= filteredPosts.length) setStartIndex(0);
    else setStartIndex(startIndex + itemList);
  };

  // --- Save a quote to user profile ---
  const handleSave = async (post) => {
  if (!post) return;

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase.from("user_profile").insert([
      {
        user_id: user.id,
        name: post.author || user.user_metadata?.full_name || user.email,
        quote: post.quote,
      },
    ]);

    if (error) throw error;
    alert("Quote saved to your profile!");
  } catch (err) {
    console.error("Save quote error:", err);
    alert(err.message);
  }
};

  // const handleSave = async (post) => {
  //   try {
  //     const { data: { user }, error: userError } = await supabase.auth.getUser();
  //     if (userError || !user) {
  //       alert("You must be logged in");
  //       return;
  //     }

  //     const { error } = await supabase.from("user_profile").insert([
  //       {
  //         user_id: user.id,
  //         quote: post.quote,
  //         name: user.user_metadata?.full_name || user.email,
  //       },
  //     ]);

  //     if (error) throw error;
  //     alert("Quote saved to your profile!");
  //   } catch (err) {
  //     console.error("Save quote error:", err);
  //     alert(err.message);
  //   }
  // };

  return (
    <div className="feed-page">
      {/* Header */}
      <FeedHeader user={user} />

      {/* Nav Bar */}
      <NavBar
        onExplore={fetchPosts}
        onCreate={() => setShowCreate(true)}
        onProfile={() => navigate("/profile")}
      />

      {/* Search */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Logout */}
      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Create Quote Modal */}
      {showCreate && (
        <CreateQuoteModal
          onClose={() => setShowCreate(false)}
          onQuoteCreated={fetchPosts}
          user={user}
        />
      )}

      {/* Quotes Grid */}
      <QuoteGrid posts={visiblePosts} onSave={handleSave} />

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="pagination">
          <button className="nav-btn" onClick={handleNext}>
            Next
          </button>
          <p className="page-count">
            Showing {startIndex + 1}–{Math.min(startIndex + itemList, filteredPosts.length)} of {filteredPosts.length}
          </p>
        </div>
      )}
    </div>
  );
}
