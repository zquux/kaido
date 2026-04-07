import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-50 bg-transparent py-8"
      >
        <div className="flex items-center justify-between w-full px-6 md:px-12 lg:px-24">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer relative z-[60]">
            <img 
              src="/download (1).png" 
              alt="Kaido Rentals Logo" 
              className="w-24 h-24 object-contain group-hover:scale-110 transition-transform" 
            />
            <span className="text-xl font-bold tracking-tight text-white">Kaido Rentals</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-8 pointer-events-auto">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[60] flex items-center justify-center text-white"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white uppercase tracking-widest hover:text-primary-gradient-from transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
