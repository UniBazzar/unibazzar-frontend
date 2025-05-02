import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
} from "../redux/slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalAmount);

  if (cartItems.length === 0) {
    return <div className="p-6 pt-20 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="p-6 pt-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border p-4 rounded shadow-sm bg-white"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-blue-600 font-bold">${item.price}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        imageUrl: item.imageUrl,
                      })
                    )
                  }
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right font-semibold text-xl">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
