import { useCart } from "@/context/CartContext";

export default function CartPage() {

    const { cart } = useCart();
     
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
            </div>
          ))}
        </div>
      )}
    </div>
    </>
    )
}