import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const DetailWrapper = styled.div`
  background: #EAEAEA;
  min-height: 100vh;
  padding: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0 2rem;
  gap: 2.5rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 1.5rem 0 1.5rem;
  }
`;

const MainImageSection = styled.div`
  flex: 2;
  background: #fff;
  border-radius: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 560px;
  position: relative;
  @media (max-width: 900px) {
    min-height: 420px;
    border-radius: 32px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 520px;
  max-height: 520px;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: contain;
  border-radius: 28px;
  background: #fff;
  margin: 0 auto;
`;

const GallerySection = styled.div`
  flex: 1.2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #ededed;
  border-radius: 40px;
  padding: 2rem 1rem;
  align-items: center;
  justify-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    padding: 1rem 0.5rem;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  max-width: 180px;
  height: 260px;
  object-fit: contain;
  border-radius: 24px;
  background: #fff;
  
  @media (max-width: 900px) {
    max-width: 120px;
    height: 180px;
    border-radius: 16px;
  }
`;

const ArrowNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0 0 0;
`;

const ArrowButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  font-size: 2rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  max-width: 1600px;
  margin: 3rem auto 0 auto;
  padding: 0 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 1.5rem;
  }
`;

const AboutSection = styled.div`
  flex: 2;
`;

const ProfileSection = styled.div`
  flex: 2;
  border-left: 2px solid #bbb;
  padding-left: 2.5rem;
  @media (max-width: 900px) {
    border-left: none;
    padding-left: 0;
    border-top: 2px solid #bbb;
    padding-top: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Satoshi', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
`;

const AboutText = styled.p`
  font-family: 'Satoshi', sans-serif;
  font-size: 1.15rem;
  color: #222;
  line-height: 1.5;
`;

const ProfileHighlights = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem 2.5rem;
  font-family: 'Satoshi', sans-serif;
  font-size: 1.15rem;
  color: #222;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const HighlightLabel = styled.span`
  font-weight: 700;
`;

const HighlightValue = styled.span`
  font-weight: 400;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin: 3rem 0 5rem 0;
  @media (max-width: 900px) {
    flex-direction: row;
    gap: 1rem;
    margin: 2rem 1rem 3rem 1rem;
    justify-content: space-between;
  }
`;

const ActionButton = styled.button`
  background: #111;
  color: #fff;
  font-family: 'Satoshi', sans-serif;
  font-size: 1.15rem;
  border: none;
  border-radius: 50px;
  padding: 1.2rem 2.8rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
  &:hover {
    background: #222;
  }
  
  @media (max-width: 900px) {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
    border-radius: 25px;
    flex: 1;
    min-width: 140px;
  }
`;

const BackButtonContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 2rem 0 2rem;
  @media (max-width: 900px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
`;

const BackButton = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 0.8rem 1.5rem;
  font-family: 'Satoshi', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  &:hover {
    background: #333;
    transform: translateY(-1px);
  }
  
  @media (max-width: 900px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    width: auto;
  }
`;

// Models data (should be moved to a shared file or fetched from backend in production)
// Removed static mock data; we now use backend fields directly.

export default function ModelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch model data from Convex backend
  const model = useQuery(api.models.getById, { id });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Build gallery from mainImage + categoryImages.* - ALWAYS call useEffect
  useEffect(() => {
    if (!model) return;
    const imgs = [
      model.mainImage,
      model.categoryImages?.casual,
      model.categoryImages?.formal,
      model.categoryImages?.sports,
      model.categoryImages?.evening,
      model.categoryImages?.commercial,
    ].filter(Boolean);
    setGalleryImages(imgs.length > 0 ? imgs : ['/images/placeholder-model.png']);
    setGalleryIndex(0);
  }, [model]);
  
  // Loading state
  if (model === undefined) {
    return (
      <DetailWrapper>
        <MainContent>
          <div style={{ padding: '4rem', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#666' }}>Loading model details...</div>
            <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </MainContent>
      </DetailWrapper>
    );
  }

  if (model === null) {
    return (
      <DetailWrapper>
        <MainContent>
          <div style={{ padding: '4rem', textAlign: 'center', width: '100%' }}>
            <h2>Model not found</h2>
            <ActionButton onClick={() => navigate('/models')}>Back to Catalogue</ActionButton>
          </div>
        </MainContent>
      </DetailWrapper>
    );
  }
  
  const handlePrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <DetailWrapper>
      <BackButtonContainer>
        <BackButton onClick={() => navigate('/models')}>
          <span>←</span>
          Back to Models
        </BackButton>
      </BackButtonContainer>
      <MainContent>
        <MainImageSection>
          <MainImage src={galleryImages[galleryIndex]} alt={model.name} />
          {galleryImages.length > 1 && (
            <ArrowNav>
              <ArrowButton onClick={handlePrev} aria-label="Previous">
                &#8592;
              </ArrowButton>
              <ArrowButton onClick={handleNext} aria-label="Next">
                &#8594;
              </ArrowButton>
            </ArrowNav>
          )}
        </MainImageSection>
        {galleryImages.length > 1 && (
        <GallerySection>
          {galleryImages.map((img, idx) => (
            <GalleryImage
              key={idx}
              src={img}
              alt={`Gallery look ${idx + 1}`}
              style={{ border: galleryIndex === idx ? '3px solid #111' : 'none' }}
              onClick={() => setGalleryIndex(idx)}
            />
          ))}
        </GallerySection>
        )}
      </MainContent>
      <InfoSection>
        <AboutSection>
          <SectionTitle>About {model.name}</SectionTitle>
          <AboutText>{model.bio || '—'}</AboutText>
        </AboutSection>
        <ProfileSection>
          <SectionTitle>Profile Highlights</SectionTitle>
          <ProfileHighlights>
            <div>
              <HighlightLabel>Name:</HighlightLabel> <HighlightValue>{model.name}</HighlightValue>
            </div>
            <div>
              <HighlightLabel>Height:</HighlightLabel> <HighlightValue>{model.highlights?.height || '—'}</HighlightValue>
            </div>
            <div>
              <HighlightLabel>Age Range:</HighlightLabel> <HighlightValue>{model.highlights?.ageRange || '—'}</HighlightValue>
            </div>
            <div>
              <HighlightLabel>Build:</HighlightLabel> <HighlightValue>{model.highlights?.build || '—'}</HighlightValue>
            </div>
            <div>
              <HighlightLabel>Skin Tone:</HighlightLabel> <HighlightValue>{model.highlights?.skinTone || '—'}</HighlightValue>
            </div>
            <div>
              <HighlightLabel>Ethnicity:</HighlightLabel> <HighlightValue>{model.highlights?.ethnicity || '—'}</HighlightValue>
            </div>
            <div style={{ gridColumn: '1 / span 2' }}>
              <HighlightLabel>Style Vibe:</HighlightLabel> <HighlightValue>{model.highlights?.styleVibe || '—'}</HighlightValue>
            </div>
            <div style={{ gridColumn: '1 / span 2' }}>
              <HighlightLabel>Features:</HighlightLabel> <HighlightValue>{model.highlights?.features || '—'}</HighlightValue>
            </div>
          </ProfileHighlights>
        </ProfileSection>
      </InfoSection>
      <ButtonRow>
        <ActionButton onClick={() => navigate('/models')}>Explore More Models</ActionButton>
        <ActionButton onClick={() => navigate('/contact')}>Book for Campaign</ActionButton>
      </ButtonRow>
    </DetailWrapper>
  );
}
