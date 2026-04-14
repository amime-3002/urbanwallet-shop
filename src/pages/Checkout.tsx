import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  if (items.length === 0) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-gold font-body hover:underline">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order placed!", description: "Thank you for your purchase." });
    clearCart();
  };

  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold mb-10"
        >
          Checkout
        </motion.h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="font-display text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" required className="bg-surface-sunken border-border font-body" />
                <Input placeholder="Last Name" required className="bg-surface-sunken border-border font-body" />
                <Input placeholder="Email" type="email" required className="bg-surface-sunken border-border font-body sm:col-span-2" />
                <Input placeholder="Address" required className="bg-surface-sunken border-border font-body sm:col-span-2" />
                <Input placeholder="City" required className="bg-surface-sunken border-border font-body" />
                <Input placeholder="ZIP Code" required className="bg-surface-sunken border-border font-body" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold mb-4">Payment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Card Number" required className="bg-surface-sunken border-border font-body sm:col-span-2" />
                <Input placeholder="MM/YY" required className="bg-surface-sunken border-border font-body" />
                <Input placeholder="CVC" required className="bg-surface-sunken border-border font-body" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 border border-border rounded-sm p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                    <span>{(item.product.price * item.quantity).toLocaleString()} DA</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>{totalPrice >= 20000 ? "Free" : "1,500 DA"}</span>
                </div>
                <div className="flex justify-between font-display text-lg font-bold mt-2">
                  <span>Total</span>
                  <span className="text-gold">{(totalPrice + (totalPrice >= 20000 ? 0 : 1500)).toLocaleString()} DA</span>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-body tracking-wider py-6">
                <Lock className="mr-2" size={16} /> Place Order
              </Button>
              <p className="text-xs text-muted-foreground text-center font-body">Secure checkout · SSL encrypted</p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
