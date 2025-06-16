import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { asyncdeleteuser, asyncupdateuser } from "../../store/actions/userActions";

const UserProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        password: "******", // never prefill real password
      });
    }
  }, [user, reset]);

  const onError = (errors) => {
    Object.values(errors).forEach((err) => toast.error(err.message));
  };

  const updateHandler = (updatedUser) => {
    dispatch(asyncupdateuser(user.id, updatedUser));
  };

  const deleteHandler = () => {
    dispatch(asyncdeleteuser(user.id));
    navigate('/');
  };

  if (!user) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center">
      {/* Left - Profile Card */}
      <div className="w-full md:w-1/3 bg-[#1e293b] rounded-2xl shadow-lg p-6 border border-slate-700 text-center">
        <div className="flex justify-center mb-4">
          <User size={100} className="bg-gray-100 text-gray-800 rounded-full p-2" />
        </div>
        <h2 className="text-2xl font-semibold">{user.username}</h2>
        <p className="text-slate-400 text-sm">{user.email}</p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-6 w-full bg-gradient-to-r from-indigo-700 to-teal-700 py-2 px-4 rounded-md font-semibold hover:scale-105 transition-all duration-200"
        >
          {showForm ? "Hide Form" : "Edit Profile"}
        </button>
      </div>

      {/* Right - Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(updateHandler, onError)}
          className="w-full md:w-2/3 bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-slate-700"
        >
          <h2 className="text-2xl font-bold text-violet-400 text-center mb-6">Modify your profile</h2>

          <div className="space-y-4">
            <input
              {...register("username", { required: "Username cannot be empty" })}
              className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="text"
              placeholder="Username"
            />

            <input
              {...register("email", {
                required: "Email cannot be empty",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="email"
              placeholder="Email"
            />

            <input
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="password"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-violet-500 to-indigo-600 text-white py-3 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Update User
          </button>

          <button
            type="button"
            onClick={deleteHandler}
            className="w-full mt-4 bg-gradient-to-r from-red-400 to-red-600 text-white py-3 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Delete User
          </button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
