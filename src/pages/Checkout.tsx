import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });

  const shipping = totalPrice >= 999 ? 0 : 49;

  if (items.length === 0 && !submitted) {
    navigate("/cart");
    return null;
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your order, {form.name}!</p>
        <p className="text-muted-foreground mb-8 text-sm">We'll start crafting your items with love. You'll receive a confirmation shortly.</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill in all fields");
      return;
    }
    clearCart();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/cart" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Details */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "phone", label: "Phone Number", type: "tel" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm"
                    required
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm"
                  rows={2}
                  required
                />
              </div>
              {[
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "pincode", label: "Pincode" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                  <input
                    type="text"
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "upi", label: "UPI (GPay, PhonePe, Paytm)" },
                { value: "card", label: "Debit / Credit Card" },
                { value: "cod", label: "Cash on Delivery" },
              ].map((opt) => (
                <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${payment === opt.value ? "border-primary bg-accent" : "hover:bg-accent/50"}`}>
                  <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="accent-primary" />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card p-6 rounded-xl border h-fit sticky top-24">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" width={48} height={48} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-foreground">₹{item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-heading font-bold text-lg text-foreground border-t pt-2">
              <span>Total</span><span>₹{totalPrice + shipping}</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium mt-6 hover:opacity-90 transition-opacity">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
