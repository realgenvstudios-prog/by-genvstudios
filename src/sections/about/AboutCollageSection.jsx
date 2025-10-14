import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CollageSection = styled.section`
  background: #EAEAEA;
  width: 100vw;
  min-height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: 45vh;
    padding: 0.5rem;
  }
`;

const CollageWrapper = styled.div`
  position: relative;
  width: 1100px;
  height: 950px;
  @media (max-width: 1200px) {
    width: 90vw;
    height: 60vw;
  }
  @media (max-width: 768px) {
    width: 85vw;
    height: 55vw;
  }
`;

const ImgA = styled(motion.img)`
  position: absolute;
  left: 95px;
  top: 0;
  width: 520px;
  height: 870px;
  object-fit: cover;
  z-index: 1;
  border-radius: 0;
  box-shadow: none;
  @media (max-width: 1200px) {
    width: 45vw;
    height: 60vw;
  }
  @media (max-width: 768px) {
    left: 5vw;
    top: 0;
    width: 40vw;
    height: 50vw;
  }
`;

const ImgB = styled(motion.img)`
  position: absolute;
  left: 500px;
  top: 120px;
  width: 500px;
  height: 600px;
  object-fit: cover;
  z-index: 2;
  border-radius: 0;
  box-shadow: none;
  @media (max-width: 1200px) {
    left: 28vw;
    top: 7vw;
    width: 60vw;
    height: 45vw;
  }
  @media (max-width: 768px) {
    left: 35vw;
    top: 15vw;
    width: 45vw;
    height: 35vw;
  }
`;

function AboutCollageSection() {
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  // Parallax for first image (slower)
  const yA = useTransform(scrollY, [0, 600], [0, -60]);
  // Parallax for second image (faster)
  const yB = useTransform(scrollY, [0, 600], [0, -120]);

  return (
    <CollageSection ref={ref}>
      <CollageWrapper>
        <ImgA
          src="/images/about-collage1.jpg"
          alt="African fashion model in yellow dress"
          style={{ y: yA }}
        />
        <ImgB
          src="/images/about-collage2.jpg"
          alt="Group in patterned fashion"
          style={{ y: yB }}
        />
      </CollageWrapper>
    </CollageSection>
  );
}

export default AboutCollageSection;
