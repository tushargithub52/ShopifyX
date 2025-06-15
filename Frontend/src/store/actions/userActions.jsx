import { toast } from "react-toastify"
import axios from "../../api/axiosconfig"
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncregisteruser = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/users", user);
        console.log(res)
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}

export const asyncloginuser = (user) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`);
        localStorage.setItem("user", JSON.stringify(data[0]))
        dispatch(loaduser(data[0]))
        toast.success("User Logged in successfully!")
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user")
        dispatch(removeuser());
        toast.success("User Logged out!")
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}

export const asynccurrentuser = () => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if(user) dispatch(loaduser(user))
        else toast.error("User not registered !")    
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}