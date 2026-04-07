import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const totalFrames = 76;

const aboutSections = [
  {
    title: "Who We Are",
    content:
      "We are a focused team of designers, strategists, and engineers building premium digital experiences for bold brands.",
  },
  {
    title: "Our Mission",
    content:
      "We turn ambitious ideas into measurable outcomes by combining strong storytelling, clean execution, and performance-first delivery.",
  },
  {
    title: "How We Work",
    content:
      "Every engagement is collaborative and transparent: discovery, concept, production, optimization, and long-term iteration.",
  },
  {
    title: "Why Clients Choose Us",
    content:
      "Clients trust us for high standards, consistent quality, and the ability to deliver refined work without sacrificing speed.",
  },
  {
    title: "What We Deliver",
    content:
      "From brand systems and websites to campaigns and content pipelines, we build assets that look exceptional and perform reliably.",
  },
];

export function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [openSection, setOpenSection] = useState<number>(-1);
  const [currentFrame, setCurrentFrame] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (imagesRef.current.length > 0) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const indexStr = String(i).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${indexStr}.png`;
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalFrames) {
          drawFrame(1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    const handleResize = () => {
      if (imagesRef.current.length === totalFrames) {
        const progress = scrollYProgress.get();
        const frame = Math.max(1, Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1));
        drawFrame(frame);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawFrame = (frameIndex: number) => {
    if (imagesRef.current.length < totalFrames) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const img = imagesRef.current[frameIndex - 1];
    if (!img) return;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (imagesLoaded !== totalFrames) return;
    const frameProgress = latest;
    const frame = Math.max(1, Math.min(totalFrames, Math.round(frameProgress * (totalFrames - 1)) + 1));
    setCurrentFrame(frame);
    drawFrame(frame);
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.04, 0.06, 1], [0, 0, 1, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.09, 1], [0, 0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0.03, 0.09], [30, 0]);

  // Frame based reveal: 1->12, 2->24, 3->36, 4->48, 5->60
  const revealedSections = Math.max(0, Math.min(aboutSections.length, Math.floor(currentFrame / 12)));

  return (
    <section ref={containerRef} className="relative h-[700vh] bg-black" id="about">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

        <div className="absolute top-0 left-0 z-[5] h-64 w-full bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pointer-events-none">
          <motion.div
            style={{ opacity: bgOpacity }}
            className="max-w-3xl w-full rounded-xl border border-white/10 bg-black/20 p-8 text-left backdrop-blur-md pointer-events-auto md:-translate-x-[220px]"
          >
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY, fontFamily: '"Bebas Neue", sans-serif' }}
              className="mb-4 w-full text-center text-xl font-normal tracking-[0.06em] text-white uppercase md:text-3xl"
            >
              ABOUT US
            </motion.h2>

            <div className="mt-2 space-y-3 pt-4 text-left">
              {aboutSections.map((section, idx) => {
                const isRevealed = idx < revealedSections;
                const isOpen = openSection === idx;

                return (
                  <motion.div
                    key={section.title}
                    initial={false}
                    animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden rounded-lg border border-white/15 bg-black/40"
                  >
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
                        isRevealed ? "cursor-pointer hover:bg-white/5" : "cursor-default"
                      }`}
                      onClick={() => {
                        if (!isRevealed) return;
                        setOpenSection(isOpen ? -1 : idx);
                      }}
                      disabled={!isRevealed}
                    >
                      <span className="text-base font-semibold text-white md:text-lg">{section.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="select-none text-2xl leading-none font-light text-white/60"
                      >
                        +
                      </motion.span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={isOpen ? "open" : "closed"}
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        closed: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-5 pt-1 pb-5 text-sm leading-relaxed text-white/70 md:text-base">
                        {section.content}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {imagesLoaded < totalFrames && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black transition-opacity duration-500">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
              <div className="text-sm font-medium tracking-widest text-white/50 uppercase">
                Loading sequence... {Math.round((imagesLoaded / totalFrames) * 100)}%
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
