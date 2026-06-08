'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Luxo em Cada Spray',
    subtitle: 'Descobra fragrâncias exclusivas de marcas internacionais',
    image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-purple-900/50 to-pink-900/50',
  },
  {
    id: 2,
    title: 'Perfumes Premium',
    subtitle: 'Qualidade garantida em cada fragrância',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-blue-900/50 to-cyan-900/50',
  },
  {
    id: 3,
    title: 'Frete Grátis',
    subtitle: 'Acima de R$ 299 em todo Brasil',
    image: 'https://images.pexels.com/photos/3962287/pexels-photo-3962287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-amber-900/50 to-orange-900/50',
  },
  {
    id: 4,
    title: 'Exclusivos',
    subtitle: 'Fragrâncias raras e edições limitadas',
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-rose-900/50 to-red-900/50',
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />

          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="font-elegant text-4xl md:text-6xl font-light mb-4 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl font-light text-gray-100 mb-8 max-w-2xl">
              {slide.subtitle}
            </p>
            <a
              href="/produtos"
              className="bg-accent hover:bg-primary-600 text-dark font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Explorar Agora
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} strokeWidth={2} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} strokeWidth={2} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-white/50 hover:bg-white/75 w-3'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
        <span className="text-xs text-white font-light">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
