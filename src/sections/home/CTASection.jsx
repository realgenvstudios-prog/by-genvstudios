import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CTAContainer = styled.section`
  padding: 8rem 2rem;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CTATextContent = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 968px) {
    margin-bottom: 3rem;
  }
`;

const CTAHeading = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CTASubheading = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const CTAButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion(Link))`
  padding: 1rem 2.5rem;
  background-color: white;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  border: 2px solid white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const SecondaryButton = styled(motion(Link))`
  padding: 1rem 2.5rem;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid white;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CTAImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 500px;
  
  @media (max-width: 968px) {
    width: 100%;
    justify-content: center;
    height: 400px;
  }
`;

const CTAImage = styled.div`
  width: 80%;
  height: 100%;
  background-color: #333;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    width: 100%;
    max-width: 400px;
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  top: -50px;
  left: -150px;
  z-index: 1;
`;

const BackgroundShape2 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  bottom: -80px;
  right: 100px;
  z-index: 1;
`;

function CTASection() {
  return (
    <CTAContainer>
      <BackgroundShape />
      <BackgroundShape2 />
      
      <ContentWrapper>
        <CTATextContent>
          <CTAHeading
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Transform Your Brand with AI Models
          </CTAHeading>
          
          <CTASubheading
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            For brands, designers, and visionaries who believe fashion presentation is an art form. Let's create something extraordinary together.
          </CTASubheading>
          
          <CTAButtonsContainer>
            <PrimaryButton
              to="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              WORK WITH US
            </PrimaryButton>
            
            <SecondaryButton
              to="/models"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              VIEW MODELS
            </SecondaryButton>
          </CTAButtonsContainer>
        </CTATextContent>
        
        <CTAImageContainer>
          <CTAImage 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </CTAImageContainer>
      </ContentWrapper>
    </CTAContainer>
  );
}

export default CTASection;