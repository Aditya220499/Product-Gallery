import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center p-3 ">
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
