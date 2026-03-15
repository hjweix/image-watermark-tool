"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  hoverEffect?: "lift" | "glow" | "scale" | "none"
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = "up",
  hoverEffect = "lift",
}: AnimatedCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 }
      case "down":
        return { y: -30, x: 0 }
      case "left":
        return { x: 30, y: 0 }
      case "right":
        return { x: -30, y: 0 }
      case "none":
        return { x: 0, y: 0 }
      default:
        return { y: 30, x: 0 }
    }
  }

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case "lift":
        return { y: -4, boxShadow: "0 12px 32px rgba(26, 26, 26, 0.12)" }
      case "glow":
        return {
          boxShadow: "0 0 30px rgba(196, 164, 132, 0.3)",
          borderColor: "rgba(196, 164, 132, 0.5)",
        }
      case "scale":
        return { scale: 1.02, boxShadow: "0 8px 24px rgba(26, 26, 26, 0.12)" }
      case "none":
        return {}
      default:
        return { y: -4, boxShadow: "0 12px 32px rgba(26, 26, 26, 0.12)" }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...getInitialPosition() }
      }
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={getHoverStyles()}
      className={cn(
        "rounded-2xl border border-warm-200/50 bg-white p-6 shadow-sm transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Staggered container for multiple cards
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated card item for use within StaggerContainer
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px rgba(26, 26, 26, 0.12)",
        transition: { duration: 0.2 },
      }}
      className={cn(
        "rounded-2xl border border-warm-200/50 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Floating card with continuous subtle animation
interface FloatingCardProps {
  children: ReactNode
  className?: string
  floatIntensity?: "low" | "medium" | "high"
}

export function FloatingCard({
  children,
  className,
  floatIntensity = "medium",
}: FloatingCardProps) {
  const amplitude =
    floatIntensity === "low" ? 4 : floatIntensity === "medium" ? 8 : 12

  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        y: 0,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(26, 26, 26, 0.15)",
        transition: { duration: 0.2 },
      }}
      className={cn(
        "rounded-2xl border border-warm-200/50 bg-white p-6 shadow-md",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Glass morphism card
interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 32px rgba(26, 26, 26, 0.08)",
      }}
      className={cn(
        "rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 p-6 shadow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
