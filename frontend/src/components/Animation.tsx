
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | "fade-in" 
    | "slide-up" 
    | "scale-in" 
    | "slide-up-delayed-1" 
    | "slide-up-delayed-2" 
    | "slide-up-delayed-3";
  threshold?: number;
  delay?: number;
}

/**
 * A component that adds animation to its children when they enter the viewport
 * Provides better accessibility by avoiding animations for users with reduced motion preferences
 */
const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  animation = "fade-in",
  threshold = 0.1,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        prefersReducedMotion 
          ? "opacity-100" 
          : isVisible 
            ? `opacity-100 animate-${animation}` 
            : "opacity-0",
        "transition-opacity"
      )}
      style={prefersReducedMotion ? {} : { animationDelay: `${delay}ms` }}
      aria-hidden={false}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
