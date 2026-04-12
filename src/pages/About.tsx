import { Heart, Sparkles, Star } from "lucide-react";

const About = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="max-w-3xl mx-auto text-center">
      <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
        <Heart className="w-4 h-4 text-primary" /> Our Story
      </span>
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">Handmade with Love</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        WoolNeedleMe was born from a simple love for creating — one stitch at a time. What started as a hobby during quiet evenings has blossomed into a brand that celebrates the beauty of handmade craftsmanship.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Every piece we create is made with premium, baby-safe yarn and finished with care. From adorable amigurumi toys to cozy blankets and forever flowers, each item carries a piece of our heart. We believe in slow fashion, sustainability, and the magic of handmade things.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
      {[
        { icon: Heart, title: "Crafted with Care", desc: "Every stitch is made by hand with attention to detail and love." },
        { icon: Sparkles, title: "Sustainable & Ethical", desc: "We use eco-friendly materials and sustainable practices." },
        { icon: Star, title: "One of a Kind", desc: "No two pieces are exactly the same — each one is uniquely yours." },
      ].map((item) => (
        <div key={item.title} className="text-center p-6 bg-accent/50 rounded-xl">
          <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
