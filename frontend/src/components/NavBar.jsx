
export default function NavBar({ onExplore, onCreate, onProfile }) {
  return (
    <div className="nav-bar">
      <button className="nav-btn" onClick={onExplore}>
        Explore Quotes
      </button>
      <button className="nav-btn" onClick={onCreate}>
        Create
      </button>
      <button className="nav-btn" onClick={onProfile}>
        Profile
      </button>
    </div>
  );
}

