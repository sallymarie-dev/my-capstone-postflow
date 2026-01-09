// import { useEffect, useState } from "react";

// export default function PostList() {
//   const [posts, setPosts] = useState([]);

//   async function loadPosts() {
//     const res = await fetch("http://localhost:3000/posts");
//     const data = await res.json();
//     setPosts(data);
//   }

//   async function deletePost(id) {
//     await fetch(`http://localhost:5173/posts/${id}`, {
//       method: "DELETE",
//     });

//     setPosts(posts.filter((post) => post.id !== id));
//   }

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <div className="post" key={post.id}>
//           <p>
//             <b>{post.author}</b>
//           </p>
//           <p>{post.quote}</p>
//           <button onClick={() => deletePost(post.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="post-author">{post.author}</div>
          <div>{post.quote}</div>
        </div>
      ))}
    </div>
  );
}
