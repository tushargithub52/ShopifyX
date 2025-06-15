import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncloginuser } from "../store/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const loginhandler = (user) => {
    dispatch(asyncloginuser(user));
    navigate("/");
    reset();
  };

  const onerror = (errors) => {
    toast.error(errors?.email?.message);
    toast.error(errors?.password?.message);
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-[#0f172a] text-white px-4">
      <form
        onSubmit={handleSubmit(loginhandler, onerror)}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#1e293b] border border-slate-700"
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3711/3711310.png"
            alt="login icon"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Welcome Back!
        </h2>

        <div className="space-y-4">
          <input
            {...register("email", { required: "Email cannot be empty" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="email"
            placeholder="Email"
          />

          <input
            {...register("password", { required: "Password cannot be empty" })}
            className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 py-3 rounded-md font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
