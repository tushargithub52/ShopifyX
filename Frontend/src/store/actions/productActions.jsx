import { toast } from "react-toastify"
import axios from "../../api/axiosconfig"
import { loadproduct } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch, getState) => {
    try {
        const {data} = await axios.get("/products");
        dispatch(loadproduct(data));
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}

export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);
        dispatch(asyncloadproducts());
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}

export const asyncupdateproduct = (id, product) => async (dispatch, getState) => {
    try {
        await axios.patch("/products/"+ id, product);
        dispatch(asyncloadproducts());
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}
export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/products/"+ id);
        dispatch(asyncloadproducts());
    } catch (error) {
        toast.error("Something went wrong", error);
    }
}
