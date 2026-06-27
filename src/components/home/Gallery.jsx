import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import all images matching the pattern
const imageModules = import.meta.glob('../../assets/0*.png', { eager: true });
const images = Object.entries(imageModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/\/0(\d+)\.png$/)?.[1] || 0);
    const numB = parseInt(pathB.match(/\/0(\d+)\.png$/)?.[1] || 0);
    return numA - numB;
  })
  .map(([_, module]) => module.default);

export const Gallery = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  
  // Refs for scrolling thumbnails
  const thumbContainerRef = useRef(null);

  const paginate = useCallback((newDirection) => {
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = images.length - 1;
      if (next >= images.length) next = 0;
      return next;
    });
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        paginate(1);
      }, 5000);
    }
  }, [isPaused, paginate]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);
  
  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbContainerRef.current) {
      const activeThumb = thumbContainerRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  const handleManualPaginate = (dir) => {
    paginate(dir);
    resetTimer();
  };

  const handleThumbClick = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 w-full max-w-7xl mx-auto bg-transparent">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: Text & Thumbnails */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-10">
            <p className="text-[12px] tracking-[3px] opacity-80 uppercase mb-3 font-sans text-primary">
              {t('gallery.label', 'BEHIND THE SCENES')}
            </p>
            <h2 className="text-[36px] md:text-[48px] font-heading leading-[1.1] mb-5 text-primary">
              {t('gallery.title', 'Our Workspace')}
            </h2>
            <p className="text-[15px] opacity-80 leading-[1.6] mb-8 font-sans text-primary">
              {t('gallery.subtitle', 'Take an exclusive look into our premium ghee production and workspace, where tradition meets modern quality.')}
            </p>
          </div>

          {/* Thumbnails */}
          <div className="w-full relative">
            <div 
              ref={thumbContainerRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((imgSrc, index) => {
                const isActive = index === currentIndex;
                return (
                  <div 
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={`relative flex-none w-[70px] h-[50px] md:w-[85px] md:h-[60px] rounded-[6px] overflow-hidden cursor-pointer snap-center transition-all duration-300 ease-in-out ${
                      isActive ? 'opacity-100 scale-110 ring-2 ring-primary ring-offset-2' : 'opacity-50 scale-95 hover:opacity-80'
                    }`}
                  >
                    <img src={imgSrc} className="w-full h-full object-cover" draggable="false" alt={`Thumb ${index + 1}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Main Image Slider */}
        <div 
          className="w-full lg:w-7/12 relative h-[350px] sm:h-[450px] md:h-[600px] flex items-center justify-center order-1 lg:order-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {images.map((imgSrc, index) => {
            const isActive = index === currentIndex;
            return (
              <img 
                key={index}
                src={imgSrc} 
                alt={`Workspace view ${index + 1}`}
                className={`absolute max-w-full max-h-full object-contain rounded-[24px] transition-opacity duration-800 ease-in-out shadow-xl ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                draggable="false"
              />
            );
          })}

          {/* PREV/NEXT ARROWS */}
          <button
            onClick={() => handleManualPaginate(-1)}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white/90 hover:bg-white backdrop-blur shadow-lg text-primary transition-all duration-300 hover:scale-110"
          >
            <FiChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          <button
            onClick={() => handleManualPaginate(1)}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white/90 hover:bg-white backdrop-blur shadow-lg text-primary transition-all duration-300 hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
