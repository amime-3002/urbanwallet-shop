import { motion } from "framer-motion";
import { Shield, Gem, Clock, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wallet.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const About = () => (
  <main className="pt-20 md:pt-24 min-h-screen bg-background">
    {/* Hero */}
    <section className="relative h-[50vh] flex items-center bg-primary overflow-hidden">
      <img src={heroImage} alt="UrbanWallet craftsmanship" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">About UrbanWallet</h1>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div {...fadeUp} className="space-y-6 font-body text-muted-foreground leading-relaxed">
          <p>
            Founded in 2020, UrbanWallet was born from a simple belief: your everyday essentials should be extraordinary. 
            We set out to create wallets that marry artisanal craftsmanship with contemporary design — pieces that feel 
            as good in your hands as they look.
          </p>
          <p>
            Our journey began in a small workshop where we experimented with the world's finest leathers, testing and 
            refining until every stitch, fold, and edge met our exacting standards. Today, we work with master artisans 
            who share our passion for perfection.
          </p>
          <p>
            Every UrbanWallet product is crafted from full-grain leather sourced from sustainable tanneries, ensuring 
            exceptional quality while respecting our planet. We believe luxury should be responsible.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 bg-surface-sunken">
      <div className="container mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">What We Stand For</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Our Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Gem, title: "Quality First", desc: "Only the finest full-grain leathers make the cut." },
            { icon: Shield, title: "Security", desc: "Advanced RFID protection in every wallet." },
            { icon: Clock, title: "Durability", desc: "Built to develop character and last a lifetime." },
            { icon: Heart, title: "Sustainability", desc: "Responsibly sourced materials and ethical practices." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <v.icon className="text-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
