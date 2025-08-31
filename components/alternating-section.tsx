"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface AlternatingSectionProps {
  title: string
  content: string
  subtitle: string
  imageUrl: string
  imagePosition: "left" | "right"
  backgroundColor?: "cream" | "latte" | "espresso" | "mocha"
}

export function AlternatingSection({
  title,
  content,
  subtitle,
  imageUrl,
  imagePosition,
  backgroundColor = "cream",
}: AlternatingSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const bgColorClass = {
    cream: "bg-cream",
    latte: "bg-latte",
    espresso: "bg-espresso",
    mocha: "bg-mocha",
  }[backgroundColor]

  const textColorClass = backgroundColor === "espresso" ? "text-cream" : "text-espresso"
  const subtitleColorClass = backgroundColor === "espresso" ? "text-latte" : "text-charcoal/80"

  return (
    <section ref={sectionRef} className={`py-16 md:py-20 lg:py-24 overflow-hidden ${bgColorClass} relative`}>
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23000000%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%227%22 cy%3D%227%22 r%3D%221%22/%3E%3Ccircle cx%3D%2227%22 cy%3D%227%22 r%3D%221%22/%3E%3Ccircle cx%3D%2247%22 cy%3D%227%22 r%3D%221%22/%3E%3Ccircle cx%3D%227%22 cy%3D%2227%22 r%3D%221%22/%3E%3Ccircle cx%3D%2227%22 cy%3D%2227%22 r%3D%221%22/%3E%3Ccircle cx%3D%2247%22 cy%3D%2227%22 r%3D%221%22/%3E%3Ccircle cx%3D%227%22 cy%3D%2247%22 r%3D%221%22/%3E%3Ccircle cx%3D%2227%22 cy%3D%2247%22 r%3D%221%22/%3E%3Ccircle cx%3D%2247%22 cy%3D%2247%22 r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]}" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div
          className={`flex flex-col ${
            imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20`}
        >
          {/* Text Content */}
          <div className="flex-1 w-full lg:max-w-none">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold ${textColorClass} mb-4 md:mb-6 text-balance leading-tight transition-all duration-800 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {title}
            </h2>

            <p
              className={`text-base md:text-lg lg:text-xl ${textColorClass} mb-4 md:mb-6 leading-relaxed text-pretty transition-all duration-800 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {content}
            </p>

            <p
              className={`text-sm md:text-base ${subtitleColorClass} mb-6 md:mb-8 leading-relaxed text-pretty transition-all duration-800 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {subtitle}
            </p>

            <Link href="/menu">
              <Button
                size="lg"
                className={`bg-mocha hover:bg-mocha/90 text-cream font-medium px-8 py-3 rounded-full transition-all duration-800 ease-out hover:shadow-lg hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                Explore Menu
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1 w-full">
            <div
              className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-1200 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : `opacity-0 ${imagePosition === "left" ? "translate-x-8" : "-translate-x-8"}`
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
