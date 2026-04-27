import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data.reverse()); // latest first
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">📦 Orders Dashboard</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-6 border"
            >
              {/* Header */}
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Paid
                </span>
              </div>

              {/* Customer */}
              <div className="mb-4">
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
              </div>

              {/* Items */}
              <div className="border-t pt-3">
                {order.items.map((item: any) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right mt-4 font-bold text-lg">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;