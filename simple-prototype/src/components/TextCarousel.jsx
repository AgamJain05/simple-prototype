import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const TextCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  const textItems = [
    {
      id: 1,
      text: "Ask a Friend",
      subtext: "You can ask a friend to help you with the gym who have been to the gym before."
    },
    {
      id: 2,
      text: "Use Google Tools",
      subtext: "Make sure you take care of the distance and the time you spend in the gym."
    },
    {
      id: 3,
      text: "Enhance user experience",
      subtext: "With responsive and accessible design"
    },
    {
      id: 4,
      text: "Stay ahead of the curve",
      subtext: "With continuous updates and improvements"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === textItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [textItems.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? textItems.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const handleTouchStart = (e) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isTouching) {
      setTouchEnd(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.focus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-xl shadow-lg bg-white"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        role="region"
        aria-label="Text carousel"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {textItems.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 p-8 md:p-12"
              aria-hidden={currentIndex !== index}
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 transition-all duration-300 transform hover:scale-105">
                  {item.text}
                </h2>
                <p className="text-lg md:text-xl text-gray-600">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-gray-800 text-xl" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-gray-800 text-xl" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? (
              <BsPauseFill className="text-gray-800 text-xl" />
            ) : (
              <BsPlayFill className="text-gray-800 text-xl" />
            )}
          </button>
          {textItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                currentIndex === index
                  ? "bg-blue-500 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCarousel;