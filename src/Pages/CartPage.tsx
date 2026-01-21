import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {

    const { cart,increment,decrement,removeProduct,clearCart } = useCart();
     
    const total_product = cart.reduce(
        (sum:number,curr:number) => sum + curr?.quantity,0
    );

    const total_price = cart.reduce(
        (sum:number,curr:number) => sum + curr?.price * curr?.quantity,0
    )
    const navigate = useNavigate();

    return (
    <>
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart && cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart &&  cart.map((item : any) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => decrement(item.id)}> - </button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item.id)}> + </button>
                <button
                onClick={() => removeProduct(item.id)}
                className="text-red-500 ml-2"
                >
                    Remove
                </button>
                </div>
            </div>
          ))}

        <div className="flex gap-4 mt-4">
          total Items : {total_product} <br/>
          total price : ${total_price.toFixed(2)}
          </div>

          <button onClick={clearCart} className="bg-red-500 text-white rounded px-4 py-2"> Clear Cart</button>

          <button onClick={() => navigate('/checkout-page')}
          className=" ml-3 px-4 py-2 bg-green-600 text-white rounded"> checkout </button>
        </div>

      )}
    </div>
    </>
    )
}