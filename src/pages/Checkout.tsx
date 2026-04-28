import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";


/* ✅ Fix TypeScript Razorpay error */
declare global {
  interface Window {
    Razorpay: any;
  }
}



const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
  if (!user) {
    navigate("/login");
  }
}, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    // 🔒 Validation
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const options = {
      key: "rzp_test_Si1dfycpEXt2Cp", // 🔑 your key
      amount: totalPrice * 100,
      currency: "INR",
      name: "WoolNeedleMe",
      description: "Order Payment",

   handler: async function (response: any) {
  try {
    const orderData = {
      userEmail: user?.email, // 🔐 link order to user
      items,
      total: totalPrice,
      customer: form,
      paymentId: response.razorpay_payment_id,
      date: new Date().toISOString(),
      status: "Paid",
    };

    // ✅ Save to backend (MongoDB)
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const savedOrder = await res.json();

    toast.success("Order placed successfully 🎉");

    clearCart();

    // ✅ Redirect with DB order
    navigate("/order-success", { state: { order: savedOrder } });

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while saving order");
  }
},
      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
  <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">

    {/* LEFT: FORM */}
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6">Shipping Details</h2>

      <div className="space-y-5">

        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            name="name"
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Phone</label>
          <input
            name="phone"
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Address</label>
          <input
            name="address"
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">City</label>
            <input
              name="city"
              onChange={handleChange}
              className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Pincode</label>
            <input
              name="pincode"
              onChange={handleChange}
              className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-8 text-sm text-gray-500 space-y-1">
        <p>🚚 Free Delivery on all orders</p>
        <p>🔒 Secure Payment via Razorpay</p>
      </div>
    </div>

    {/* RIGHT: SUMMARY */}
    <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              ₹{item.product.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t my-6"></div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-pink-600">₹{totalPrice}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleOrder}
        className="mt-6 w-full bg-pink-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-pink-700 transition"
      >
        Pay ₹{totalPrice}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Powered by Razorpay
      </p>
    </div>
  </div>
);
};

export default Checkout;