import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [user]);

  // 🔥 Auto update status (demo logic)
  const getStatus = (date: string) => {
    const orderTime = new Date(date).getTime();
    const now = Date.now();
    const diff = now - orderTime;

    if (diff < 60000) return "Pending";
    if (diff < 120000) return "Shipped";
    return "Delivered";
  };

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "text-yellow-500";
    if (status === "Shipped") return "text-blue-500";
    return "text-green-500";
  };

  if (!user) {
    return <div className="p-10 text-center">Please login</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">

      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => {
            const status = getStatus(order.createdAt); // ✅ FIXED

            return (
              <div key={order._id} className="border rounded-lg p-4">

                {/* Header */}
                <div className="flex justify-between mb-3">
                  <span className="font-medium">
                    Order ID: {order._id}
                  </span>

                  <span className={`font-semibold ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
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
                <div className="mt-4 text-right font-semibold">
                  Total: ₹{order.total}
                </div>

                {/* Timeline */}
                <div className="mt-4 text-xs text-muted-foreground">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Orders;