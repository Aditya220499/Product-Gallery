import { useInView } from "react-intersection-observer";

const ProductCard = ({ product }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="col-md-4 mb-4 d-flex align-items-stretch">
      <div className="card shadow-sm w-100">
        {inView ? (
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top"
            style={{
              height: "200px",    
              objectFit: "cover", 
            }}
          />
        ) : (
          <div className="placeholder" style={{ height: "200px", background: "#f0f0f0" }}></div>
        )}

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <button className="btn btn-primary mt-auto">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
