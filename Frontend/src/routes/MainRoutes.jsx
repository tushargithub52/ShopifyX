import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./../pages/Home"));
const Products = lazy(() => import("./../pages/Products"));
const Login = lazy(() => import("./../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("./../pages/Cart"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products"
        element={
          <AuthWrapper>
            <Products />
          </AuthWrapper>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />
      <Route
        path="/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
