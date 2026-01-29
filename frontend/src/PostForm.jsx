// import { useState } from "react";

// export default function PostForm({ user }) {
//   const [quote, setQuote] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!quote.trim()) return;

//     const res = await fetch("http://localhost:3000/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         author: user.name,
//         quote
//       })
//     });

//     if (!res.ok) {
//       console.error("Failed to create post");
//       return;
//     }

//     setQuote("");
//     window.location.reload(); // temporary refresh
//   }

//   return (
//     <form className="post-form" onSubmit={handleSubmit}>
//       <input
//         placeholder="What's on your mind?"
//         value={quote}
//         onChange={(e) => setQuote(e.target.value)}
//       />
//       <button className="btn btn-primary">Post</button>
//     </form>
//   );
// }
