"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/utils"; // Tailwind class merging utility

export interface ScrollRevealProps {
  children: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  staggerDelay?: number;
  threshold?: number;
  duration?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "left" | "center" | "right";
  variant?: "default" | "muted" | "accent" | "primary";
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
};

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = false,
  baseOpacity = 0.1,
  baseRotation = 5,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = {
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  size = "lg",
  align = "left",
  variant = "default",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    amount: threshold,
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [baseRotation, 0, 0],
  );

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text
      .split(/(\s+)/)
      .map((part, index) => ({
        value: part,
        isSpace: /^\s+$/.test(part),
        originalIndex: index,
      }))
      .filter((item) => item.value.length > 0);
  }, [children]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        ...springConfig,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate: rotation }}
      className={cn("my-5 transform-gpu", containerClassName)}
    >
      <motion.p
        className={cn(
          "leading-relaxed font-semibold tracking-normal whitespace-normal",
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          textClassName,
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {splitText.map((item) =>
          item.isSpace ? (
            item.value // ✅ fixed: render space as raw text
          ) : (
            <motion.span
              key={`word-${item.originalIndex}`}
              className="inline"
              variants={wordVariants}
            >
              {item.value}
            </motion.span>
          ),
        )}
      </motion.p>
    </motion.div>
  );
}

export default ScrollReveal;
