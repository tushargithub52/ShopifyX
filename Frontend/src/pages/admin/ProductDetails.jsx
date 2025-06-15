import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productActions";
import { useForm } from 'react-hook-form';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);
  const products = useSelector((state) => state.productReducer.products);

  // console.log(user, products)

  const product = products?.find((product) => product.id == id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });

  const UpdateProductHandler = (updatedProduct) => {
    dispatch(asyncupdateproduct(id, updatedProduct));
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteproduct(id));
    navigate("/products");
  };

  return product ? (

    <div className="min-h-screen bg-[#121826] text-white px-8 py-10">

      {/* Back button */}
    <div className="mb-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow transition"
      >
        ← Back
      </button>
    </div>
    
      <div className="flex flex-col md:flex-row items-start gap-10">
        <img
          className="w-full md:w-1/2 h-[400px] object-contain bg-[#1f2937] rounded-lg p-4"
          src={product.image}
          alt={product.title}
        />
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <h2 className="text-2xl text-green-400 mb-2">${product.price}</h2>
          <p className="text-gray-300 mb-6">{product.description}</p>
          <p className="text-sm text-gray-400 mb-4">Category: {product.category}</p>
          <button className="bg-violet-600 px-6 py-2 rounded hover:bg-violet-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {user && user?.isAdmin && (
        <>
          <hr className="my-10 border-gray-700" />
          <h3 className="text-2xl font-semibold mb-4">Admin: Update Product</h3>
          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              {...register("image")}
              className="p-3 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
              type="url"
              placeholder="Image URL"
            />
            <input
              {...register("title")}
              className="p-3 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
              type="text"
              placeholder="Title"
            />
            <input
              {...register("price")}
              className="p-3 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
              type="number"
              placeholder="Price"
            />
            <input
              {...register("category")}
              className="p-3 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
              type="text"
              placeholder="Category"
            />
            <textarea
              {...register("description")}
              className="col-span-full p-3 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
              rows="4"
              placeholder="Product Description"
            />
            <div className="col-span-full flex gap-4 mt-4">
              <button type="submit" className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">
                Update Product
              </button>
              <button
                type="button"
                onClick={DeleteHandler}
                className="bg-red-500 px-6 py-2 rounded hover:bg-red-600"
              >
                Delete Product
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#121826] text-white">
      Loading...
    </div>
  );
};

export default ProductDetails;
