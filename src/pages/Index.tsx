import { Link } from "react-router-dom";
import { ArrowRight, Heart, Star, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const testimonials = [
  { name: "Priya S.", text: "The crochet bunny I ordered was absolutely adorable! You can feel the love in every stitch.", rating: 5 },
  { name: "Ananya R.", text: "Gifted the flower bouquet to my mom — she loved it! Beautiful craftsmanship.", rating: 5 },
  { name: "Meera K.", text: "The baby blanket is so soft and the colors are gorgeous. Will order again!", rating: 5 },
];

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Handmade crochet creations" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-40 text-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Handmade with Love
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
              Cozy Crochet<br />Creations
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-xl mx-auto mb-8 font-body">
              Handmade with love, cozy creations for everyday life
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Made with Love", desc: "Every piece is handcrafted with care" },
            { icon: Sparkles, title: "Unique & Special", desc: "No two pieces are exactly alike" },
            { icon: Star, title: "Premium Yarn", desc: "Soft, durable, baby-safe materials" },
          ].map((f) => (
            <div key={f.title} className="text-center p-6 rounded-xl bg-accent/50">
              <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Our Bestsellers</h2>
          <p className="text-muted-foreground">The pieces our customers love the most</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-2 border-primary text-foreground px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-accent/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card p-6 rounded-xl border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4 italic">"{t.text}"</p>
                <p className="font-heading font-semibold text-foreground text-sm">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blush rounded-2xl p-10 md:p-16">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Want Something Custom?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Have a specific design in mind? We'd love to create a custom crochet piece just for you!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Request Custom Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
