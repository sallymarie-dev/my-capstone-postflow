import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
import FeedHeader from "./components/FeedHeader";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import QuoteGrid from "./components/QuoteGrid";
import CreateQuoteModal from "./components/CreateQuoteModal";
import WeatherSearch from "./components/WeatherSearch";
import "./index.css";

export default function Feed({ user, onLogout }) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [weather,setWeather]=useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const itemList = 10; // number of quotes per page
  const [startIndex, setStartIndex] = useState(0);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
    
  }, []);

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
    }
    setStartIndex(0); // Reset pagination on new search
  }, [search, posts]);
  // Fetch posts from Supabase
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
  // Save quote to user_profile
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

const fetchWeather = async (zipCode = "90210") => {
    setWeatherLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const response = await fetch(`http://localhost:3000/get-weather?zip=${zipCode}&date=${today}`);
      
      if (response.ok) {
        const data = await response.json();
        
        setWeather(data[0]); 
      }
    } catch (err) {
      console.error("Weather fetch failed", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchWeather("10001"); 
  }, []);

  
  return (
    <div className="feed-page">
      <FeedHeader user={user} />
      
      {/* Weather Widget Display */}
      <WeatherSearch />
      <div className="weather-widget" style={{ textAlign: 'center', padding: '10px', background: '#f0f0f0', borderRadius: '8px', margin: '10px' }}>
        {weatherLoading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <p> New York Current Temp: <strong>{weather.temp}°F</strong> on {weather.datetime}</p>
        ) : (
          <p>Weather data unavailable</p>
        )}
      </div>

      
      <NavBar
        onExplore={fetchPosts}
        onCreate={() => setShowCreate(true)}
        onProfile={() => navigate("/profile")}
      />

      {/* Search bar */}
      <SearchBar value={search} onChange={setSearch} />

      <button className="btn logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Quotes Grid */}
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

      {/* Create Quote Modal */}
      {showCreate && (
        <CreateQuoteModal
          user={user}
          onClose={() => setShowCreate(false)}
          onQuoteCreated={fetchPosts}
        />
      )}
    </div>
  );
}
