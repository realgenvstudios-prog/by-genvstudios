import { Suspense } from 'react';
import HeroSection from '../sections/home/HeroSection';
import FutureFashionSection from '../sections/home/FutureFashionSection';
import HowItWorksSection from '../sections/home/HowItWorksSection';
import ModelShowcaseSection from '../sections/home/ModelShowcaseSection';
import WorkWithUsSection from '../sections/home/WorkWithUsSection';
import FashionEmotionSection from '../sections/home/FashionEmotionSection';

function HomePage() {
  return (
    <div>
      <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
        <HeroSection />
        <FutureFashionSection />
        <HowItWorksSection />
        <ModelShowcaseSection />
        <FashionEmotionSection />
        <WorkWithUsSection />
      </Suspense>
    </div>
  );
}

export default HomePage;