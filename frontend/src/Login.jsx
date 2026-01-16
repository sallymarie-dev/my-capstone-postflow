import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postFlowImg from "./assets/PostFlow.png";
import supabase from "./supabase.js";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  const navigate = useNavigate();

  // Fetch quotes from backend on mount
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error("Failed to fetch quotes");
        const data = await response.json();
        setQuotes(data);

        if (data.length > 0) {
          setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
      }
    };

    fetchQuotes();
  }, []);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    if (quotes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!name.trim()) return;

    onLogin({ name }); // set user in App state
    onLogin(data.user);
    navigate("/Feed"); // redirect to Feed
  };

  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>

      <p className="tagline">Share Life’s Moments</p>

      {/* Rotating quote */}
      {currentQuote && (
        <div className="login-quote">
          <p>"{currentQuote.quote}"</p>
          <span>- {currentQuote.author}</span>
        </div>
      )}
      <h1>Sign In Below: </h1>

      <form onSubmit={handleSubmit} className="container">
        <label htmlFor="name">
          <h3>Name:</h3>
        </label>
        <input
          className="name-box"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">
          <h3>Email/Phone:</h3>{" "}
        </label>
        <input
          className="name-box"
          type="text"
          name="email"
          id="email"
          placeholder="Email / Phone Here"
        />
        <label htmlFor="password">
          <h3>Password:</h3>{" "}
        </label>
        <input
          className="name-box"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
        <br />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
