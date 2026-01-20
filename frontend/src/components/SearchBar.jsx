export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search quotes or authors..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
