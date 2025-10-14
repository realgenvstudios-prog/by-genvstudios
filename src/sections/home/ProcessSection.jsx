import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProcessContainer = styled.section`
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessHeading = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProcessSubheading = styled(motion.p)`
  font-size: 1.4rem;
  opacity: 0.7;
  margin-bottom: 5rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1.2rem;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    width: 100vw;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Step = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    min-width: 260px;
    max-width: 320px;
    flex: 0 0 auto;
    margin-right: 1rem;
  }
`;

const StepNumber = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: #000;
  opacity: 0.05;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const StepImageContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    height: 350px;
    margin-bottom: 1.2rem;
    max-width: 320px;
  }
`;

const StepImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e5e5; /* Placeholder color */
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StepContent = styled.div`
  text-align: center;
  padding: 0 1rem;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding: 0;
    max-width: 320px;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StepText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 300px;
  margin: 0 auto;
`;

function ProcessSection() {
  const steps = [
    {
      number: '01',
      image: '/images/process-step1.jpg',
      title: 'Select Your Models',
      text: 'Browse our curated collection of digital and human models to find the perfect match for your brand identity.'
    },
    {
      number: '02',
      image: '/images/process-step2.jpg',
      title: "Share Your Vision",
      text: 'Send us your fashion photos, products, accessories, or concepts that you want to showcase.'
    },
    {
      number: '03',
      image: '/images/process-step3.jpg',
      title: 'See Your Brand Transformed',
      text: 'We bring your products to life with photorealistic AI models in captivating, high-quality imagery.'
    },
  ];
  
  return (
    <ProcessContainer>
      <ContentWrapper>
        <ProcessHeading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          From Product to Digital Presence
        </ProcessHeading>
        
        <ProcessSubheading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Transform your products into stunning digital showcases with our simple three-step process
        </ProcessSubheading>
        
        <StepsContainer>
          {steps.map((step, index) => (
            <Step
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <StepNumber>{step.number}</StepNumber>
              <StepImageContainer>
                <StepImage style={{ backgroundImage: `url(${step.image})` }} />
              </StepImageContainer>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepText>{step.text}</StepText>
              </StepContent>
            </Step>
          ))}
        </StepsContainer>
      </ContentWrapper>
    </ProcessContainer>
  );
}

export default ProcessSection;