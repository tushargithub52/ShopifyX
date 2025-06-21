import { Link } from "react-router-dom";

const ProductTemplate = ({product}) => {
  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="bg-[#1f2937] rounded-2xl shadow-md p-4 transition-transform transform hover:scale-101 hover:shadow-lg text-white"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain mb-4 rounded-lg bg-[#111827] p-2"
      />
      <h1 className="text-lg font-semibold">{product.title}</h1>
      <h2 className="text-sm text-gray-400 mt-1">{product.category}</h2>
      <p className="text-sm text-gray-300 mt-2 line-clamp-3">
        {product.description.slice(0, 100)}...
      </p>
      <h3 className="text-xl font-bold text-violet-400 mt-4">
        ${product.price}
      </h3>
    </Link>
  );
};

export default ProductTemplate;
