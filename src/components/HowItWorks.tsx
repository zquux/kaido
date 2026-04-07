import { useId, useRef } from "react";
import { motion, useScroll } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Leave a Query",
    desc: "Tell us your dates, preferences, and the rare machine you have your eyes on.",
  },
  {
    num: "02",
    title: "Consultation",
    desc: "We discuss the details, availability, and make sure everything aligns flawlessly.",
  },
  {
    num: "03",
    title: "Agreement & Payment",
    desc: "We sign the contract and finalize your payment securely. No hidden fees.",
  },
  {
    num: "04",
    title: "Hit the Road",
    desc: "Get your car the next day and experience the drive of your life.",
  },
];

const PATH_D = `
  M 250,150
  C 250,400 750,200 750,380
  M 750,530
  C 750,700 250,550 250,700
  M 250,850
  C 250,1000 750,900 750,1030
`;

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskId = useId();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 80%"],
  });

  return (
    <section className="py-24 px-6 overflow-hidden relative z-10" id="how-it-works" ref={containerRef}>
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/howitworks.png')",
          backgroundPosition: "left center",
          backgroundSize: "auto 72%",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 uppercase">
            How it works
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
            From inquiry to ignition in four easy steps.
          </p>
        </div>

        <div className="relative w-full max-w-[1000px] h-[1050px] mx-auto hidden lg:block mt-20">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1050">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1050">
                <rect x="0" y="0" width="1000" height="1050" fill="black" />
                <motion.path
                  d={PATH_D}
                  fill="none"
                  stroke="white"
                  strokeWidth="30"
                  strokeLinecap="round"
                  style={{ pathLength: scrollYProgress }}
                />
              </mask>
            </defs>

            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="5"
              strokeDasharray="0 20"
              strokeLinecap="round"
              mask={`url(#${maskId})`}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute w-[400px] p-8 rounded-3xl bg-white/5 glass-border backdrop-blur-xl z-10"
            style={{ top: "0px", left: "50px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-iridescent mb-6 flex items-center justify-center font-black text-2xl text-[#1C1B24] shadow-[0_0_20px_rgba(201,103,232,0.3)]">
              {steps[0].num}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{steps[0].title}</h3>
            <p className="text-white/60 leading-relaxed font-medium">{steps[0].desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute w-[400px] p-8 rounded-3xl bg-white/5 glass-border backdrop-blur-xl z-10"
            style={{ top: "270px", left: "550px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-iridescent mb-6 flex items-center justify-center font-black text-2xl text-[#1C1B24] shadow-[0_0_20px_rgba(201,103,232,0.3)]">
              {steps[1].num}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{steps[1].title}</h3>
            <p className="text-white/60 leading-relaxed font-medium">{steps[1].desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute w-[400px] p-8 rounded-3xl bg-white/5 glass-border backdrop-blur-xl z-10"
            style={{ top: "590px", left: "50px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-iridescent mb-6 flex items-center justify-center font-black text-2xl text-[#1C1B24] shadow-[0_0_20px_rgba(201,103,232,0.3)]">
              {steps[2].num}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{steps[2].title}</h3>
            <p className="text-white/60 leading-relaxed font-medium">{steps[2].desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="absolute w-[400px] p-8 rounded-3xl bg-white/5 glass-border backdrop-blur-xl z-10"
            style={{ top: "850px", left: "550px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-iridescent mb-6 flex items-center justify-center font-black text-2xl text-[#1C1B24] shadow-[0_0_20px_rgba(201,103,232,0.3)]">
              {steps[3].num}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white tracking-wide">{steps[3].title}</h3>
            <p className="text-white/60 leading-relaxed font-medium">{steps[3].desc}</p>
          </motion.div>
        </div>

        <div className="lg:hidden space-y-8 relative">
          <div className="absolute left-10 top-0 bottom-0 w-px bg-white/10" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative p-8 rounded-3xl bg-white/5 glass-border backdrop-blur-md ml-4 z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-iridescent mb-5 flex items-center justify-center font-black text-xl text-[#1C1B24] shadow-[0_0_20px_rgba(201,103,232,0.3)]">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-white/60 font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
