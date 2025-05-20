import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Unleash Your Gaming Potential',
    subtitle: 'Pre-built gaming PCs designed for performance and style',
    cta: 'Shop Now',
    link: '/shop'
  },
  {
    image: 'https://images.pexels.com/photos/3342740/pexels-photo-3342740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Next-Gen Performance',
    subtitle: 'Experience the future of gaming with our elite PC range',
    cta: 'Explore Elite Series',
    link: '/shop?category=high-end'
  },
  {
    image: 'https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Built for Champions',
    subtitle: 'Dominate your competition with professional-grade hardware',
    cta: 'View Pro Series',
    link: '/shop?category=extreme'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrent(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    const nextIndex = (current + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  };

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(goToNext, 7000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative h-screen">
      {/* Slides */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 
                  className="text-4xl md:text-6xl font-bold text-white mb-4 opacity-0 animate-fadeUp"
                  style={{ 
                    animationDelay: '0.3s', 
                    animationFillMode: 'forwards',
                    animationDuration: '0.8s'
                  }}
                >
                  {slide.title}
                </h1>
                <p 
                  className="text-xl md:text-2xl text-gray-200 mb-8 opacity-0 animate-fadeUp"
                  style={{ 
                    animationDelay: '0.5s', 
                    animationFillMode: 'forwards',
                    animationDuration: '0.8s'
                  }}
                >
                  {slide.subtitle}
                </p>
                <div 
                  className="opacity-0 animate-fadeUp"
                  style={{ 
                    animationDelay: '0.7s', 
                    animationFillMode: 'forwards',
                    animationDuration: '0.8s'
                  }}
                >
                  <Link to={slide.link}>
                    <Button size="lg" variant="primary" className="group">
                      {slide.cta}
                      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current 
                ? 'bg-blue-500 w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;