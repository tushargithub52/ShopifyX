import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
    const {user} = useSelector(state => state.userReducer);
  return (
    user ? props.children : <Navigate to="/login" />
  )
}

export default AuthWrapper