import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ username });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
