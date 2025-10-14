import { motion } from 'framer-motion';
import styled from 'styled-components';

const VisionContainer = styled.section`
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const VisionHeading = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  max-width: 800px;
  line-height: 1.2;
`;

function VisionSection() {
  return (
    <VisionContainer id="vision">
      <VisionHeading
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        UNCOVER A NEW VISION OF FASHION WITH GENVSTUDIOS
      </VisionHeading>
    </VisionContainer>
  );
}

export default VisionSection;