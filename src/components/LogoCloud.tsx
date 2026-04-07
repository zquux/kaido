import * as React from "react";
import { InfiniteSlider } from "./ui/infinite-slider";

const LOGOS = [
  { name: "Mazda", url: "/powering/133-1336937_mazda-logo-png-file-mazda-logo-black-and.png" },
  { name: "D1 Grand Prix", url: "/powering/D1_Grand_Prix_logo.png" },
  { name: "Formula Drift", url: "/powering/Formula_Drift_logo.svg.png" },
  { name: "Honda", url: "/powering/Honda-Logo-2000.png" },
  { name: "Toyota", url: "/powering/Toyota-logo-black-png-medium-size.png" },
  { name: "Nissan", url: "/powering/nissan-logo-black-registered.webp" },
];

export function LogoCloud() {
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-shrink-0 flex items-center gap-4">
          <p className="text-sm font-medium text-white/40 uppercase tracking-widest whitespace-nowrap">
            Powering the best teams
          </p>
          <div className="hidden md:block w-px h-8 bg-white/10" />
        </div>
        
        <div className="flex-grow w-full overflow-hidden">
          <InfiniteSlider duration={30} gap={80}>
            {LOGOS.map((logo) => (
              <img
                key={logo.name}
                src={logo.url}
                alt={logo.name}
                className="h-8 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </div>
  );
}
