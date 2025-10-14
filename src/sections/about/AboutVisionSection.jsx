import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

const ComparisonContainer = styled.section`
  padding: 4rem 2rem;
  background: #EAEAEA;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: auto;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #1a1a1a;
  max-width: 800px;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 0.5rem;
    width: 100vw;
  }
`;

const TimelineBackground = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  height: 100%;
  background: #e0e0e0;
  transform: translateX(-50%);
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineSegment = styled.div`
  position: absolute;
  left: 50%;
  width: 4px;
  background: ${props => props.isActive ? '#1a1a1a' : '#e0e0e0'};
  transform: translateX(-50%);
  z-index: 1;
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ComparisonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rem;
  position: relative;
  opacity: ${props => props.isVisible ? 1 : 0.3};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.8s ease;
  min-height: 80px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    min-height: 60px;
  }
`;

const ComparisonSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align};
  padding: ${props => props.align === 'flex-end' ? '0 8rem 0 2rem' : '0 2rem 0 8rem'};
  
  @media (max-width: 768px) {
    align-items: ${props => props.align};
    padding: ${props => props.align === 'flex-end' ? '0 0.2rem 0 0' : '0 0 0 0.2rem'};
    margin-bottom: 0;
    max-width: 35%;
  }
`;

const ComparisonText = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: normal;
    line-height: 1.2;
  }
`;

const TimelineIconWrapper = styled.div`
  position: relative;
  
  @media (max-width: 768px) {
    width: 30%;
    min-width: 80px;
    display: flex;
    justify-content: center;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: ${props => props.bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  z-index: 10;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    margin: 0;
  }
`;

const IconLabel = styled.div`
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.95rem;
  font-weight: 600;
  color: #666;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    margin-top: 0;
  }
`;

function AboutVisionSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const comparisons = [
    {
      left: "Weeks of planning",
      right: "Minutes of setup",
      icon: "📅",
      bgColor: "#ff6b6b",
      label: "Timeline"
    },
    {
      left: "$10,000+ per shoot",
      right: "Starting at $300",
      icon: "💰",
      bgColor: "#ffd93d",
      label: "Cost"
    },
    {
      left: "Days of shooting",
      right: "Instant generation",
      icon: "⏰",
      bgColor: "#6bcf7f",
      label: "Production"
    },
    {
      left: "Limited models",
      right: "Infinite variation",
      icon: "🌍",
      bgColor: "#4ecdc4",
      label: "Diversity"
    }
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!containerRef.current || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY + windowHeight / 2;
        
        // Check which items are visible and active
        const newVisibleItems = new Set();
        const activeSegments = new Set();
        
        itemRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const itemTop = rect.top + window.scrollY;
            
            // Item visibility
            if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
              newVisibleItems.add(index);
            }
            
            // Segment activation (line appears when we scroll past the item)
            if (scrollY > itemTop + 50) {
              activeSegments.add(index);
            }
          }
        });
        
        setVisibleItems(newVisibleItems);
        setScrollProgress(activeSegments.size * 25); // For any remaining progress needs
        
        // Store active segments for rendering
        containerRef.current.activeSegments = activeSegments;
        
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ComparisonContainer ref={containerRef}>
      <MainHeading>Next-Gen Imagery for Modern Brands.</MainHeading>
      
      <TimelineContainer>
        {comparisons.map((comparison, index) => (
          <ComparisonRow
            key={index}
            ref={el => itemRefs.current[index] = el}
            isVisible={visibleItems.has(index)}
          >
            <ComparisonSide align="flex-end">
              <ComparisonText>{comparison.left}</ComparisonText>
            </ComparisonSide>
            
            <TimelineIconWrapper>
              <TimelineIcon bgColor={comparison.bgColor}>
                {comparison.icon}
                <IconLabel>{comparison.label}</IconLabel>
              </TimelineIcon>
            </TimelineIconWrapper>
            
            
            <ComparisonSide align="flex-start">
              <ComparisonText>{comparison.right}</ComparisonText>
            </ComparisonSide>
          </ComparisonRow>
        ))}
      </TimelineContainer>
    </ComparisonContainer>
  );
}

export default AboutVisionSection;
