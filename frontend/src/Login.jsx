import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postFlowImg from "./assets/PostFlow.png";
import supabase from "./supabase.js";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [quotes, setQuotes] = useState([]);
  // const [currentQuote, setCurrentQuote] = useState(null);

  const navigate = useNavigate();

  // Fetch quotes from backend on mount
  // useEffect(() => {
  //   const fetchQuotes = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/posts");
  //       if (!response.ok) throw new Error("Failed to fetch quotes");
  //       const data = await response.json();
  //       setQuotes(data);

  //       if (data.length > 0) {
  //         setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching quotes:", err);
  //     }
  //   };

  //   fetchQuotes();
  // }, []);

  // Rotate quotes every 5 seconds
  // useEffect(() => {
  //   if (quotes.length === 0) return;
  //   const interval = setInterval(() => {
  //     setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [quotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // set user in App state
    onLogin({ ...data.user, name });
    navigate("/Feed"); // redirect to Feed
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    onLogin(data.user);
    navigate("/Feed");
  };

  return (
    <div className="login-page">
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>

      <p className="tagline">Share Life’s Moments</p>

      {/* Rotating quote */}
      {/* {currentQuote && (
        <div className="login-quote">
          <p>"{currentQuote.quote}"</p>
          <span>- {currentQuote.author}</span>
        </div>
      )} */}
      <h1>Sign In Below: </h1>

      <form onSubmit={handleSubmit} className="container">
        <label for="name">
          <h3>Name:</h3>
        </label>
        <input
          className="name-box"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label for="email">
          <h3>Email/Phone:</h3>{" "}
        </label>
        <input
          className="name-box"
          type="text"
          name="email"
          id="email"
          value={email}
          placeholder="Email / Phone Here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">
          <h3>Password:</h3>{" "}
        </label>
        <input
          className="name-box"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn">Login</button>
      </form>

      <h3>Don't have an account? Sign Up Here!</h3>

      <form onSubmit={handleSignUp} className="container">
        <input
          className="name-box"
          type="email"
          name="email"
          id="email2"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="name-box"
          type="password"
          name="password"
          id="password2"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn">Sign Up</button>
      </form>
    </div>
  );
}
