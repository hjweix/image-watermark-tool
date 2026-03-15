"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ElegantButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export function ElegantButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  onClick,
  disabled = false,
  loading = false,
}: ElegantButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-elegant rounded-lg relative overflow-hidden"

  const variants = {
    primary:
      "bg-warm text-white hover:bg-warm-dark hover:shadow-warm-lg active:scale-[0.98]",
    secondary:
      "bg-warm-100 text-warm-dark hover:bg-warm-200 active:scale-[0.98]",
    outline:
      "bg-transparent border-2 border-warm text-warm hover:bg-warm/5 hover:border-warm-dark active:scale-[0.98]",
    ghost:
      "bg-transparent text-charcoal hover:bg-warm-50 hover:text-warm-dark active:scale-[0.98]",
  }

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        loading && "cursor-wait",
        className
      )}
    >
      {/* Shine effect overlay */}
      {variant === "primary" && !disabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer" />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {/* Icon left */}
      {icon && iconPosition === "left" && !loading && (
        <motion.span
          initial={false}
          whileHover={{ x: -2 }}
          className="flex items-center"
        >
          {icon}
        </motion.span>
      )}

      {/* Button text */}
      <span>{children}</span>

      {/* Icon right */}
      {icon && iconPosition === "right" && (
        <motion.span
          initial={false}
          whileHover={{ x: 2 }}
          className="flex items-center"
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  )
}

// Icon button variant
interface IconButtonProps {
  icon: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  tooltip?: string
}

export function IconButton({
  icon,
  className,
  variant = "ghost",
  size = "md",
  onClick,
  disabled = false,
}: IconButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl transition-all duration-200 ease-elegant"

  const variants = {
    primary: "bg-warm text-white hover:bg-warm-dark hover:shadow-warm",
    secondary: "bg-warm-100 text-warm-dark hover:bg-warm-200",
    ghost: "text-charcoal-muted hover:text-charcoal hover:bg-warm-50",
  }

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.15 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </motion.button>
  )
}

// Floating action button
interface FloatingButtonProps {
  icon: ReactNode
  className?: string
  onClick?: () => void
  label?: string
}

export function FloatingButton({
  icon,
  className,
  onClick,
  label,
}: FloatingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 8px 24px rgba(196, 164, 132, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed bottom-8 right-8 w-14 h-14 rounded-full bg-warm text-white shadow-warm-lg flex items-center justify-center z-50",
        className
      )}
      aria-label={label}
    >
      <span className="w-6 h-6">{icon}</span>
    </motion.button>
  )
}
