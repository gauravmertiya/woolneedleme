import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-primary hover:text-white transition">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Add (on hover) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-sm translate-y-full group-hover:translate-y-0 transition duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </span>

          {/* Rating */}
          <span className="text-yellow-500 text-xs">
            ★★★★☆
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-heading text-lg font-bold text-foreground">
              ₹{product.price}
            </span>
            <p className="text-xs text-muted-foreground">
              Free Delivery
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;