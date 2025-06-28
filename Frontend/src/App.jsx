import MainRoutes from "./routes/MainRoutes"
import Nav from "./components/Nav.jsx"
import { ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { asyncloadproducts } from "./store/actions/productActions.jsx"
import { asynccurrentuser } from "./store/actions/userActions.jsx"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);


  useEffect(() => {
    !user && dispatch(asynccurrentuser());
  }, [user])

  useGSAP(()=>{
    var tl = gsap.timeline()
    tl.from(".logo", {
      y:-15,
      duration:0.5,
      opacity:0
    });
    tl.from(".btns", {
      y:-15,
      duration:0.5,
      opacity:0,
      stagger:0.2
    });

  })

  return (
    <>
      <Nav />
      <MainRoutes />
      <ToastContainer position="top-center" theme="light" autoClose={1000} closeOnClick={true} />
    </>
  )
}

export default App