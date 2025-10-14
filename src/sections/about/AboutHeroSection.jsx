import styled from 'styled-components';

const HeroSection = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 6rem 0 4rem 0;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 4rem 1rem 3rem 1rem;
    min-height: 50vh;
  }
`;

const Headline = styled.h1`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.1;
  @media (max-width: 900px) {
    font-size: 2.5rem;
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  color: #888;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.35rem;
  text-align: center;
  color: #222;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 900px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
    -webkit-line-clamp: 3;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

function AboutHeroSection() {
  return (
    <HeroSection>
      <Headline>A Revolution From Africa.</Headline>
      <Subtitle>Not Just Fashion — Presence.</Subtitle>
      <Paragraph>
        We exist to reimagine how beauty, creativity, and identity are seen. This is the beginning of a new language told through style, confidence, and digital artistry.
      </Paragraph>
    </HeroSection>
  );
}

export default AboutHeroSection;
