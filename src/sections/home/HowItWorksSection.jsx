import styled from 'styled-components';

const SectionContainer = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: auto;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 1.5rem;
    min-height: auto;
    box-sizing: border-box;
  }
`;

const Headline = styled.h2`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 2.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.15rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3.5rem auto;
  line-height: 1.6;
  opacity: 0.85;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 auto 2.5rem auto;
    line-height: 1.7;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const StepsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) {
    gap: 1.5rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const StepCard = styled.div`
  background: #EAEAEA;
  border-radius: 24px;
  box-shadow: none;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  min-height: 520px;
  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    min-height: 480px;
    padding: 1.5rem;
  }
`;

const StepImage = styled.img`
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  background: #D9D9D9;
  @media (max-width: 768px) {
    height: 620px;
    width: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const StepNumber = styled.div`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #888;
  margin-bottom: 0.5rem;
`;

const StepTitle = styled.h3`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 1.35rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1rem;
  text-align: center;
  color: #444;
  margin-bottom: 0;
`;

function HowItWorksSection() {
  return (
    <SectionContainer>
      <Headline>From Product to Digital Presence.</Headline>
      <Subtitle>
        In Moments.<br />
      </Subtitle>
      <StepsRow>
        <StepCard>
          <StepImage src="/images/how1.jpg" alt="Select your muse" />
          <StepNumber>1. Select your muse</StepNumber>
          <StepDesc>Browse through our curated collection of digital and human models.</StepDesc>
        </StepCard>
        <StepCard>
          <StepImage src="/images/how2.jpg" alt="Send your product's photo" />
          <StepNumber>2. Send your product’s photo</StepNumber>
          <StepDesc>Share your fashion pieces, garments, accessories, or concepts.</StepDesc>
        </StepCard>
        <StepCard>
          <StepImage src="/images/how3.jpg" alt="We bring your vision to life" />
          <StepNumber>3. We bring your vision to life</StepNumber>
          <StepDesc>Each image becomes a story styled, rendered, and ready to captivate.</StepDesc>
        </StepCard>
      </StepsRow>
    </SectionContainer>
  );
}

export default HowItWorksSection;
