import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.products);


  const renderproducts = products.map((product) => {

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
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">{product.description.slice(0,100)}...</p>
        <h3 className="text-xl font-bold text-violet-400 mt-4">${product.price}</h3>
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-[#121826] p-6 mt-20">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderproducts}
      </div>
    </div>
  );
};

export default Products;
