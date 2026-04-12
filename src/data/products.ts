import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Rosie the Bear",
    price: 1299,
    image: product1,
    category: "Amigurumi",
    description: "An adorable handmade crochet teddy bear in soft pastel pink yarn. Perfect as a gift for little ones or as a cozy decor piece. Each bear is carefully crafted with love, making it truly one-of-a-kind.",
    featured: true,
  },
  {
    id: "2",
    name: "Lavender Dream Blanket",
    price: 2499,
    image: product2,
    category: "Blankets",
    description: "A luxuriously soft baby blanket in lavender and cream stripes. Handmade with premium yarn, this blanket is perfect for snuggling, gifting, or draping over a nursery chair.",
    featured: true,
  },
  {
    id: "3",
    name: "Eternal Bloom Bouquet",
    price: 1799,
    image: product3,
    category: "Flowers",
    description: "A stunning crochet flower bouquet featuring roses and daisies in blush pink, cream, and sage green. Unlike real flowers, these beauties last forever — no watering required!",
    featured: true,
  },
  {
    id: "4",
    name: "Cozy Wrap Scarf",
    price: 999,
    image: product4,
    category: "Accessories",
    description: "A warm and elegant crochet scarf in natural beige tones. Perfect for chilly evenings, this handmade wrap adds a touch of handmade charm to any outfit.",
    featured: true,
  },
  {
    id: "5",
    name: "Pastel Coaster Set",
    price: 499,
    image: product5,
    category: "Home Decor",
    description: "A set of 4 handmade crochet coasters in beautiful pastel colors — pink, lavender, and cream. Adds a cozy, handmade touch to your coffee table.",
    featured: false,
  },
  {
    id: "6",
    name: "Market Tote Bag",
    price: 1599,
    image: product6,
    category: "Accessories",
    description: "A beautifully crafted crochet tote bag in natural beige cotton with leather handles. Sturdy, stylish, and perfect for market runs or everyday use.",
    featured: false,
  },
  {
    id: "7",
    name: "Lulu the Bunny",
    price: 1199,
    image: product7,
    category: "Amigurumi",
    description: "Meet Lulu — an irresistibly cute crochet bunny with a sweet pink bow tie. Handmade with soft, baby-safe yarn. A perfect companion for little ones.",
    featured: false,
  },
  {
    id: "8",
    name: "Bobble Cushion Cover",
    price: 899,
    image: product8,
    category: "Home Decor",
    description: "A chunky crochet cushion cover with a beautiful bobble texture in cream and blush pink. Instantly adds warmth and character to any couch or bed.",
    featured: false,
  },
];

export const categories = ["All", "Amigurumi", "Blankets", "Flowers", "Accessories", "Home Decor"];
