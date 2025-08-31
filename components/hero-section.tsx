"use client"

import { Button } from "./ui/button"
import { ArrowRight, Coffee } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen -mt-20 pt-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/rustic-coffee-shop-interior-warm-lighting.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/80 via-espresso/60 to-transparent" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-mocha/30 transform rotate-12">
          <Coffee size={24} />
        </div>
        <div className="absolute top-40 right-20 text-mocha/30 transform -rotate-45">
          <Coffee size={32} />
        </div>
        <div className="absolute bottom-32 left-1/4 text-mocha/30 transform rotate-45">
          <Coffee size={28} />
        </div>
        <div className="absolute bottom-20 right-1/3 text-mocha/30 transform -rotate-12">
          <Coffee size={20} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1
              className={`font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-cream leading-none tracking-tight text-balance transition-all duration-1200 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              RUSTIQUE
            </h1>
            <div
              className={`flex items-center justify-center gap-4 transition-all duration-1200 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="h-px bg-mocha flex-1 max-w-24" />
              <Coffee className="text-mocha" size={32} />
              <div className="h-px bg-mocha flex-1 max-w-24" />
            </div>
            <h2
              className={`font-serif text-3xl md:text-5xl lg:text-6xl font-light text-mocha tracking-widest transition-all duration-1200 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              CAFÉ
            </h2>
          </div>

          <p
            className={`text-xl md:text-2xl lg:text-3xl text-cream/90 max-w-3xl mx-auto font-light leading-relaxed text-pretty transition-all duration-1200 ease-out delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Where every cup tells a story of <span className="text-mocha font-medium">artisanal craftsmanship</span> and{" "}
            <span className="text-mocha font-medium">rustic warmth</span>
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 transition-all duration-1200 ease-out delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <Link href="/menu">
              <Button
                size="lg"
                className="group bg-mocha hover:bg-mocha/90 text-cream border-2 border-mocha px-8 py-4 text-lg font-medium tracking-wide"
              >
                EXPLORE MENU
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cream text-cream hover:bg-cream hover:text-espresso px-8 py-4 text-lg font-medium tracking-wide transition-all duration-300 bg-transparent"
              >
                OUR STORY
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
