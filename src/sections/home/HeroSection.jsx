
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.section`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 2rem 1rem;
    flex-direction: column;
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    order: 2;
  }
`;

const MainHeadline = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const SubHeadline = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const DemoButton = styled.button`
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
  
  &::after {
    content: '→';
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    width: auto;
    max-width: 220px;
    height: 44px;
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 22px;
    justify-content: center;
    margin: 0 auto;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
`;

const ModelsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 600px;
  
  @media (max-width: 768px) {
    height: 400px;
    gap: 1rem;
    order: 1;
  }
`;

const ModelImage = styled.div`
  width: 250px;
  height: 500px;
  background: #ddd;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:first-child {
    transform: translateY(-20px);
  }
  
  &:last-child {
    transform: translateY(20px);
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 300px;
    
    &:first-child {
      transform: translateY(-10px);
    }
    
    &:last-child {
      transform: translateY(10px);
    }
  }
`;

function HeroSection() {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <ContentWrapper>
        <TextContent>
          <MainHeadline>
            Next-Gen Fashion Models. Created by AI, Perfected by You.
          </MainHeadline>
          <SubHeadline>
            Our AI-powered visual platform helps fashion brands and designers create, test, and showcase outfits that fit their vision accurately, efficiently, and all in one place.
          </SubHeadline>
          <DemoButton onClick={() => navigate('/contact')}>
            Request a Demo
          </DemoButton>
        </TextContent>
        
        <ModelsContainer>
          <ModelImage style={{ backgroundImage: 'url(/images/hero-model1.png)' }} />
          <ModelImage style={{ backgroundImage: 'url(/images/hero-model2.png)' }} />
        </ModelsContainer>
      </ContentWrapper>
    </HeroContainer>
  );
}

export default HeroSection;