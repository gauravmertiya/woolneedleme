import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-primary underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden bg-card border">
          <img src={product.image} alt={product.name} width={800} height={800} className="w-full aspect-square object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category}</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="font-heading text-3xl font-bold text-primary mb-6">₹{product.price}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-foreground hover:bg-accent transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-foreground hover:bg-accent transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={handleAddToCart}
              className="flex-1 border-2 border-primary text-foreground px-6 py-3 rounded-lg font-medium text-center hover:bg-accent transition-colors"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
            <Heart className="w-4 h-4" /> Handmade with Love Badge
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
