import { useEffect, useRef, useState } from 'react'

/**
 * Hook de animação de entrada com IntersectionObserver.
 * Retorna uma ref para o elemento raiz e se ele está visível.
 * Re-dispara quando o elemento sai da viewport (permite re-trigger).
 */
export function useSectionReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
