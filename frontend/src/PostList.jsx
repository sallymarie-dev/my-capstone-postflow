// import { useEffect, useState } from "react";

// export default function PostList() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:3000/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching posts:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading posts...</p>;

//   return (
//     <div>
//       {posts.length === 0 && <p>No posts yet.</p>}

//       {posts.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="post-author">{post.author}</div>
//           <div>{post.quote}</div>
//         </div>
//       ))}
//     </div>
//   );
// }
