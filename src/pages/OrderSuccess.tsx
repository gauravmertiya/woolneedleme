import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order || null;

  if (!order) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">No order found</h1>
        <p className="text-gray-500">Try placing an order again.</p>

        <Link
          to="/shop"
          className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-10 text-center">

      {/* Success */}
      <div className="text-5xl mb-4">🎉</div>

      <h1 className="text-3xl font-bold mb-2">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-500 mb-6">
        Thank you for shopping with us 💖
      </p>

      {/* Order Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 text-left mb-6">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
        <p><strong>Total:</strong> ₹{order.total}</p>
      </div>

      {/* Items */}
      <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
        {order.items.map((item: any) => (
          <p key={item.product.id}>
            {item.product.name} x {item.quantity}
          </p>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/shop"
        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;