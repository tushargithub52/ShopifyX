import { useForm } from "react-hook-form"
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { asyncregisteruser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const registerhandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    dispatch(asyncregisteruser(user));
    reset();
    navigate("/login");
  };

  const onerror = (errors) => {
    toast.error(errors?.email?.message);
    toast.error(errors?.password?.message);
    toast.error(errors?.username?.message);
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-[#0f172a] text-white px-4">
      <form
        onSubmit={handleSubmit(registerhandler, onerror)}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#1e293b] border border-slate-700"
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/16765/16765670.png"
            alt="user icon"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-violet-400">
          Create your account
        </h2>

        <div className="space-y-4">
          <input
            {...register("username", { required: "Username cannot be empty" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="text"
            placeholder="Username"
          />

          <input
            {...register("email", { required: "Email cannot be empty" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="email"
            placeholder="Email"
          />

          <input
            {...register("password", { required: "Password cannot be empty" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-violet-500 to-indigo-600 text-white py-3 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register