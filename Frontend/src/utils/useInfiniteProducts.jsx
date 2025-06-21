import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosconfig";
import { loadlazyproduct } from "../store/reducers/productSlice";

const useInfiniteProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [hasmore, setHasmore] = useState(true);

  const fetchmoreproducts = async () => {
    try {
      const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);

      if (data.length === 0) {
        setHasmore(false);
      } else {
        setHasmore(true);
        dispatch(loadlazyproduct(data));
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      setHasmore(false);
    }
  };

  useEffect(() => {
    fetchmoreproducts();
  }, []);

  return { products, hasmore, setHasmore, fetchmoreproducts };
};

export default useInfiniteProducts;
