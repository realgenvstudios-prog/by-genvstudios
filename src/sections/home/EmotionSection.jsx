import { motion } from 'framer-motion';
import styled from 'styled-components';

const EmotionContainer = styled.section`
  padding: 10rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
`;

const EmotionHeading = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EmotionSubheading = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.7;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 300px);
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 250px);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 200px);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 250px);
  }
`;

const GridItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  
  &:nth-child(1) {
    grid-column: span 2;
  }
  
  &:nth-child(6) {
    grid-column: span 2;
  }
  
  @media (max-width: 768px) {
    &:nth-child(1), &:nth-child(6) {
      grid-column: span 1;
    }
  }
`;

const GridImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e5e5; /* Placeholder color */
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ImageTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const GridItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:hover {
    ${GridImage} {
      transform: scale(1.05);
    }
    
    ${ImageOverlay} {
      opacity: 1;
    }
  }
`;

const BackgroundAccent = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: #f9f9f9;
  z-index: -1;
  bottom: -200px;
  left: -200px;
`;

function EmotionSection() {
  // These would be actual image paths in production, for now using placeholder data
  const imageData = [
    {
      id: 1,
      path: '/images/emotion1.jpg',
      title: 'Elegant Fashion'
    },
    {
      id: 2,
      path: '/images/emotion2.jpg',
      title: 'Bold Expression'
    },
    {
      id: 3,
      path: '/images/emotion3.jpg',
      title: 'Timeless Style'
    },
    {
      id: 4,
      path: '/images/emotion4.jpg',
      title: 'Urban Chic'
    },
    {
      id: 5,
      path: '/images/emotion5.jpg',
      title: 'Classic Refinement'
    },
    {
      id: 6,
      path: '/images/emotion6.jpg',
      title: 'Modern Luxury'
    },
    {
      id: 7,
      path: '/images/emotion7.jpg',
      title: 'Creative Design'
    },
    {
      id: 8,
      path: '/images/emotion8.jpg',
      title: 'Sophisticated Edge'
    },
  ];
  
  return (
    <EmotionContainer>
      <BackgroundAccent />
      <ContentWrapper>
        <SectionHeader>
          <EmotionHeading
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            We Translate Clothing Into Emotion
          </EmotionHeading>
          
          <EmotionSubheading
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our AI models convey the feeling and essence of your products, creating emotional connections with your audience.
          </EmotionSubheading>
        </SectionHeader>
        
        <ImagesGrid>
          {imageData.map((image, index) => (
            <GridItem
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <GridItemContainer>
                <GridImage style={{ backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#d0d0d0' }} />
                <ImageOverlay>
                  <ImageTitle>{image.title}</ImageTitle>
                </ImageOverlay>
              </GridItemContainer>
            </GridItem>
          ))}
        </ImagesGrid>
      </ContentWrapper>
    </EmotionContainer>
  );
}

export default EmotionSection;