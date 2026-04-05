import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-sm bg-surface-sunken aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={800}
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-gold text-accent-foreground text-xs font-body font-semibold px-2 py-1 rounded-sm">
              Sale
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-3 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-accent-foreground"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-gold text-gold" />
          <span className="text-xs font-body text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-semibold text-gold">${product.price}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
