"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { ReactNode, useRef, useState, useEffect, useCallback } from "react";

// ============================================================================
// 1. SCROLL PROGRESS BAR (GPU-accelerated transform)
// ============================================================================
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 z-50 pointer-events-none will-change-transform"
    />
  );
}

// ============================================================================
// 2. MAGNETIC ELEMENT (Spring physics cursor attraction)
// ============================================================================
export function Magnetic({ 
  children, 
  className = "", 
  intensity = 0.25 
}: { 
  children: ReactNode; 
  className?: string; 
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * intensity);
    y.set((clientY - (top + height / 2)) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export const MagneticButton = Magnetic;

// ============================================================================
// 3. SPOTLIGHT CARD (Pure CSS Variables - ZERO React re-renders on mousemove!)
// ============================================================================
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.12)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.opacity = "1";
    glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 45%)`;
  }, [spotlightColor]);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 transition-shadow duration-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300/80 ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-200 ease-out"
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// ============================================================================
// 4. 3D TILT CARD (Perspective tilt with direct spring values)
// ============================================================================
export function TiltCard({
  children,
  className = "",
  maxAngle = 6,
}: {
  children: ReactNode;
  className?: string;
  maxAngle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxAngle, -maxAngle]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxAngle, maxAngle]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
        className={`h-full will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 5. BORDER BEAM (Linear/Motion.dev glowing perimeter circuit)
// ============================================================================
export function BorderBeam({
  duration = 8,
  size = 200,
  className = "",
}: {
  duration?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] [mask-image:linear-gradient(white,white)] ${className}`}
    >
      <motion.div
        className="absolute aspect-square bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.6),rgba(59,130,246,0.3),transparent_70%)]"
        style={{
          width: size,
          height: size,
          offsetPath: `rect(0 auto auto 0 round inherit)`,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// ============================================================================
// 6. WORD REVEAL (Kinetic typography with blur & stagger)
// ============================================================================
export function WordReveal({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={`inline-flex flex-wrap gap-[0.25em] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================================================
// 7. PARALLAX HERO (Hardware accelerated transform)
// ============================================================================
export function ParallaxHero({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.6]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity }} 
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 8. FLOAT CONTINUOUS (Harmonic floating elements)
// ============================================================================
export function FloatContinuous({ 
  children, 
  className = "", 
  delay = 0,
  duration = 5,
  yOffset = 8,
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  duration?: number;
  yOffset?: number;
  rotateOffset?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 9. ANIMATED COUNTER (Spring physics number roll-up on scroll)
// ============================================================================
export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// ============================================================================
// 10. KINETIC MARQUEE (GPU-accelerated smooth ticker)
// ============================================================================
export function KineticMarquee({
  children,
  speed = 35,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}>
      <motion.div
        className="flex shrink-0 items-center gap-6 will-change-transform"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
