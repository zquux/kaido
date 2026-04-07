import type React from "react";
import { type MouseEvent, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const plans = [
  {
    name: "Starter",
    price: "$299",
    cadence: "/day",
    description: "Best for quick city drives and short premium experiences.",
    features: ["Insurance included", "24/7 support", "Flexible pickup"],
  },
  {
    name: "Signature",
    price: "$799",
    cadence: "/weekend",
    description: "Our most popular package for events, shoots, and escapes.",
    features: ["Priority vehicle selection", "Concierge handover", "Mileage buffer included"],
  },
  {
    name: "Business Enquiries",
    price: "Available",
    cadence: "after consultation",
    description: "Built for extended stays with top-tier support and access.",
    features: [
      "For businesses or studios",
      "For bookings of more than 2 cars",
      "For rentals longer than 1 week",
    ],
  },
];

export function Pricing() {
  return (
    <section className="relative z-10 px-6 py-24" id="pricing">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white uppercase md:text-5xl lg:text-6xl">
            Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-white/55">
            Transparent packages built around how you drive, shoot, and show up.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <PricingCard key={plan.name} plan={plan} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  idx,
}: {
  key?: React.Key;
  plan: (typeof plans)[number];
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 22 });
  const smoothTranslateX = useSpring(translateX, { stiffness: 260, damping: 22 });
  const smoothTranslateY = useSpring(translateY, { stiffness: 260, damping: 22 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const tiltStrength = 10;
    const driftStrength = 6;

    rotateY.set((px - 0.5) * tiltStrength * 2);
    rotateX.set((0.5 - py) * tiltStrength * 2);
    translateX.set((px - 0.5) * driftStrength * 2);
    translateY.set((py - 0.5) * driftStrength * 2);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  const isSignaturePlan = plan.price === "$799";

  return (
    <div
      className="relative"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothTranslateX,
          y: smoothTranslateY,
          transformStyle: "preserve-3d",
        }}
        className="rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl will-change-transform"
      >
        <p className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">{plan.name}</p>
        <div className="mt-5 flex items-end gap-2">
          {isSignaturePlan ? (
            <span className="text-iridescent-cool text-4xl font-black tracking-tight md:text-5xl">
              {plan.price}
            </span>
          ) : (
            <span className="text-4xl font-black tracking-tight text-white md:text-5xl">{plan.price}</span>
          )}
          <span className="pb-1 text-sm font-medium text-white/50">{plan.cadence}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{plan.description}</p>
        <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
          {plan.features.map((feature) => (
            <p key={feature} className="text-sm text-white/75">
              {feature}
            </p>
          ))}
        </div>
        <a
          href="#contact"
          className="mt-7 block w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
        >
          Choose Plan
        </a>
      </motion.div>
    </div>
  );
}
