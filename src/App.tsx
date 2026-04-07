import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoCloud } from "./components/LogoCloud";
import { AboutUs } from "./components/AboutUs";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { ContactUs } from "./components/ContactUs";

export default function App() {
  return (
    <main className="min-h-screen bg-background selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <LogoCloud />

      <HowItWorks />

      <AboutUs />

      <Pricing />

      <ContactUs />

      <footer className="border-t border-white/10 bg-black/50 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <h3 className="flex items-center gap-3 text-lg font-bold text-white">
              <img src="/download (1).png" alt="Kaido Rentals Logo" className="h-8 w-8 object-contain" />
              <span>Kaido Rentals</span>
            </h3>
            <p className="mt-3 text-sm text-white/50">
              Premium Japanese car rental experiences for creators, events, and collectors.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/70 uppercase">Quick Links</h4>
            <div className="mt-3 flex flex-col gap-2">
              <a href="#how-it-works" className="text-sm text-white/55 transition-colors hover:text-white">
                How It Works
              </a>
              <a href="#about" className="text-sm text-white/55 transition-colors hover:text-white">
                About Us
              </a>
              <a href="#pricing" className="text-sm text-white/55 transition-colors hover:text-white">
                Pricing
              </a>
              <a href="#contact" className="text-sm text-white/55 transition-colors hover:text-white">
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/70 uppercase">Contact</h4>
            <div className="mt-3 flex flex-col gap-2">
              <a href="tel:+353871234567" className="text-sm text-white/55 transition-colors hover:text-white">
                +353 87 123 4567
              </a>
              <a href="mailto:kaidorentals@gmail.com" className="text-sm text-white/55 transition-colors hover:text-white">
                kaidorentals@gmail.com
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-white/25">
          © 2026 Kaido Rentals. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

