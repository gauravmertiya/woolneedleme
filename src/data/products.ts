export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured: boolean;
}

// 🔥 Auto import all images from folder
const modules = import.meta.glob("../assets/*.{jpg,png,jpeg}", {
  eager: true,
});

const images = Object.values(modules).map((mod: any) => mod.default);

// 🎯 Categories pool
const categoryList = [
  "Amigurumi",
  "Blankets",
  "Flowers",
  "Accessories",
  "Home Decor",
];

// 🔥 Generate products automatically
export const products: Product[] = images.map((img, index) => ({
  id: String(index + 1),
  name: `Handmade Product ${index + 1}`,
  price: 499 + (index % 5) * 200,
  image: img,
  category: categoryList[index % categoryList.length],
  description:
    "Beautiful handmade crochet product crafted with love 🧶 Perfect for gifting and decor.",
  featured: index < 6, // first 6 featured
}));

// ✅ Keep categories (same as your UI)
export const categories = ["All", ...categoryList];