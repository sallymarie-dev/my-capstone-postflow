import QuoteCard from "./QuoteCard";

export default function QuoteGrid({ posts, onSave }) {
  return (
    <div className="user-profiles-grid">
      {posts.map((post) => (
        <QuoteCard key={post.id} post={post} onSave={onSave} />
      ))}
    </div>
  );
}

