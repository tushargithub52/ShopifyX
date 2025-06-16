import { useSelector, useDispatch } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const DecreaseQuantityHandler = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };

    if (copyuser.cart[index].quantity > 0) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index, 1);
    }
    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const IncreaseQuantityHandler = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };

    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };
    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const totalPrice = user.cart.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
    0
  );

  const CartItems = user.cart.map((item, index) => {
    return (
      <div
        key={item.product.id}
        className="flex flex-col sm:flex-row items-center gap-4 bg-[#1f2937] p-4 rounded-lg shadow-gray-600 shadow-xs border-none"
      >
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-28 h-28 object-contain"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{item.product.title}</h3>
          <p className="text-sm text-gray-400">{item.product.category}</p>
          <p className="text-sm text-gray-300 font-semibold mt-1">
            ${item.product.price}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => DecreaseQuantityHandler(index)}
            className="text-lg bg-gray-700 hover:bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white"
          >
            -
          </button>
          <span className="px-3 py-1 text-md rounded bg-gray-800 border border-gray-600 text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => IncreaseQuantityHandler(index)}
            className="text-lg bg-gray-700 hover:bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white"
          >
            +
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-[#111827] min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Cart</h1>

        {user.cart.length === 0 ? (
          <p className="text-gray-400 text-lg">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="flex flex-col gap-6">{CartItems}</div>

            <div className="mt-10 flex flex-col gap-4 border-t border-gray-700 pt-4 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="text-lg font-medium">
                  Total Items:{" "}
                  <span className="font-bold">{user.cart.length}</span>
                </p>
                <p className="text-lg font-medium">
                  Total Price:{" "}
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </p>
              </div>

              <button className="self-start sm:self-end px-6 py-2.5 bg-emerald-700 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300">
                🛍️ Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
