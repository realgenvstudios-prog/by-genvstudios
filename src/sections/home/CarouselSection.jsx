import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const CarouselContainer = styled.section`
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-color: #000;
  color: #fff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SlidesContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SlideImage = styled.div`
  flex: 1;
  background-color: #333;
  position: relative;
  height: 100%;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    flex: 2;
  }
`;

const SlideQuoteContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background-color: #111;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SlideQuote = styled(motion.div)`
  font-size: 2rem;
  font-weight: 300;
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SlideAuthor = styled(motion.div)`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavigationControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
`;

const NavButton = styled.button`
  background: none;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.3s ease;
  color: #fff;
  width: 50px;
  height: 50px;
  
  &:hover {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.8);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const PaginationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$isActive ? '#fff' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  
  const slides = [
    {
      id: 1,
      quote: "Fashion becomes as grand as the vision behind it.",
      author: "Jessica Miller",
      image: "/images/gallery-models.jpg"
    },
    {
      id: 2,
      quote: "Beauty reimagined for a new digital era.",
      author: "Michael Johnson",
      image: "/images/gallery-models.jpg"
    },
    {
      id: 3,
      quote: "The future of fashion is representation.",
      author: "Emma Roberts",
      image: "/images/gallery-models.jpg"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  // Auto-scroll effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [slides.length]);
  
  // Pause auto-scroll when user interacts with carousel
  const pauseAutoScroll = () => {
    clearInterval(intervalRef.current);
  };
  
  // Resume auto-scroll after interaction
  const resumeAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };
  
  return (
    <CarouselContainer>
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          What People Are Saying
        </SectionTitle>
        
        <SlidesContainer>
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <Slide
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SlideContent>
                    <SlideImage style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <SlideQuoteContainer>
                      <SlideQuote
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        "{slide.quote}"
                      </SlideQuote>
                      <SlideAuthor
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        {slide.author}
                      </SlideAuthor>
                    </SlideQuoteContainer>
                  </SlideContent>
                </Slide>
              )
            ))}
          </AnimatePresence>
        </SlidesContainer>
        
        <NavigationControls>
          <NavButton 
            onClick={() => {
              pauseAutoScroll();
              prevSlide();
              resumeAutoScroll();
            }}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
          
          <Pagination>
            {slides.map((_, index) => (
              <PaginationDot
                key={index}
                $isActive={index === currentSlide}
                onClick={() => {
                  pauseAutoScroll();
                  goToSlide(index);
                  resumeAutoScroll();
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </Pagination>
          
          <NavButton 
            onClick={() => {
              pauseAutoScroll();
              nextSlide();
              resumeAutoScroll();
            }}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavButton>
        </NavigationControls>
      </ContentWrapper>
    </CarouselContainer>
  );
}

export default CarouselSection;