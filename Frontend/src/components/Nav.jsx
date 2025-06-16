import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asynclogoutuser } from "../store/actions/userActions";
import { useState } from "react";
import { Menu, X, User } from "lucide-react"; // 👈 Import User icon

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
        { label: "Logout", action: handleLogout },
        // Removed "Profile" label – handled separately via icon
      ]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  const renderNavLink = (item, isMobile = false) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => isMobile && setMenuOpen(false)}
      className={({ isActive }) =>
        `${isActive
          ? isMobile
            ? "text-amber-300"
            : "text-violet-400 border-b-2 border-violet-400"
          : "text-white"} hover:text-violet-400 transition-all duration-200`
      }
    >
      {item.label}
    </NavLink>
  );

  const renderAuthItem = (item, index, isMobile = false) =>
    item.to ? (
      renderNavLink(item, isMobile)
    ) : (
      <button
        key={index}
        onClick={() => {
          item.action();
          isMobile && setMenuOpen(false);
        }}
        className={`${
          isMobile
            ? "text-white hover:text-red-400 text-left"
            : "text-white bg-red-600 hover:opacity-80 px-3 py-1 rounded-lg"
        } transition-all duration-200`}
      >
        {item.label}
      </button>
    );

  return (
    <nav className="bg-[#121826] text-white px-6 py-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-violet-400">ShopifyX</div>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center text-lg">
          {navItems.map(item => renderNavLink(item))}
          {authItems.map((item, index) => renderAuthItem(item, index))}

          {user && (
            <button
              onClick={() => navigate("/user-profile")}
              title="Profile"
              className="hover:invert active:scale-85 text-gray-950 transition duration-200 bg-gray-100 rounded-[50%] p-1 cursor-pointer"
            >
              <User size={26} />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
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
          {navItems.map(item => renderNavLink(item, true))}
          {authItems.map((item, index) => renderAuthItem(item, index, true))}

          {user && (
            <button
              onClick={() => {
                navigate("/user-profile");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-white hover:text-amber-300"
            >
              <User size={22} />
              <span>Profile</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
