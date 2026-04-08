import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Get in Touch</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">Contact Us</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-display text-xl font-semibold mb-6">We'd Love to Hear From You</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              Whether you have a question about our products, need assistance with an order, 
              or simply want to say hello — we're here to help.
            </p>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "hello@urbanwallet.com" },
                { icon: Phone, label: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Boumerdes, Algeria" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <item.icon className="text-gold" size={18} />
                  </div>
                  <span className="font-body text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Your Name" required className="bg-surface-sunken border-border font-body" />
              <Input type="email" placeholder="Email" required className="bg-surface-sunken border-border font-body" />
            </div>
            <Input placeholder="Subject" required className="bg-surface-sunken border-border font-body" />
            <Textarea placeholder="Your Message" required rows={6} className="bg-surface-sunken border-border font-body resize-none" />
            <Button
              type="submit"
              disabled={sending}
              className="bg-gold hover:bg-gold-dark text-accent-foreground font-body tracking-wider px-8 py-6"
            >
              <Send className="mr-2" size={16} />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
