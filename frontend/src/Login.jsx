// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import postFlowImg from "./assets/PostFlow.png";

// export default function Login({ onLogin }) {
//   const [name, setName] = useState("");
//   const [quotes, setQuotes] = useState([]);
//   const [currentQuote, setCurrentQuote] = useState(null);
//   const navigate = useNavigate();

//   // Fetch quotes from backend on mount
//   useEffect(() => {
//     const fetchQuotes = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/posts"); // your Express API
//         if (!response.ok) throw new Error("Failed to fetch quotes");

//         const data = await response.json();
//         setQuotes(data);

//         if (data.length > 0) {
//           // Pick an initial random quote
//           setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
//         }
//       } catch (err) {
//         console.error("Error fetching quotes:", err);
//       }
//     };

//     fetchQuotes();
//   }, []);

//   // Auto-change quotes every 5 seconds
//   useEffect(() => {
//     if (quotes.length === 0) return;

//     const interval = setInterval(() => {
//       const random = quotes[Math.floor(Math.random() * quotes.length)];
//       setCurrentQuote(random);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [quotes]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!name.trim()) return;

//     onLogin({ name });
//     navigate("/");
//   }

//   return (
//     <div className="login-page">
//       <div className="logo-wrapper">
//         <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
//       </div>

//       <p className="tagline">Share Life’s Moments</p>

//       {/* Random quote display */}
//       {currentQuote && (
//         <div className="login-quote">
//           <p>"{currentQuote.quote}"</p>
//           <span>- {currentQuote.author}</span>
//         </div>
//       )}

//       <input
//         type="text"
//         className="name-box"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <button className="btn">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postFlowImg from "./assets/PostFlow.png";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onLogin({ name }); // set user in App state
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

      <form onSubmit={handleSubmit} className="container">
        <input
          className="name-box"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
