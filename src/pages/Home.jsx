import { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`container-fluid min-vh-100 py-3 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Theme Toggle Button */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-secondary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Product List */}
      <ProductList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
