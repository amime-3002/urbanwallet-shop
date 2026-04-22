import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag, Star, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, getProductVariants } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedImage(0);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-gold font-body hover:underline">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const variants = getProductVariants(product);

  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-square overflow-hidden rounded-sm bg-surface-sunken mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-gold" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2 capitalize">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="font-display text-3xl font-bold text-gold">{product.price.toLocaleString()} DA</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">{product.originalPrice.toLocaleString()} DA</span>
              )}
            </div>

            <p className="font-body text-muted-foreground leading-relaxed mb-8">{product.longDescription}</p>

            <div className="mb-8">
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Color</p>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant) => (
                  <Button
                    key={variant.id}
                    asChild
                    variant={variant.id === product.id ? "default" : "outline"}
                    className={`h-9 rounded-sm px-4 font-body text-sm ${
                      variant.id === product.id
                        ? "bg-gold hover:bg-gold-dark text-accent-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Link to={`/product/${variant.id}`}>{variant.color}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 font-body text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-sm border border-border">Type: {product.type}</span>
            </div>

            <Button
              onClick={handleAdd}
              className={`w-full py-6 font-body tracking-wider text-base transition-all ${
                added
                  ? "bg-green-600 hover:bg-green-700 text-primary-foreground"
                  : "bg-gold hover:bg-gold-dark text-accent-foreground"
              }`}
            >
              {added ? (
                <><Check className="mr-2" size={18} /> Added to Cart</>
              ) : (
                <><ShoppingBag className="mr-2" size={18} /> Add to Cart</>
              )}
            </Button>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Free Shipping over 20,000 DA", "30-Day Returns", "RFID Protection", "Lifetime Warranty"].map((feat) => (
                <div key={feat} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                  <Check size={12} className="text-gold" /> {feat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
