import MainRoutes from "./routes/MainRoutes"
import Nav from "./components/Nav.jsx"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { asyncloadproducts } from "./store/actions/productActions.jsx"
import { asynccurrentuser } from "./store/actions/userActions.jsx"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadproducts());
    dispatch(asynccurrentuser());
  }, [])
  
  return (
    <>
      <Nav />
      <MainRoutes />
      <ToastContainer position="top-center" theme="light" autoClose={1000} closeOnClick={true} />
    </>
  )
}

export default App