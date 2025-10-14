import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProcessContainer = styled.section`
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProcessHeading = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProcessSubheading = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 4rem;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const Step = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StepImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f0f0f0; /* Placeholder color */
  margin-bottom: 1.5rem;
  background-size: cover;
  background-position: center;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const StepText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
  text-align: center;
`;

function ProcessSection() {
  const steps = [
    {
      number: '1',
      image: '/images/process-step1.jpg',
      title: 'Select your ideal collection',
      text: 'Browse through our curated collection of possibilities and choose your models.'
    },
    {
      number: '2',
      image: '/images/process-step2.jpg',
      title: 'Send your product photos',
      text: 'Share your fashion pieces, garments, or designs that you want featured.'
    },
    {
      number: '3',
      image: '/images/process-step3.jpg',
      title: 'We bring your vision to life',
      text: 'Our digital artists create a unique showcase for your brand that represents true diversity.'
    },
  ];
  
  return (
    <ProcessContainer id="process">
      <ProcessHeading
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        From Product to Digital Presence.
      </ProcessHeading>
      
      <ProcessSubheading
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        In 3 Moments.
      </ProcessSubheading>
      
      <StepsContainer>
        {steps.map((step, index) => (
          <Step
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <StepNumber>{step.number}</StepNumber>
            <StepImage style={{ backgroundImage: `url(${step.image})` }} />
            <StepTitle>{step.title}</StepTitle>
            <StepText>{step.text}</StepText>
          </Step>
        ))}
      </StepsContainer>
    </ProcessContainer>
  );
}

export default ProcessSection;