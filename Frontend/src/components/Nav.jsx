import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asynclogoutuser } from "../store/actions/userActions";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(asynclogoutuser());
    navigate("/");
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    ...(user?.isAdmin ? [{ to: "/admin/create-product", label: "Create Product" }] : []),
  ];

  const authItems = user
    ? [
        {
          label: "Logout",
          action: handleLogout,
        },
      ]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <nav className="bg-[#121826] text-white px-6 py-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-violet-400">ShopifyX</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive ? "text-violet-400 border-b-2 border-violet-400" : "text-white"
                } hover:text-violet-400 transition-all duration-200`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {authItems.map((item, index) =>
            item.to ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-violet-400 border-b-2 border-violet-400" : "text-white"
                  } hover:text-violet-400 transition-all duration-200`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <button
                key={index}
                onClick={item.action}
                className="text-white hover:text-red-400 transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg bg-[#1f2937] p-4 rounded-lg shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive ? "text-amber-300" : "text-white"
                } hover:text-amber-300 transition-all duration-200`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {authItems.map((item, index) =>
            item.to ? (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-amber-300" : "text-white"
                  } hover:text-amber-300 transition-all duration-200`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setMenuOpen(false);
                }}
                className="text-white hover:text-red-400 transition-all duration-200 text-left"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
