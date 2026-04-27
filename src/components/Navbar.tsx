import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { products } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth(); // ✅ auth added
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/orders", label: "Orders" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // 🔍 Search suggestions
  const filteredSuggestions = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold text-foreground">
          WoolNeedleMe
        </Link>

        {/* 🔍 Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          {/* Suggestions */}
          {search && (
            <div className="absolute top-full left-0 w-full bg-background border mt-2 rounded-lg shadow-lg z-50">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                    onClick={() => setSearch("")}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-muted-foreground">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition ${
                isActive(link.to)
                  ? "text-foreground font-semibold underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* ❤️ Wishlist */}
          <Link to="/wishlist" className="text-muted-foreground hover:text-foreground">
            <Heart className="w-5 h-5" />
          </Link>

          {/* 🛒 Cart */}
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 👤 Auth Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="text-muted-foreground hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block text-sm text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">

            {/* Mobile Search */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 ${
                  isActive(link.to)
                    ? "text-foreground font-semibold underline"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <div className="flex flex-col gap-2 text-sm">
                <span>{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-muted-foreground"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-muted-foreground"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;