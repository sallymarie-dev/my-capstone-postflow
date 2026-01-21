export default function QuoteCard({ quote, author, date, onSave }) {
  return (
    <div className="user-profile-card">
      <p className="quote-text">“{quote}”</p>
      <div className="profile-footer">
        <span className="profile-name">{author}</span>
      </div>
      {date && <small>{new Date(date).toLocaleString()}</small>}
      {onSave && (
        <div className="quote-actions">
          <button className="btn" onClick={onSave}>
            ❤ Love This!
          </button>
        </div>
      )}
    </div>
  );
}
