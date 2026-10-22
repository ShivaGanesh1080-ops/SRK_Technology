"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

// ============================================================================
// 1. SCROLL PROGRESS BAR (Motion.dev top scroll depth indicator)
// ============================================================================
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 origin-left z-50 pointer-events-none shadow-sm shadow-indigo-500/40"
    />
  );
}

// ============================================================================
// 2. MAGNETIC ELEMENT (Spring physics cursor attraction)
// ============================================================================
export function Magnetic({ 
  children, 
  className = "", 
  intensity = 0.35 
}: { 
  children: ReactNode; 
  className?: string; 
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * intensity);
    y.set((clientY - centerY) * intensity);
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
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export const MagneticButton = Magnetic;

// ============================================================================
// 3. SPOTLIGHT CARD (Light theme mouse-following illumination)
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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-400/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// ============================================================================
// 4. 3D TILT CARD (Perspective tilt with specular shine)
// ============================================================================
export function TiltCard({
  children,
  className = "",
  maxAngle = 8,
}: {
  children: ReactNode;
  className?: string;
  maxAngle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxAngle, -maxAngle]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxAngle, maxAngle]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className={`h-full ${className}`}
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
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={`inline-flex flex-wrap gap-[0.25em] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 25, filter: "blur(8px)", rotate: 4 },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)", 
              rotate: 0, 
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
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
// 7. PARALLAX HERO (Multi-layer scroll depth)
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
  const y = useTransform(scrollY, [0, 800], [0, 220]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.96]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
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
  duration = 4,
  yOffset = 10,
  rotateOffset = 3
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
        rotate: [-rotateOffset, rotateOffset, -rotateOffset]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
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
  duration = 2,
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
// 10. KINETIC MARQUEE (Infinite smooth GPU ticker with gradient masks)
// ============================================================================
export function KineticMarquee({
  children,
  speed = 30,
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
        className="flex shrink-0 items-center gap-6"
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
