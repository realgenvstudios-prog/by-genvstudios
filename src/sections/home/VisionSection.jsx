import { motion } from 'framer-motion';
import styled from 'styled-components';

const VisionContainer = styled.section`
  padding: 10rem 2rem;
  background-color: #fff;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VisionHeading = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 2;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VisionText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 700px;
  text-align: center;
  margin-bottom: 5rem;
  opacity: 0.8;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ModelCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  }
`;

const ModelImage = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f0f0f0; /* Placeholder color */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 450px;
  }
`;

const ModelInfo = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

const ModelName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ModelDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.7;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background-color: #f9f9f9;
  top: 10%;
  right: -100px;
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function VisionSection() {
  const models = [
    {
      image: '/images/vision-model1.jpg',
      name: 'Digital Elegance',
      description: 'Our AI models embody sophistication with photorealistic details and natural expressions.'
    },
    {
      image: '/images/vision-model2.jpg',
      name: 'Cultural Diversity',
      description: 'We celebrate global beauty standards with diverse AI models that represent all cultures.'
    },
    {
      image: '/images/vision-model3.jpg',
      name: 'Fashion Innovation',
      description: 'Pushing boundaries of digital fashion presentation with cutting-edge AI technology.'
    }
  ];

  return (
    <VisionContainer>
      <BackgroundDecoration />
      <ContentWrapper>
        <VisionHeading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          This is More Than Fashion
        </VisionHeading>
        
        <VisionText
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          We are creating a new digital stage for beauty, creativity, and confidence. 
          Every collection tells a story of cultural renaissance in the digital landscape. This is 
          the artistry of AI human models, told through modern digital storytelling.
        </VisionText>
        
        <ModelsGrid>
          {models.map((model, index) => (
            <ModelCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ModelImage style={{ backgroundImage: `url(${model.image})` }} />
              <ModelInfo>
                <ModelName>{model.name}</ModelName>
                <ModelDescription>{model.description}</ModelDescription>
              </ModelInfo>
            </ModelCard>
          ))}
        </ModelsGrid>
      </ContentWrapper>
    </VisionContainer>
  );
}

export default VisionSection;