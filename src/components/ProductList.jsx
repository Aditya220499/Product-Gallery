import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useDebounce } from "../hooks/useDebounce";
import { useInView } from "react-intersection-observer";

const API_URL = "https://fakestoreapi.com/products";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(6); 
  const { ref, inView } = useInView();

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchProducts = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      loadMoreProducts();
    }
  }, [inView]);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  const filteredProducts = useMemo(() => {
    setVisibleProducts(6);
    if (!debouncedSearch) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, products]);

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div ref={ref} className="text-center my-3">
        {loading && <span>Loading more products...</span>}
      </div>
    </div>
  );
};

export default ProductList;