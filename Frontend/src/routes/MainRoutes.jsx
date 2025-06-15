import { Route, Routes } from "react-router-dom";
import Products from './../pages/Products';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from "../pages/Register";
import ProductDetails from "../pages/admin/ProductDetails";
import CreateProduct from "../pages/admin/CreateProduct";


const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/products" element={<Products /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register /> } />

        <Route path="/admin/create-product" element={<CreateProduct /> } />
        <Route path="/product/:id" element={<ProductDetails /> } />
    </Routes>
  )
}

export default MainRoutes