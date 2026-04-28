import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { products } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth(); // ✅ auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/orders", label: "Orders" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold text-foreground">
          WoolNeedleMe
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
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

          {/* 🔐 Auth */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-lg"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hi, {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="text-muted-foreground hover:text-foreground">
            <Heart className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">

            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 pl-10"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>

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
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Create Account
                </Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;