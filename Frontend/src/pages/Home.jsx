const Home = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-[#121826] text-white px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Discover the <span className="text-violet-400">Future</span> of Shopping
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Find the best products curated just for you. Fast delivery, easy checkout, and a shopping experience like never before.
          </p>
          <a
            href="/products"
            className="inline-block bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-indigo-600 hover:to-violet-500 px-6 py-3 text-lg font-medium rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Explore Products
          </a>
        </div>

        {/* Image or Illustration */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?semt=ais_hybrid&w=740"
            alt="Shopping Illustration"
            className="rounded-xl shadow-2xl w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
