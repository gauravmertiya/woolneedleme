import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</span>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="font-heading text-lg font-bold text-foreground">₹{product.price}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
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
