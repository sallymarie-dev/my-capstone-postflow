import PostForm from "./PostForm";
import PostList from "./PostList";
import "./Feed.css";
export default function Feed({ user, onLogout }) {
  return (
    <div className="feed-page">
      {/* Logo in top-left corner */}
      <img src="/postflow-img.png" alt="PostFlow Logo" className="feed-logo" />

      {/* Welcome message */}
      <p className="feed-tagline">Welcome, {user.name || user}</p>

      {/* Navigation bar */}
      <div className="nav-bar">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Explore</button>
        <button className="nav-btn">Create</button>
        <button className="nav-btn">Profile</button>
      </div>

      {/* Logout button */}
      <button className="btn btn-secondary logout-btn" onClick={onLogout}>
        Logout
      </button>

      {/* Posts */}
      <PostForm user={user} />
      <PostList />
    </div>
  );
}
