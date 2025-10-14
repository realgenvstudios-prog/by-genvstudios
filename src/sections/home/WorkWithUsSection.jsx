import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SectionContainer = styled.section`
  background: #000;
  width: 100vw;
  min-height: auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 1.5rem;
    min-height: auto;
    box-sizing: border-box;
  }
`;

const Headline = styled.h2`
  font-family: 'Playfair Display', 'Canela Text', serif;
  font-size: 1.35rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin-bottom: 3rem;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    line-height: 1.3;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

const CTAButton = styled.button`
  font-family: 'Inter', 'Satoshi', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  background: #fff;
  color: #222;
  border: none;
  border-radius: 40px;
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: none;
  &:hover {
    background: #222;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1.2rem 2rem;
    min-height: 50px;
    border-radius: 32px;
  }
`;

function WorkWithUsSection() {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Headline>For brands, designers, and visionaries who believe fashion is more than what you wear.</Headline>
      <CTAButton onClick={() => navigate('/contact')}>Work With Us</CTAButton>
    </SectionContainer>
  );
}

export default WorkWithUsSection;
