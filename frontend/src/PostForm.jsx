// import { useState } from "react";

// export default function PostForm({ user }) {
//   const [quote, setQuote] = useState("");

//   async function handleSubmit(event) {
//     event.preventDefault();

//     await fetch("http://localhost:5173/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         author: user,
//         quote,
//       }),
//     });

//     setQuote("");
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Write a quote..."
//         value={quote}
//         onChange={(event) => setQuote(event.target.value)}
//       />
//       <button>Post</button>
//     </form>
//   );
// }


import { useState } from "react";

export default function PostForm({ user }) {
  const [quote, setQuote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!quote.trim()) return;

    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: user.name,
        quote
      })
    });

    if (!res.ok) {
      console.error("Failed to create post");
      return;
    }

    setQuote("");
    window.location.reload(); // temporary refresh
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        placeholder="What's on your mind?"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <button className="btn btn-primary">Post</button>
    </form>
  );
}
