export default function UserProfile({ name, quote, date }) {
  return (
    <div className="user-profile-card">
      <p className="quote-text">“{quote}”</p>
      <div className="profile-footer">
        <span className="profile-name">@{name}</span>
        {date && <span className="profile-date">{new Date(date).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}
