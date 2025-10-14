
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProcessContainer = styled.section`
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EAEAEA;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessHeading = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Canela Text', 'Playfair Display', serif;
  color: #111;
`;

const ProcessSubheading = styled(motion.p)`
  font-size: 1.3rem;
  opacity: 0.7;
  margin-bottom: 4rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Satoshi', 'Inter', sans-serif;
`;

const StepsContainer = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const Step = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StepNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  opacity: 1;
  position: static;
  margin-right: 0.5rem;
  display: inline-block;
`;

const StepImageContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
  position: relative;
  overflow: visible;
  border-radius: 0;
  box-shadow: none;
  background: #EAEAEA;
`;

const StepImage = styled.div`
  display: none;
`;

const StepContent = styled.div`
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Canela Text', 'Playfair Display', serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 300px;
  margin: 0 auto;
  font-family: 'Satoshi', 'Inter', sans-serif;
`;

function AboutProcessSection() {
  const steps = [
    {
      number: '01',
      image: '/images/about-process-1.jpg',
      title: 'Discover the Story',
      text: 'Every project begins with a unique vision. We listen, learn, and shape the narrative that will define your digital presence.'
    },
    {
      number: '02',
      image: '/images/about-process-2.jpg',
      title: 'Curate the Experience',
      text: 'We select the right models, styles, and digital assets to bring your brand’s story to life in a way that resonates.'
    },
    {
      number: '03',
      image: '/images/about-process-3.jpg',
      title: 'Showcase the Impact',
      text: 'Your brand is revealed in stunning visuals, ready to inspire and connect with audiences everywhere.'
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
          From Product to Digital Presence.
        </ProcessHeading>
        <ProcessSubheading
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Our process transforms your ideas into a digital showcase, step by step.
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
              <StepImageContainer>
                <img src={step.image} alt={step.title} style={{ width: '100%', height: '520px', objectFit: 'cover', background: '#EAEAEA', borderRadius: '0', boxShadow: 'none' }} />
              </StepImageContainer>
              <StepContent>
                <StepTitle>
                  <StepNumber>{step.number}</StepNumber>
                  {step.title}
                </StepTitle>
                <StepText>{step.text}</StepText>
              </StepContent>
            </Step>
          ))}
        </StepsContainer>
      </ContentWrapper>
    </ProcessContainer>
  );
}

export default AboutProcessSection;
