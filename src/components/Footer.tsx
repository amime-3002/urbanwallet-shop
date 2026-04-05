import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold mb-4">
            URBAN<span className="text-gold">WALLET</span>
          </h3>
          <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
            Premium wallets crafted for those who carry style and confidence everywhere they go.
          </p>
        </div>
        <div>
          <h4 className="font-body text-sm tracking-widest uppercase mb-4 text-gold">Shop</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
            <li><Link to="/shop?category=men" className="hover:text-gold transition-colors">Men</Link></li>
            <li><Link to="/shop?category=women" className="hover:text-gold transition-colors">Women</Link></li>
            <li><Link to="/shop?category=minimalist" className="hover:text-gold transition-colors">Minimalist</Link></li>
            <li><Link to="/shop?category=leather" className="hover:text-gold transition-colors">Leather</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-sm tracking-widest uppercase mb-4 text-gold">Company</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-sm tracking-widest uppercase mb-4 text-gold">Support</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/70">
            <li className="hover:text-gold transition-colors cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-gold transition-colors cursor-pointer">FAQ</li>
            <li className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
        <p className="font-body text-xs text-primary-foreground/50">
          © 2026 UrbanWallet. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
