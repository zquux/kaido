import * as React from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import useMeasure from "react-use-measure";

interface InfiniteSliderProps {
  children: React.ReactNode;
  duration?: number;
  gap?: number;
  reverse?: boolean;
}

export function InfiniteSlider({
  children,
  duration = 20,
  gap = 40,
  reverse = false,
}: InfiniteSliderProps) {
  const [ref, { width }] = useMeasure();
  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (!width) return;
    
    const moveBy = (delta / 1000) * (width / duration);
    const currentX = x.get();
    
    if (reverse) {
      let nextX = currentX + moveBy;
      if (nextX > 0) nextX = -width;
      x.set(nextX);
    } else {
      let nextX = currentX - moveBy;
      if (nextX < -width) nextX = 0;
      x.set(nextX);
    }
  });

  return (
    <div className="overflow-hidden whitespace-nowrap py-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{ x, gap: `${gap}px` }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
