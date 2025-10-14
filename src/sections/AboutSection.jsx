import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled.section`
  display: flex;
  padding: 6rem 2rem;
  align-items: center;
  gap: 4rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 600px;
  position: relative;
`;

const AboutImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0; /* Placeholder color */
  background-image: url('/images/male-model.jpg');
  background-size: cover;
  background-position: center;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AboutHeading = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

function AboutSection() {
  return (
    <AboutContainer id="about">
      <ImageContainer>
        <AboutImage 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </ImageContainer>
      
      <TextContainer>
        <AboutHeading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          We don't just create models.
        </AboutHeading>
        
        <AboutText
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We shape digital reflections of possibility. Every face has a story. Every frame a rhythm of power, essence, and elegance.
        </AboutText>
        
        <AboutText
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          We stand for representation that transcends borders, for creativity that echoes beyond time.
        </AboutText>
      </TextContainer>
    </AboutContainer>
  );
}

export default AboutSection;