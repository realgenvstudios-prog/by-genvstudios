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
  justify-content: flex-start;
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

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 4vw;
  padding-right: 2vw;
  
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
  margin-bottom: 1.2rem;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Subheading = styled.p`
  font-family: 'Satoshi', 'Inter', sans-serif;
  font-size: 1.25rem;
  font-style: italic;
  color: #222;
  margin-bottom: 0.1rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Satoshi', 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #222;
  margin-bottom: 0;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
    line-height: 1.7;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
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
  margin-right: 40px;
  @media (max-width: 900px) {
    width: 220px;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    width: 200px;
    margin: 0;
  }
`;

function AboutQuestionSection() {
  return (
    <Section>
      <ContentWrapper>
        <TextWrapper>
          <Headline>It started with one question</Headline>
          <Subheading>What if the world saw Africa the way we see ourselves?</Subheading>
          <Paragraph>
            Bold. Brilliant. Infinite. From that question came a movement a digital stage where African fashion and creators can stand as grand as any in the world. This isn’t about imitation. It’s about evolution powered by technology, styled by culture, and told through us.
          </Paragraph>
        </TextWrapper>
        <ImageWrapper>
          <ModelImage src="/images/question-model.png" alt="Model" />
        </ImageWrapper>
      </ContentWrapper>
    </Section>
  );
}

export default AboutQuestionSection;
