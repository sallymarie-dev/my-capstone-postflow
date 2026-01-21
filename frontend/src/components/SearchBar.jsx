export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search quotes or authors..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <button className="btn" onClick={onSearch} style={{ marginLeft: "0.5rem" }}>
        Search
      </button>
    </div>
  );
}
