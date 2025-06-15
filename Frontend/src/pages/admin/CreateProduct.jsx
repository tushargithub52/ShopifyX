import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asynccreateproduct } from "../../store/actions/productActions";
import { nanoid } from "nanoid";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createProducthandler = (product) => {
    product.id = nanoid();
    dispatch(asynccreateproduct(product));
    navigate("/products");
    reset();
  };

  const onerror = (errors) => {
    toast.error(errors?.image?.message);
    toast.error(errors?.title?.message);
    toast.error(errors?.price?.message);
    toast.error(errors?.category?.message);
    toast.error(errors?.description?.message);
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit(createProducthandler, onerror)}
        className="w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-[#1e293b] border border-slate-700 text-white"
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9422/9422789.png"
            alt="Create Product Icon"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Create New Product
        </h2>

        <div className="space-y-4">
          <input
            {...register("image", { required: "Product-Image-URL required" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="url"
            placeholder="Product Image URL"
          />

          <input
            {...register("title", { required: "Product-Title required" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            placeholder="Product Title"
          />

          <input
            {...register("price", { required: "Product-price required" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="number"
            placeholder="Product Price"
          />

          <input
            {...register("category", { required: "Product-category required" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            placeholder="Product Category"
          />

          <textarea
            {...register("description", {
              required: "Product Description required",
            })}
            className="w-full h-28 px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Product Description"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 py-3 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;