'use client'

import { useState, useEffect } from 'react'
import { HomepageCarousel } from '@/types'

interface HomeCarouselProps {
  carousel: HomepageCarousel
}

export default function HomeCarousel({ carousel }: HomeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = carousel.metadata.images

  useEffect(() => {
    if (!images || images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="relative h-96 md:h-[500px] bg-neutral-900 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`${image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
            alt={`Slide ${index + 1}`}
            width="2000"
            height="1000"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-center text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Sapori d'Italia
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover authentic Italian recipes and culinary traditions
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}