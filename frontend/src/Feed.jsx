// import PostForm from "./PostForm";
// import PostList from "./PostList";

// export default function Feed({ user, onLogout }) {
//   return (
//     <div>
//       <h2>Welcome, {user}</h2>
//       <button onClick={onLogout}>Logout</button>
//       {<PostForm user={user} />}
//       <PostList />
//     </div>
//   );
// }

// i

import PostForm from "./PostForm";
import PostList from "./PostList";

export default function Feed({ user, onLogout }) {
  return (
    <div className="splash-container">
      <h1 className="logo">PostFlow</h1>
      <p className="tagline">Welcome, {user.name}</p>

      <button className="btn btn-secondary" onClick={onLogout}>
        Logout
      </button>

      <PostForm user={user} />
      <PostList />
    </div>
  );
}
