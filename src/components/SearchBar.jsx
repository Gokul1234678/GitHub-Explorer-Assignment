import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}

export default SearchBar;