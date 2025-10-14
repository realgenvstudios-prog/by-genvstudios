import styled from 'styled-components';

const SectionContainer = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem 1.5rem;
    min-height: auto;
    box-sizing: border-box;
  }
`;

const Headline = styled.h2`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.1;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    line-height: 1.2;
    padding: 0 0.5rem;
  }
`;

const CollageGrid = styled.div`
  position: relative;
  width: 1400px;
  height: 700px;
  left: -100px;
  @media (max-width: 1600px) {
    width: 98vw;
    height: 60vw;
    left: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const CollageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
  background: #D9D9D9;
  @media (max-width: 768px) {
    border-radius: 8px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

// Individual image wrappers for custom cropping
const ImgWrapper = styled.div`
  position: absolute;
  overflow: visible;
  border-radius: 0;
  background: #D9D9D9;
  @media (max-width: 768px) {
    position: static;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    background: #D9D9D9;
    
    /* Hide some images on mobile - show only 4 key ones */
    &:nth-child(n+5) {
      display: none;
    }
  }
`;

// Mobile-only simple image container
const MobileImageGrid = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const MobileImageCard = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #D9D9D9;
`;

const MobileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function FashionEmotionSection() {
  return (
    <SectionContainer>
      <Headline>We translate clothing into emotion.</Headline>
      
      {/* Desktop Complex Collage - Hidden on Mobile */}
      <CollageGrid>
        {/* Left vertical images */}
        <ImgWrapper style={{ left: '0px', top: '60px', width: '90px', height: '320px' }}>
          <CollageImage src="/images/emotion1.jpg" alt="Fashion Emotion 1" />
        </ImgWrapper>
        <ImgWrapper style={{ left: '0px', top: '400px', width: '90px', height: '180px' }}>
          <CollageImage src="/images/emotion2.jpg" alt="Fashion Emotion 2" />
        </ImgWrapper>
        {/* Main left large image */}
        <ImgWrapper style={{ left: '115px', top: '60px', width: '340px', height: '420px' }}>
          <CollageImage src="/images/emotion3.jpg" alt="Fashion Emotion 3" />
        </ImgWrapper>
        {/* Center large image */}
        <ImgWrapper style={{ left: '485px', top: '0px', width: '420px', height: '520px' }}>
          <CollageImage src="/images/emotion4.jpg" alt="Fashion Emotion 4" />
        </ImgWrapper>
        {/* Top right image (bigger) */}
        <ImgWrapper style={{ left: '935px', top: '60px', width: '240px', height: '240px' }}>
          <CollageImage src="/images/emotion5.jpg" alt="Fashion Emotion 5" />
        </ImgWrapper>
        {/* Fashion Emotion 6 smaller and beneath 5 */}
        <ImgWrapper style={{ left: '1085px', top: '330px', width: '170px', height: '170px', zIndex: 2 }}>
          <CollageImage src="/images/emotion6.jpg" alt="Fashion Emotion 6" />
        </ImgWrapper>
        {/* Fashion Emotion 7 unchanged */}
        <ImgWrapper style={{ left: '1290px', top: '120px', width: '200px', height: '400px', zIndex: 3 }}>
          <CollageImage src="/images/emotion7.jpg" alt="Fashion Emotion 7" />
        </ImgWrapper>
      </CollageGrid>

      {/* Mobile Simple Grid - Hidden on Desktop */}
      <MobileImageGrid>
        <MobileImageCard>
          <MobileImage src="/images/emotion3.jpg" alt="Fashion Emotion 3" />
        </MobileImageCard>
        <MobileImageCard>
          <MobileImage src="/images/emotion4.jpg" alt="Fashion Emotion 4" />
        </MobileImageCard>
        <MobileImageCard>
          <MobileImage src="/images/emotion5.jpg" alt="Fashion Emotion 5" />
        </MobileImageCard>
        <MobileImageCard>
          <MobileImage src="/images/emotion6.jpg" alt="Fashion Emotion 6" />
        </MobileImageCard>
      </MobileImageGrid>
    </SectionContainer>
  );
}

export default FashionEmotionSection;
