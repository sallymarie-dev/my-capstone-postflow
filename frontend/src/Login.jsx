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

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name });
  }

  return (
    <div className="splash-container">
      <h1 className="logo">PostFlow</h1>
      <p className="tagline">Share Life’s Moments</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
