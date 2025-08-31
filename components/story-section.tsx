"use client"

import { useEffect, useRef, useState } from "react"

interface StoryCardProps {
  image: string
  caption: string
  story: string
  index: number
}

function StoryCard({ image, caption, story, index }: StoryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl group">
        <img
          src={image || "/placeholder.svg"}
          alt={caption}
          className="w-full h-80 object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            className={`text-xl font-bold text-white mb-2 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {caption}
          </h3>
          <p
            className={`text-gray-200 text-sm leading-relaxed transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {story}
          </p>
        </div>
      </div>
    </div>
  )
}

const storyData = [
  {
    image: "/vintage-coffee-roasting-equipment-in-rustic-setting.jpg",
    caption: "The Beginning",
    story:
      "Founded in 2018 with a simple dream: to bring exceptional coffee to our community. What started as a small roastery has grown into a beloved gathering place.",
  },
  {
    image: "/coffee-farmers-working-in-mountain-plantation.jpg",
    caption: "Our Partners",
    story:
      "We work directly with coffee farmers around the world, ensuring fair trade practices and sustainable growing methods that benefit both the environment and communities.",
  },
  {
    image: "/barista-training-and-coffee-cupping-session.jpg",
    caption: "Craftsmanship",
    story:
      "Our baristas undergo extensive training in coffee preparation, from understanding bean origins to perfecting extraction techniques. Every cup is crafted with precision and passion.",
  },
  {
    image: "/cozy-coffee-shop-interior-with-people.jpg",
    caption: "Community Hub",
    story:
      "More than just a coffee shop, we've become a cornerstone of the community. From morning regulars to evening study groups, we're proud to be part of your daily story.",
  },
  {
    image: "/sustainable-coffee-packaging-and-eco-friendly-prac.jpg",
    caption: "Sustainability",
    story:
      "Environmental responsibility is at our core. From compostable cups to solar-powered roasting, we're committed to reducing our footprint while delivering exceptional coffee.",
  },
  {
    image: "/future-vision-of-modern-coffee-shop-expansion.jpg",
    caption: "Looking Forward",
    story:
      "As we grow, our commitment remains unchanged: exceptional coffee, genuine community connection, and sustainable practices that honor both our craft and our planet.",
  },
]

export function StorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {storyData.map((item, index) => (
        <StoryCard key={index} image={item.image} caption={item.caption} story={item.story} index={index} />
      ))}
    </div>
  )
}
