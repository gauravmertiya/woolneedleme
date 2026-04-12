import { Link } from "react-router-dom";
import { Heart, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">WoolNeedleMe</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Handmade with love, cozy creations for everyday life. Every stitch tells a story.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Stay Connected</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe for updates & exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-1">Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by WoolNeedleMe © 2026</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
