import walletMens1 from "@/assets/wallet-mens-1.jpg";
import walletMens2 from "@/assets/wallet-mens-2.jpg";
import walletWomens1 from "@/assets/wallet-womens-1.jpg";
import walletWomens2 from "@/assets/wallet-womens-2.jpg";
import walletMinimal1 from "@/assets/wallet-minimal-1.jpg";
import walletMinimal2 from "@/assets/wallet-minimal-2.jpg";
import walletLeather1 from "@/assets/wallet-leather-1.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  category: "men" | "women" | "minimalist" | "leather";
  color: string;
  type: string;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "classic-bifold",
    name: "Classic Bifold",
    price: 17800,
    originalPrice: 24000,
    description: "Premium full-grain leather bifold wallet with RFID protection.",
    longDescription: "Handcrafted from the finest full-grain Italian leather, the Classic Bifold combines timeless elegance with modern functionality. Features 8 card slots, 2 bill compartments, and advanced RFID-blocking technology to keep your information secure.",
    image: walletMens1,
    images: [walletMens1, walletLeather1],
    category: "men",
    color: "Brown",
    type: "Bifold",
    featured: true,
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "elegance-zip",
    name: "Elegance Zip",
    price: 21800,
    description: "Sophisticated zip-around wallet with premium blush leather.",
    longDescription: "The Elegance Zip is designed for the modern woman who values both style and organization. Crafted from supple blush leather with gold-tone hardware, it features 12 card slots, a zip coin pocket, and multiple bill compartments — all secured with a smooth zip-around closure.",
    image: walletWomens1,
    images: [walletWomens1, walletWomens2],
    category: "women",
    color: "Pink",
    type: "Zip-around",
    featured: true,
    rating: 4.8,
    reviews: 187,
  },
  {
    id: "stealth-card",
    name: "Stealth Card Holder",
    price: 11800,
    description: "Ultra-slim cardholder for the modern minimalist.",
    longDescription: "Stripped down to essentials, the Stealth Card Holder is crafted from premium black leather with a sleek profile that fits effortlessly in any pocket. Holds up to 6 cards with a center cash slot. RFID-blocking lining included.",
    image: walletMinimal1,
    images: [walletMinimal1, walletMinimal2],
    category: "minimalist",
    color: "Black",
    type: "Cardholder",
    featured: true,
    rating: 4.7,
    reviews: 312,
  },
  {
    id: "heritage-leather",
    name: "Heritage Leather",
    price: 27800,
    description: "Artisan-crafted tan leather wallet that ages beautifully.",
    longDescription: "The Heritage Leather wallet celebrates traditional craftsmanship. Made from vegetable-tanned leather that develops a rich patina over time, each piece is unique. Features hand-stitched edges, 6 card slots, and 2 bill compartments.",
    image: walletLeather1,
    images: [walletLeather1, walletMens1],
    category: "leather",
    color: "Tan",
    type: "Bifold",
    featured: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "navigator-zip",
    name: "Navigator Zip",
    price: 19800,
    description: "Navy leather zip wallet with gold accent hardware.",
    longDescription: "The Navigator Zip brings a refined nautical touch to everyday carry. Premium navy leather exterior with contrasting gold zipper and interior card slots. Water-resistant coating ensures durability in any weather.",
    image: walletMens2,
    images: [walletMens2, walletMinimal2],
    category: "men",
    color: "Navy",
    type: "Zip-around",
    featured: false,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "bordeaux-clutch",
    name: "Bordeaux Clutch",
    price: 25800,
    description: "Statement burgundy clutch wallet with tassel detail.",
    longDescription: "Make a statement with the Bordeaux Clutch. Rich burgundy leather with an elegant tassel zipper pull, this versatile piece transitions seamlessly from day to evening. Features a wristlet strap, phone pocket, and 10 card slots.",
    image: walletWomens2,
    images: [walletWomens2, walletWomens1],
    category: "women",
    color: "Burgundy",
    type: "Clutch",
    featured: false,
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "carbon-slim",
    name: "Carbon Slim",
    price: 15800,
    description: "Modern carbon-fiber pattern slim wallet.",
    longDescription: "Where technology meets luxury. The Carbon Slim features a distinctive carbon-fiber patterned leather exterior with a magnetic money clip. Ultra-thin design holds up to 8 cards without adding bulk.",
    image: walletMinimal2,
    images: [walletMinimal2, walletMinimal1],
    category: "minimalist",
    color: "Black",
    type: "Slim",
    featured: false,
    rating: 4.5,
    reviews: 203,
  },
  {
    id: "artisan-fold",
    name: "Artisan Fold",
    price: 29800,
    originalPrice: 35800,
    description: "Hand-stitched full-grain leather trifold wallet.",
    longDescription: "Our masterpiece of leather craftsmanship. The Artisan Fold is hand-stitched by skilled artisans using centuries-old techniques. Full-grain leather, brass hardware, and a spacious trifold design with 12 card slots make this our most luxurious offering.",
    image: walletLeather1,
    images: [walletLeather1, walletMens1],
    category: "leather",
    color: "Tan",
    type: "Trifold",
    featured: false,
    rating: 5.0,
    reviews: 89,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductsByCategory = (cat: string) => products.filter((p) => p.category === cat);
