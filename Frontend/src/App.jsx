import MainRoutes from "./routes/MainRoutes"
import Nav from "./components/Nav.jsx"
import { ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { asyncloadproducts } from "./store/actions/productActions.jsx"
import { asynccurrentuser } from "./store/actions/userActions.jsx"

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);
  const { products } = useSelector(state => state.productReducer);


  useEffect(() => {
    dispatch(asyncloadproducts());
    !user && dispatch(asynccurrentuser());
  }, [user])
  
  useEffect(() => {
    products.length == 0 && dispatch(asyncloadproducts());
  }, [products])

  return (
    <>
      <Nav />
      <MainRoutes />
      <ToastContainer position="top-center" theme="light" autoClose={1000} closeOnClick={true} />
    </>
  )
}

export default App