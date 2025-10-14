import { motion } from 'framer-motion';
import styled from 'styled-components';

const StoryContainer = styled.section`
  display: flex;
  padding: 6rem 2rem;
  align-items: center;
  gap: 4rem;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StoryHeading = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const StoryQuestion = styled(motion.h3)`
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
  margin-bottom: 1rem;
`;

const StoryText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 600px;
  position: relative;
`;

const StoryImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0; /* Placeholder color */
  background-image: url('/images/male-model-back.jpg');
  background-size: cover;
  background-position: center;
`;

function StorySection() {
  return (
    <StoryContainer id="story">
      <TextContainer>
        <StoryHeading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          It started with one question
        </StoryHeading>
        
        <StoryQuestion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          What if the world saw Africa the way we see ourselves?
        </StoryQuestion>
        
        <StoryText
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Bold. Brilliant. Infinite. From that question came a movement: a digital stage where African beauty and fashion meet the global world. This isn't about imitation. It's about evolution powered by technology, styled by culture, and told through us.
        </StoryText>
      </TextContainer>
      
      <ImageContainer>
        <StoryImage 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </ImageContainer>
    </StoryContainer>
  );
}

export default StorySection;