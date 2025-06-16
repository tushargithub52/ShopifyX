import { Route, Routes } from "react-router-dom";
import Products from "./../pages/Products";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/admin/ProductDetails";
import CreateProduct from "../pages/admin/CreateProduct";
import PageNotFound from "../pages/PageNotFound";
import UserProfile from "../pages/user/UserProfile";
import AuthWrapper from "./AuthWrapper";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AuthWrapper><Products /></AuthWrapper>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/create-product" element={<AuthWrapper><CreateProduct /></AuthWrapper>} />
      <Route path="/product/:id" element={<AuthWrapper><ProductDetails /></AuthWrapper>} />
      <Route path="/user-profile" element={<AuthWrapper><UserProfile /></AuthWrapper>} />


      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
