import styled from 'styled-components';

// Font links for Canela Text and Satoshi (add to index.html or via JS)
// Canela Text is not a free web font, so we'll use 'Playfair Display' as a close alternative for demo
// Satoshi is not on Google Fonts, so we'll use 'Inter' as a clean sans-serif alternative

const SectionContainer = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: auto;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 1.5rem;
    min-height: auto;
    box-sizing: border-box;
  }
`;

const Headline = styled.h1`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.25rem;
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

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) {
    gap: 1.2rem;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    gap: 0.7rem;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const Card = styled.div`
  background: #D9D9D9;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  justify-content: center;
  min-width: 260px;
  box-shadow: none;
  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
    max-width: 160px;
    margin: 0;
    height: 200px;
    background: #D9D9D9;
    
    &:nth-child(3) {
      grid-column: 1 / -1;
      max-width: 160px;
      justify-self: center;
    }
  }
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;

function FutureFashionSection() {
  return (
    <SectionContainer>
      <Headline>The Future of Fashion</Headline>
      <Subtitle>
        A revolution from Africa bold, brilliant, and unstoppable.<br />
        A new way to showcase clothing, beauty, and story. Designed<br />
        for those who see beyond fabric. We translate clothing into emotion.
      </Subtitle>
      <CardsRow>
        <Card className="fashion-card">
          <CardImage src="/images/fashion1.jpg" alt="Fashion Look 1" />
        </Card>
        <Card className="fashion-card">
          <CardImage src="/images/fashion2.jpg" alt="Fashion Look 2" />
        </Card>
        <Card className="fashion-card">
          <CardImage src="/images/fashion3.jpg" alt="Fashion Look 3" />
        </Card>
      </CardsRow>
    </SectionContainer>
  );
}

export default FutureFashionSection;
