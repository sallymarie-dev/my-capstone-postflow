export default function QuoteCard({ post, onSave }) {
   if (!post) return null;
  return (
    <div className="user-profile-card">
      <p className="quote-text">“{post.quote}”</p>
      <div className="profile-footer">
        <span className="profile-name">{post.author}</span>
      </div>
      <div className="quote-actions">
        <button className="btn" onClick={() => onSave(post)}>
          ❤ Love This!
        </button>
      </div>
    </div>
  );
}
