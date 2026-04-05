import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Gem, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import heroImage from "@/assets/hero-wallet.jpg";
import walletMens1 from "@/assets/wallet-mens-1.jpg";
import walletWomens1 from "@/assets/wallet-womens-1.jpg";
import walletMinimal1 from "@/assets/wallet-minimal-1.jpg";
import walletLeather1 from "@/assets/wallet-leather-1.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const categories = [
  { name: "Men", image: walletMens1, slug: "men" },
  { name: "Women", image: walletWomens1, slug: "women" },
  { name: "Minimalist", image: walletMinimal1, slug: "minimalist" },
  { name: "Leather", image: walletLeather1, slug: "leather" },
];

const testimonials = [
  { name: "James R.", text: "The quality is unmatched. My Classic Bifold has aged beautifully over 2 years.", rating: 5 },
  { name: "Sarah M.", text: "The Elegance Zip is my daily companion. Stunning craftsmanship and so practical.", rating: 5 },
  { name: "David K.", text: "I've tried many minimalist wallets — the Stealth is on another level. Sleek and functional.", rating: 5 },
];

const Index = () => {
  const featured = getFeaturedProducts();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImage} alt="UrbanWallet luxury leather wallet" className="w-full h-full object-cover opacity-60" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10 py-32 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-4">Premium Leather Goods</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Carry Style.<br />
              Carry <span className="text-gold">Confidence.</span>
            </h1>
            <p className="font-body text-primary-foreground/70 mt-6 text-lg max-w-md leading-relaxed">
              Handcrafted wallets designed for those who appreciate the finer things in life.
            </p>
            <div className="flex gap-4 mt-10">
              <Button asChild className="bg-gold hover:bg-gold-dark text-accent-foreground font-body tracking-wider px-8 py-6">
                <Link to="/shop">Shop Now <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body tracking-wider px-8 py-6">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Best Sellers</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center mt-12">
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-accent-foreground font-body tracking-wider px-8">
              <Link to="/shop">View All Products</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-surface-sunken">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Browse By</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Categories</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="font-display text-xl font-bold text-primary-foreground tracking-wider">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Our Promise</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Crafted With Purpose</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Every UrbanWallet is born from a commitment to exceptional quality. We source only the finest full-grain leathers, 
                hand-selected for their texture, durability, and natural beauty. Our artisans combine time-honored techniques 
                with modern design to create wallets that are as functional as they are elegant.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                From the first stitch to the final inspection, every detail matters. Because your wallet isn't just an accessory — 
                it's a reflection of who you are.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="grid grid-cols-3 gap-8">
              {[
                { icon: Shield, label: "RFID Protected", desc: "Advanced security" },
                { icon: Gem, label: "Premium Leather", desc: "Full-grain quality" },
                { icon: Clock, label: "Built to Last", desc: "Lifetime warranty" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-3">
                    <item.icon className="text-gold" size={24} />
                  </div>
                  <h4 className="font-display text-sm font-semibold mb-1">{item.label}</h4>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="border border-primary-foreground/10 rounded-sm p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-primary-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
                <p className="font-display text-sm font-semibold text-primary-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Ready?</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Elevate Your Everyday Carry
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of discerning individuals who trust UrbanWallet for quality, 
              style, and craftsmanship that stands the test of time.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-accent-foreground font-body tracking-wider px-12 py-6 text-base">
              <Link to="/shop">Shop the Collection <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
