"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If already triggered and triggerOnce is true, don't observe again
    if (triggerOnce && hasTriggered) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (triggerOnce) {
              setHasTriggered(true)
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsInView(false)
          }
        })
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered])

  return { ref, isInView }
}

// Hook for animating elements on scroll with stagger
interface UseScrollAnimationOptions {
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function useScrollAnimation({
  delay = 0,
  duration = 0.6,
  direction = "up",
}: UseScrollAnimationOptions = {}) {
  const { ref, isInView } = useIntersectionObserver({ triggerOnce: true })

  const getInitialTransform = useCallback(() => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0, opacity: 0 }
      case "down":
        return { y: -30, x: 0, opacity: 0 }
      case "left":
        return { x: 30, y: 0, opacity: 0 }
      case "right":
        return { x: -30, y: 0, opacity: 0 }
      default:
        return { y: 30, x: 0, opacity: 0 }
    }
  }, [direction])

  const getFinalTransform = () => ({
    x: 0,
    y: 0,
    opacity: 1,
  })

  return {
    ref,
    isInView,
    style: {
      transform: isInView
        ? `translate3d(0, 0, 0)`
        : `translate3d(${getInitialTransform().x}px, ${getInitialTransform().y}px, 0)`,
      opacity: isInView ? 1 : 0,
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
    },
  }
}

// Hook for parallax effect
interface UseParallaxOptions {
  speed?: number
  direction?: "up" | "down"
}

export function useParallax({ speed = 0.5, direction = "up" }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed

      setOffset(direction === "up" ? -rate : rate)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return { ref, offset }
}

// Hook for scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(Math.max(scrollProgress, 0), 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}

// Hook for header scroll state
export function useHeaderScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return isScrolled
}

// Stagger animation hook for lists
interface UseStaggerAnimationOptions {
  itemCount: number
  baseDelay?: number
  staggerDelay?: number
}

export function useStaggerAnimation({
  itemCount,
  baseDelay = 0,
  staggerDelay = 0.05,
}: UseStaggerAnimationOptions) {
  const { ref, isInView } = useIntersectionObserver({ triggerOnce: true })

  const getItemStyle = (index: number) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${baseDelay + index * staggerDelay}s`,
  })

  return { ref, isInView, getItemStyle }
}
