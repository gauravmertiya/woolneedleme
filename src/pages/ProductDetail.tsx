import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // ✅ added
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ReviewSection from "@/components/ReviewSection";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { user } = useAuth(); // ✅ added
  const navigate = useNavigate(); // ✅ added
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  // ⭐ Reviews logic
  const allReviews = JSON.parse(localStorage.getItem("reviews") || "{}");
  const productReviews = allReviews[product.id] || [];

  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (sum: number, r: any) => sum + r.rating,
            0
          ) / productReviews.length
        ).toFixed(1)
      : "No rating";

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // 🔒 Protected Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    for (let i = 0; i < quantity; i++) addItem(product);
    setQuantity(1);
  };

  // 🔒 Protected Buy Now
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    for (let i = 0; i < quantity; i++) addItem(product);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Back */}
      <Link
        to="/shop"
        className="text-sm text-muted-foreground mb-6 inline-block"
      >
        ← Back to Shop
      </Link>

      <div className="grid md:grid-cols-3 gap-10">

        {/* IMAGE */}
        <div className="md:col-span-1 sticky top-24">
          <div className="border rounded-xl overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="md:col-span-1 space-y-4">

          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {/* ⭐ Dynamic rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-green-600 text-white px-2 py-1 rounded">
              {avgRating} ★
            </span>
            <span className="text-muted-foreground">
              ({productReviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div>
            <p className="text-3xl font-bold">₹{product.price}</p>
            <p className="text-sm text-green-600">
              Inclusive of all taxes
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>

            <div className="flex border rounded-lg">
              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className="px-3 py-2"
              >
                <Minus size={16} />
              </button>

              <span className="px-4 py-2">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Delivery */}
          <div className="text-sm space-y-1">
            <p>🚚 Delivery in 3–5 days</p>
            <p>📦 Free shipping available</p>
          </div>

        </div>

        {/* BUY BOX */}
        <div className="md:col-span-1 border rounded-xl p-6 bg-white space-y-4 h-fit">

          <p className="text-xl font-bold">₹{product.price}</p>

          <p className="text-sm text-muted-foreground">
            FREE delivery by tomorrow
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full border py-3 rounded-lg"
          >
            Buy Now
          </button>

          <div className="text-sm text-muted-foreground">
            <p>🔒 Secure transaction</p>
            <p>🧶 Handmade product</p>
          </div>
        </div>

      </div>

      {/* PRODUCT DETAILS */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">
          Product Details
        </h2>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Handmade crochet product</p>
          <p>• Premium yarn quality</p>
          <p>• Lightweight and durable</p>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <ReviewSection productId={product.id} />
    </div>
  );
};

export default ProductDetail;