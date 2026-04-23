import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  Algiers: 400,
  Blida: 500,
  Boumerdès: 500,
  Tipaza: 500,
  Bouira: 600,
  Médéa: 600,
  "Tizi Ouzou": 650,
  Chlef: 700,
  Béjaïa: 700,
  Jijel: 750,
  Sétif: 750,
  "Aïn Defla": 700,
  "Bordj Bou Arréridj": 800,
  Mostaganem: 800,
  Relizane: 800,
  Tissemsilt: 800,
  Skikda: 850,
  Constantine: 850,
  Mila: 850,
  Oran: 900,
  Mascara: 900,
  Tiaret: 900,
  Guelma: 900,
  Annaba: 900,
  "Oum El Bouaghi": 900,
  "Souk Ahras": 950,
  Batna: 950,
  Saïda: 950,
  "Sidi Bel Abbès": 950,
  Tlemcen: 1000,
  Tébessa: 1000,
  Khenchela: 1000,
  "El Tarf": 1000,
  Laghouat: 1000,
  Djelfa: 1000,
  "M'Sila": 1000,
  Biskra: 1050,
  Naâma: 1050,
  "El Bayadh": 1050,
  Ghardaïa: 1100,
  "Ouled Djellal": 1100,
  Ouargla: 1100,
  Touggourt: 1100,
  "El Oued": 1100,
  Béchar: 1150,
  "Béni Abbès": 1150,
  "El M'Ghair": 1150,
  "El Meniaa": 1150,
  Timimoun: 1200,
  Adrar: 1200,
  "In Salah": 1200,
  Tindouf: 1200,
  Illizi: 1200,
  Tamanrasset: 1200,
  Djanet: 1200,
  "Bordj Badji Mokhtar": 1200,
  "In Guezzam": 1200,
};

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderDetails = {
      customer: {
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        email: String(formData.get("email") || ""),
        address: String(formData.get("address") || ""),
        wilaya: selectedWilaya,
        zipCode: String(formData.get("zipCode") || ""),
      },
      payment: {
        method: paymentMethod,
        cardholderName: String(formData.get("cardholderName") || ""),
        baridimobPhone: String(formData.get("baridimobPhone") || ""),
        transferReference: String(formData.get("transferReference") || ""),
      },
      items: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        lineTotal: item.product.price * item.quantity,
      })),
      subtotal: totalPrice,
      shippingPrice,
      total: totalPrice + shippingPrice,
    };

    const { error } = await supabase.functions.invoke("send-order-email", {
      body: orderDetails,
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: "Order email failed", description: "Please try again or contact us directly.", variant: "destructive" });
      return;
    }

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
