import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ALGERIA_WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane",
  "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet",
  "El M'Ghair", "El Meniaa"
];

const WILAYA_SHIPPING: Record<string, number> = {
  Algiers: 500,
  Blida: 800,
  Boumerdès: 800,
  Tipaza: 900,
  Bouira: 1000,
  Médéa: 1000,
  "Tizi Ouzou": 1100,
  Chlef: 1200,
  Béjaïa: 1200,
  Jijel: 1300,
  Sétif: 1300,
  "Aïn Defla": 1300,
  "Bordj Bou Arréridj": 1400,
  Mostaganem: 1500,
  Relizane: 1500,
  Tissemsilt: 1500,
  Skikda: 1600,
  Constantine: 1600,
  Mila: 1600,
  Oran: 1700,
  Mascara: 1700,
  Tiaret: 1700,
  Guelma: 1800,
  Annaba: 1800,
  "Oum El Bouaghi": 1800,
  "Souk Ahras": 1900,
  Batna: 1900,
  Saïda: 1900,
  "Sidi Bel Abbès": 1900,
  Tlemcen: 2000,
  Tébessa: 2000,
  Khenchela: 2000,
  "El Tarf": 2000,
  Laghouat: 2200,
  Djelfa: 2200,
  "M'Sila": 2200,
  Biskra: 2400,
  Naâma: 2500,
  "El Bayadh": 2500,
  Ghardaïa: 2800,
  "Ouled Djellal": 2800,
  Ouargla: 3200,
  Touggourt: 3200,
  "El Oued": 3300,
  Béchar: 3500,
  "Béni Abbès": 3600,
  "El M'Ghair": 3600,
  "El Meniaa": 3800,
  Timimoun: 4200,
  Adrar: 4500,
  "In Salah": 4800,
  Tindouf: 5200,
  Illizi: 5500,
  Tamanrasset: 5800,
  Djanet: 6000,
  "Bordj Badji Mokhtar": 6200,
  "In Guezzam": 6500,
};

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const shippingPrice = useMemo(() => selectedWilaya ? WILAYA_SHIPPING[selectedWilaya] : 0, [selectedWilaya]);

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
                <select
                  required
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border bg-surface-sunken px-3 py-2 text-base font-body text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  aria-label="Select your wilaya"
                >
                  <option value="" disabled>Select Wilaya</option>
                  {ALGERIA_WILAYAS.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
                <Input placeholder="ZIP Code" required className="bg-surface-sunken border-border font-body" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold mb-4">Payment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  required
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border bg-surface-sunken px-3 py-2 text-base font-body text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm sm:col-span-2"
                  aria-label="Select payment method"
                >
                  <option value="cash-on-delivery">Cash on delivery</option>
                  <option value="card">Credit / debit card</option>
                  <option value="baridimob">BaridiMob transfer</option>
                </select>
                {paymentMethod === "card" && (
                  <>
                    <Input placeholder="Cardholder Name" required className="bg-surface-sunken border-border font-body sm:col-span-2" />
                    <Input placeholder="Card Number" inputMode="numeric" required className="bg-surface-sunken border-border font-body sm:col-span-2" />
                    <Input placeholder="MM/YY" inputMode="numeric" required className="bg-surface-sunken border-border font-body" />
                    <Input placeholder="CVC" inputMode="numeric" required className="bg-surface-sunken border-border font-body" />
                  </>
                )}
                {paymentMethod === "baridimob" && (
                  <>
                    <Input placeholder="BaridiMob Phone Number" type="tel" required className="bg-surface-sunken border-border font-body" />
                    <Input placeholder="Transfer Reference" required className="bg-surface-sunken border-border font-body" />
                  </>
                )}
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
                  <span>{selectedWilaya ? `${shippingPrice.toLocaleString()} DA` : "Select wilaya"}</span>
                </div>
                <div className="flex justify-between font-display text-lg font-bold mt-2">
                  <span>Total</span>
                  <span className="text-gold">{(totalPrice + shippingPrice).toLocaleString()} DA</span>
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
