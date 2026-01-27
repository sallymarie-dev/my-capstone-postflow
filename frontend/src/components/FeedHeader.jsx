import postFlowImg from "../assets/PostFlow.png";
export default function FeedHeader({ user }) {
  return (
    <div className="feed-header">
      <p className="feed-tagline">
        Welcome, {user?.name?.toUpperCase() || "Guest"}
      </p>
    </div>
  );
}
