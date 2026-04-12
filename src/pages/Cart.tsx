import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Time to fill it with some cozy goodies!</p>
        <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card p-4 rounded-xl border">
              <Link to={`/product/${item.product.id}`}>
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover" loading="lazy" width={96} height={96} />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-heading font-semibold text-foreground">{item.product.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm">{item.product.category}</p>
                <p className="font-heading font-bold text-foreground mt-1">₹{item.product.price}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-foreground hover:bg-accent transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-foreground hover:bg-accent transition-colors">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-xl border h-fit sticky top-24">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm text-muted-foreground">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Shipping</span>
              <span>{totalPrice >= 999 ? "Free" : "₹49"}</span>
            </div>
            <div className="flex justify-between font-heading font-bold text-lg text-foreground">
              <span>Total</span>
              <span>₹{totalPrice + (totalPrice >= 999 ? 0 : 49)}</span>
            </div>
          </div>
          {/* Coupon */}
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Coupon code" className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm" />
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium">Apply</button>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
