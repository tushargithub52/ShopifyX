import { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProducts from "../utils/useInfiniteProducts";
import { Filter, Search } from "lucide-react";
import ProductTemplate from "../components/ProductTemplate";
import { loadlazyproduct, loadproduct } from "../store/reducers/productSlice";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { products, hasmore, setHasmore, fetchmoreproducts } = useInfiniteProducts();

  const filteredProducts = products.filter((product) => {
      return (
        (product.category === category || category === "") &&
        (product.title.toLowerCase().includes(search.toLowerCase()) ||
          search === "")
      );
    });

  return (
    <>
      <form className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-20 px-5">
        <div className="relative w-full sm:w-1/2">
          <Search
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="relative w-full sm:w-1/4">
          <Filter
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1f2937] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="Watches">Watches</option>
            <option value="Headset">Headset</option>
            <option value="Footwear">Footwear</option>
            <option value="Perfume">Perfume</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("");
            setHasmore(true)
          }}
          className="bg-violet-500 hover:bg-violet-600 transition-colors text-white px-6 py-2 rounded-lg font-medium"
        >
          Reset
        </button>
      </form>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchmoreproducts}
        hasMore={hasmore}
        loader={
          <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more products...</b>
          </p>
        }
      >
        <div className=" bg-[#121826] p-6">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">
            Our Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10">
            {filteredProducts.map((product, idx) => (
              <Suspense
                key={idx}
                fallback={
                  <div className="flex justify-center items-center h-screen">
                    <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                <ProductTemplate product={product} />
              </Suspense>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Products;
