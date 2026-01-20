import postFlowImg from "../assets/PostFlow.png";

export default function FeedHeader({ user }) {
  return (
    <>
      <img src={postFlowImg} alt="PostFlow Logo" className="feed-logo" />
      <p className="feed-tagline">
        Welcome, {user?.name?.toUpperCase() || "Guest"}
      </p>
    </>
  );
}
