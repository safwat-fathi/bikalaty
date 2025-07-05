"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// --- Types ---
interface SlideData {
  id: number | string;
  imageUrl: string; // Use appropriate image URLs for your store
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string; // Link for the call-to-action button
  altText: string; // Alt text for the image
}

interface HeroSliderProps {
  slides: SlideData[];
  autoplayInterval?: number;
}

const HeroSlider = ({ slides, autoplayInterval = 5000 }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentTranslate, setCurrentTranslate] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true); // Manage transition state

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for autoplay timeout
  const dragThreshold = useRef<number>(50); // Min drag distance in pixels to trigger slide change

  // --- Navigation Logic ---
  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setIsTransitioning(true); // Ensure transition is enabled for programmatic changes
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    setIsTransitioning(true);
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    setIsTransitioning(true);
  }, [slides.length]);

  // --- Autoplay Logic ---
  const resetAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    if (autoplayInterval > 0 && slides.length > 1) {
      autoplayTimeoutRef.current = setTimeout(() => {
        goToNext();
      }, autoplayInterval);
    }
  }, [goToNext, autoplayInterval, slides.length]);

  useEffect(() => {
    resetAutoplay(); // Start autoplay on mount or when dependencies change

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [currentIndex, resetAutoplay]); // Reset timer when index changes or resetAutoplay changes

  // --- Drag/Swipe Logic ---
  const getPositionX = (event: React.MouseEvent | React.TouchEvent): number => {
    return "touches" in event ? event.touches[0].clientX : event.clientX;
  };

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (slides.length <= 1) return; // Don't drag if only one slide
    // Prevent image dragging behavior in some browsers
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current); // Pause autoplay
    setStartX(getPositionX(event));
    setIsDragging(true);
    setIsTransitioning(false); // Disable transition for immediate drag feedback
    // Calculate current translate based on index and width BEFORE drag starts
    const initialTranslate = -currentIndex * sliderWidth;
    setCurrentTranslate(initialTranslate);
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || slides.length <= 1) return;
    const currentPositionX = getPositionX(event);
    const moveX = currentPositionX - startX;
    // Update translate based on the initial position + drag distance
    setCurrentTranslate(-currentIndex * sliderWidth + moveX);
  };

  const handleDragEnd = () => {
    if (!isDragging || slides.length <= 1) return;

    setIsDragging(false);
    setIsTransitioning(true); // Re-enable transitions

    const movedBy = currentTranslate - -currentIndex * sliderWidth;

    // Determine if slide should change based on threshold
    if (movedBy < -dragThreshold.current && currentIndex < slides.length - 1) {
      goToNext();
    } else if (movedBy > dragThreshold.current && currentIndex > 0) {
      goToPrevious();
    } else {
      // Snap back to the current slide if threshold not met
      setCurrentTranslate(-currentIndex * sliderWidth); // Force visual snap back via style
    }

    resetAutoplay(); // Restart autoplay after interaction
  };

  // --- Slider Width Calculation ---
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    const updateWidth = () => {
      setSliderWidth(sliderElement.offsetWidth);
      dragThreshold.current = sliderElement.offsetWidth * 0.15; // Threshold is 15% of width
    };

    updateWidth(); // Initial width

    // Update width on resize
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(sliderElement);

    // Cleanup observer
    return () => resizeObserver.disconnect();
  }, []); // Run only on mount

  // Calculate the final translate value for the style prop
  const getTranslateX = () => {
    if (isDragging) {
      return currentTranslate; // Use pixel value during drag
    }
    // Use percentage for snapping and normal state
    // Need to use sliderWidth here because percentage doesn't work reliably
    // with the immediate pixel updates during drag end snapping.
    return -currentIndex * sliderWidth;
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center bg-gray-200 text-gray-500">No slides available.</div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className={clsx(`relative h-[60vh] w-full touch-pan-y overflow-hidden select-none md:h-[70vh] lg:h-[80vh]`, {
        "cursor-grabbing": isDragging,
      })} // Allow vertical scroll, disable text select
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={isDragging ? handleDragMove : undefined} // Only attach move/end when dragging
      onTouchMove={isDragging ? handleDragMove : undefined}
      onMouseUp={handleDragEnd}
      onMouseLeave={isDragging ? handleDragEnd : resetAutoplay} // End drag if mouse leaves container
      onTouchEnd={handleDragEnd}
      onMouseEnter={() => {
        if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      }} // Optional: Pause on hover
    >
      {/* Slides Container */}
      <div
        className="flex h-full bg-gray-100"
        style={{
          transform: `translateX(${getTranslateX()}px)`, // Use pixel based translate
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none", // Conditional transition
          width: `${slides.length * 100}%`, // Ensure container is wide enough
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative container mx-auto flex h-full flex-shrink-0 items-center justify-between"
            style={{ width: `${100 / slides.length}%` }} // Each slide takes up fraction of total width
          >
            {/* Text Overlay */}
            <div className="flex flex-col items-start justify-center">
              <h2 className={`mb-4 max-w-[80%] text-3xl font-bold md:text-5xl lg:text-6xl`}>{slide.title}</h2>
              <p className={`mb-6 max-w-md text-lg md:text-xl`}>{slide.description}</p>
              <a
                href={slide.ctaLink}
                className="bg-primary hover:bg-primary/90 rounded-md px-6 py-2 text-lg font-semibold text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                draggable="false" // Prevent dragging the link itself
                onClick={(e) => {
                  if (isDragging) e.preventDefault();
                }} // Prevent click during/after drag
              >
                {slide.ctaText}
              </a>
            </div>

            <div className="relative h-2/3 w-1/3 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-2xl">
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                className="pointer-events-none h-full w-full object-cover"
                draggable={false} // Disable image dragging
                onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                onDragStart={(e) => e.preventDefault()} // Prevent default drag behavior
                onLoad={() => setIsTransitioning(true)} // Ensure transition is enabled after image loads
                width={100}
                height={100}
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-3">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:outline-none ${
                currentIndex === slideIndex
                  ? "bg-primary ring-primary" // Active dot style
                  : "bg-primary/40 hover:bg-primary/70 ring-transparent" // Inactive dot style
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={currentIndex === slideIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
