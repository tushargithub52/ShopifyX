import axios from "../api/axiosconfig";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hasmore, setHasmore] = useState(true);

  const fetchmoreproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_start=${products.length}&_limit=6`
      );

      if (data.length === 0) {
        setHasmore(false);
      } else {
        setProducts([...products, ...data]);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      setHasmore(false);
    }
  };

  useEffect(() => {
    fetchmoreproducts();
  }, []);

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
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {product.description.slice(0, 100)}...
        </p>
        <h3 className="text-xl font-bold text-violet-400 mt-4">
          ${product.price}
        </h3>
      </Link>
    );
  });

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchmoreproducts}
      hasMore={hasmore}
      loader={
        <div className="flex justify-center items-center py-6">
          <div className="w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more products...</b>
        </p>
      }
    >
      <div className="min-h-screen bg-[#121826] p-6 mt-20">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <div className="w-8 h-8 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            {renderproducts}
          </Suspense>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default Products;
