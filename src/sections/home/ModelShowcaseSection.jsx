import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SectionContainer = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: auto;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 1.5rem;
    min-height: auto;
    box-sizing: border-box;
  }
`;

const Headline = styled.h2`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 1.7rem;
    margin-bottom: 1.2rem;
    line-height: 1.2;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 5rem auto;
  line-height: 1.5;
  opacity: 0.85;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0 auto 3rem auto;
    line-height: 1.6;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const CarouselRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2.5rem auto;
  position: relative;
  min-height: 600px;
  @media (max-width: 900px) {
    gap: 1.5rem;
    min-height: 400px;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 0 1rem 0 2rem;
    width: calc(100vw - 3rem);
    margin-left: 0;
    height: 450px;
    margin-bottom: 2rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ModelCard = styled(motion.div)`
  background: #F5F5F5;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  width: 340px;
  height: 600px;
  overflow: hidden;
  position: relative;
  @media (max-width: 900px) {
    width: 240px;
    height: 400px;
  }
  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    height: 450px;
    flex: 0 0 auto;
    border-radius: 18px;
    margin-right: 0.5rem;
  }
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  @media (max-width: 768px) {
    border-radius: 18px;
  }
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0 1.5rem 0;
`;

const NavArrow = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  padding: 0 1rem;
  transition: color 0.2s;
  box-shadow: none;
  outline: none;
  &:hover {
    color: #888;
    background: none;
    box-shadow: none;
  }
`;

const Counter = styled.span`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
`;

const Description = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.15rem;
  text-align: center;
  color: #222;
  margin-bottom: 2rem;
`;

const ExploreButton = styled.button`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 32px;
  padding: 1rem 2.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #444;
  }
`;

const models = [
  {
    src: '/images/model1.jpg',
    alt: 'Model 1',
  },
  {
    src: '/images/model2.jpg',
    alt: 'Model 2',
  },
  {
    src: '/images/model3.jpg',
    alt: 'Model 3',
  },
];

// Model showcase loading component
const ModelShowcaseLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ModelCardSkeleton = styled.div`
  width: 280px;
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 350px;
  }
`;

function ModelShowcaseSection() {
  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for static content
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set initial scroll position to show middle image on mobile
  useEffect(() => {
    if (window.innerWidth <= 768 && carouselRef.current && !isLoading) {
      const cardWidth = 290; // 280px + 10px gap
      carouselRef.current.scrollTo({
        left: active * cardWidth,
        behavior: 'auto'
      });
    }
  }, [isLoading]);

  const handlePrev = () => {
    const newActive = active === 0 ? models.length - 1 : active - 1;
    setActive(newActive);
    
    // Handle mobile horizontal scrolling
    if (window.innerWidth <= 768 && carouselRef.current) {
      const cardWidth = 290; // 280px + 10px gap
      carouselRef.current.scrollTo({
        left: newActive * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const handleNext = () => {
    const newActive = active === models.length - 1 ? 0 : active + 1;
    setActive(newActive);
    
    // Handle mobile horizontal scrolling
    if (window.innerWidth <= 768 && carouselRef.current) {
      const cardWidth = 290; // 280px + 10px gap
      carouselRef.current.scrollTo({
        left: newActive * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionContainer>
      <Headline>This Is More Than Fashion</Headline>
      <Subtitle>
        We are shaping a new digital stage for African beauty, creativity, and confidence.<br />
        Every creation, every design, every face a statement of pride and presence. This is<br />
        the artistry of a continent, told through modern storytelling.
      </Subtitle>
      <CarouselRow ref={carouselRef}>
        {models.map((model, idx) => {
          const isActive = idx === active;
          return (
            <ModelCard
              key={model.src}
              initial={{ scale: isActive ? 1.15 : 0.95, opacity: isActive ? 1 : 0.45 }}
              animate={{ scale: isActive ? 1.15 : 0.95, opacity: isActive ? 1 : 0.45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              <ModelImage src={model.src} alt={model.alt} />
            </ModelCard>
          );
        })}
      </CarouselRow>
      <NavRow>
        <NavArrow onClick={handlePrev} aria-label="Previous model">&#8592;</NavArrow>
        <Counter>{`0${active + 1}/3`}</Counter>
        <NavArrow onClick={handleNext} aria-label="Next model">&#8594;</NavArrow>
      </NavRow>
      <Description>Fashion deserves a stage as grand as the vision behind it.</Description>
      <ExploreButton onClick={() => navigate('/models')}>Explore the Models</ExploreButton>
    </SectionContainer>
  );
}

export default ModelShowcaseSection;
