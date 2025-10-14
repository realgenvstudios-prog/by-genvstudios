import styled from 'styled-components';

const Section = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    padding: 3rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 1400px;
  margin: 0 auto;
  gap: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    justify-content: center;
    order: 1;
  }
`;

const ModelImage = styled.img`
  width: 480px;
  height: auto;
  object-fit: contain;
  background: #EAEAEA;
  margin-left: 150px;
  @media (max-width: 900px) {
    width: 220px;
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    width: 200px;
    margin: 0;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 2vw;
  
  @media (max-width: 768px) {
    align-items: center;
    padding: 0;
    order: 2;
  }
`;

const Headline = styled.h2`
  font-family: 'Canela Text', 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Satoshi', 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #222;
  margin-bottom: 0.1rem;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    line-height: 1.7;
  }
`;

function AboutStatementSection() {
  return (
    <Section>
      <ContentWrapper>
        <ImageWrapper>
          <ModelImage src="/images/statement-model.png" alt="Model" />
        </ImageWrapper>
        <TextWrapper>
          <Headline>We don’t just create models.</Headline>
          <Paragraph>
            We shape digital reflections of possibility. Every face here is a story. Every frame a rhythm of power, silence, and elegance.
          </Paragraph>
          <Paragraph>
            We stand for representation that transcends borders, for creativity that echoes beyond time.
          </Paragraph>
        </TextWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default AboutStatementSection;
