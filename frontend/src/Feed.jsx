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

  const itemList = 10;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      setStartIndex(0);
    }
  }, [search, posts]);

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

  const handleSave = async (post) => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return alert("You must be logged in");

    await supabase.from("user_profile").insert([
      {
        user_id: authUser.id,
        quote: post.quote,
        name: authUser.user_metadata?.full_name || authUser.email,
      },
    ]);

    alert("Quote saved!");
  };

  const visiblePosts = filteredPosts.slice(startIndex, startIndex + itemList);

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

      <QuoteGrid posts={visiblePosts} onSave={handleSave} />

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
