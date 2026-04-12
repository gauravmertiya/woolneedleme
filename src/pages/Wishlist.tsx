import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
    <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Your Wishlist</h1>
    <p className="text-muted-foreground mb-6">Save your favorite items here. Sign in to sync across devices!</p>
    <Link to="/shop" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
      Explore Products
    </Link>
  </div>
);

export default Wishlist;
