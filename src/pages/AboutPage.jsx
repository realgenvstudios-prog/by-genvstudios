
import styled from 'styled-components';
import AboutHeroSection from '../sections/about/AboutHeroSection';
import AboutCollageSection from '../sections/about/AboutCollageSection';
import AboutStatementSection from '../sections/about/AboutStatementSection';
import AboutQuestionSection from '../sections/about/AboutQuestionSection';
import AboutVisionSection from '../sections/about/AboutVisionSection';
import Footer from '../components/Footer';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

function AboutPage() {
			return (
				<PageContainer>
					<AboutHeroSection />
					<AboutCollageSection />
					<AboutVisionSection />
					<AboutStatementSection />
					<AboutQuestionSection />
				</PageContainer>
			);
}

export default AboutPage;
