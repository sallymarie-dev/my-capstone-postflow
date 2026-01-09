// import { useState } from "react";

// export default function Login({ onLogin }) {
//   const [name, setName] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (!name.trim()) return;
//     onLogin(name);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input
//         placeholder="Enter your name"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       />
//       <button>Login</button>
//     </form>
//   );
// }


import { useState } from "react";
import postFlowImg from "./assets/PostFlow.png"; 
export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name });
  }

  return (
    <div className="login-page">
      {/* Centered logo image */}
      <div className="logo-wrapper">
        <img src={postFlowImg} alt="PostFlow Logo" className="logo-img" />
      </div>

      {/* Optional tagline */}
      <p className="tagline">Share Life’s Moments</p>

      {/* Name input box */}
      <input
        type="text"
        className="name-box"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Login button */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}


