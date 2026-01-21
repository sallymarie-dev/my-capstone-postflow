// export default function SearchBar({ value, onChange }) {
//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search quotes or authors..."
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }
export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search quotes or authors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
