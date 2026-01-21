import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
import FeedHeader from "./components/FeedHeader";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import QuoteGrid from "./components/QuoteGrid";
import CreateQuoteModal from "./components/CreateQuoteModal";

import "./index.css";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const itemList = 10; // quotes per page
  const [startIndex, setStartIndex] = useState(0);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Update filtered posts when search changes
  useEffect(() => {
    if (!search.trim()) {
      setFilteredPosts(posts);
    } else {
      const lower = search.toLowerCase();
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.quote.toLowerCase().includes(lower) ||
            p.author.toLowerCase().includes(lower)
        )
      );
    }
    setStartIndex(0); // reset to first page on search
  }, [search, posts]);

  // Fetch posts from post_flow table
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("post_flow")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPosts(data);
      setFilteredPosts(data);
    }
  };

  // Save a quote to user_profile when "Love This" is clicked
  const handleSave = async (post) => {
    if (!user) return alert("You must be logged in");

    try {
      // Check if quote already saved to avoid duplicates
      const { data: existing, error: checkError } = await supabase
        .from("user_profile")
        .select("id")
        .eq("user_id", user.id)
        .eq("quote", post.quote)
        .single();

      if (!checkError && existing) {
        return alert("You already loved this quote!");
      }

      const { error } = await supabase.from("user_profile").insert([
        {
          user_id: user.id,
          quote: post.quote,
          name: post.author || user.user_metadata?.full_name || user.email,
        },
      ]);

      if (error) throw error;

      alert("Quote saved to your profile!");
    } catch (err) {
      console.error("Save quote error:", err);
      alert("Failed to save quote: " + err.message);
    }
  };

  // Pagination logic
  const endIndex = startIndex + itemList;
  let visiblePostsSlice = filteredPosts.slice(startIndex, endIndex);
  if (endIndex > filteredPosts.length) {
    visiblePostsSlice = visiblePostsSlice.concat(
      filteredPosts.slice(0, endIndex - filteredPosts.length)
    );
  }

  const nextPage = () => {
    setStartIndex((prev) => (prev + itemList) % filteredPosts.length);
  };

  const prevPage = () => {
    setStartIndex(
      (prev) => (prev - itemList + filteredPosts.length) % filteredPosts.length
    );
  };

  return (
    <div className="feed-page">
      <FeedHeader user={user} />

      <NavBar
        onExplore={fetchPosts}
        onCreate={() => setShowCreate(true)}
        onProfile={() => navigate("/profile")}
      />

      <SearchBar value={search} onChange={setSearch} />

      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      <QuoteGrid posts={visiblePostsSlice} onSave={handleSave} />

      {/* Pagination buttons */}
      <div className="pagination-buttons" style={{ marginTop: "1rem" }}>
        <button className="btn" onClick={prevPage}>
          Previous
        </button>
        <button className="btn" onClick={nextPage} style={{ marginLeft: "0.5rem" }}>
          Next
        </button>
      </div>

      {showCreate && (
        <CreateQuoteModal
          user={user}
          onClose={() => setShowCreate(false)}
          onCreated={fetchPosts}
        />
      )}
    </div>
  );
}
