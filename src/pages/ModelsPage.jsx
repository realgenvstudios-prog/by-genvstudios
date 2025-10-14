import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const HeroSection = styled.section`
  width: 100vw;
  min-height: 45vh;
  background: #EAEAEA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
    padding-top: 7rem;
  padding-bottom: 0.2rem;
  margin: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 4rem 1.5rem 1.5rem 1.5rem;
    min-height: 35vh;
    box-sizing: border-box;
  }
`;

const MainHeading = styled(motion.h1)`
  font-family: 'Canela Text', serif;
  font-size: clamp(2.2rem, 4vw, 3rem);
  margin-bottom: 1.2rem;
  line-height: 1.1;
  font-weight: normal;
  max-width: 700px;
`;

const SubtextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Subtext = styled(motion.p)`
  font-family: 'Satoshi', sans-serif;
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  line-height: 1.2;
  color: #111;
  margin: 0;
`;

const ModelsGridSection = styled.section`
  width: 100vw;
  background: #EAEAEA;
  padding: 0.2rem 0 4rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1.5rem 4rem 1.5rem;
    box-sizing: border-box;
  }
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.1rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem auto 0 auto;
  }
`;

const ModelCard = styled.div`
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.1rem 1.2rem 1rem;
  min-height: 420px;
  position: relative;
  justify-content: center;
  
  @media (max-width: 768px) {
    height: 360px;
    min-height: 360px;
    max-height: 360px;
    padding: 1.5rem 1rem 1rem;
    border-radius: 28px;
    justify-content: space-between;
  }
`;

const ModelImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  background: #fff;
  
  &[data-loading="true"] {
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const ModelInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Satoshi', sans-serif;
  font-size: 1rem;
  color: #111;
  margin-bottom: 1.1rem;
  
  @media (max-width: 768px) {
    gap: 0.6rem;
    font-size: 0.9rem;
    margin: 0;
    flex-shrink: 0;
    padding: 0.5rem 0;
  }
`;

const Divider = styled.span`
  width: 2px;
  height: 20px;
  background: #ccc;
`;

const ModelTagline = styled.span`
  font-family: 'Satoshi', sans-serif;
  font-size: 0.85rem;
  color: #222;
  opacity: 0.9;
`;

const ViewIconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #fff;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  @media (max-width: 768px) {
    top: 0.8rem;
    right: 0.8rem;
    padding: 0.6rem;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ViewIcon = styled.div`
  width: 24px;
  height: 24px;
  svg {
    width: 100%;
    height: 100%;
    fill: #333;
  }
`;

function ModelsPage() {
  const navigate = useNavigate();
  
  // Fetch models from Convex backend
  const modelsData = useQuery(api.models.getAll);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [search, setSearch] = React.useState("");
  const [ageFilter, setAgeFilter] = React.useState("");
  const [styleFilter, setStyleFilter] = React.useState("");
  
  // Use backend data or fallback to empty array while loading
  const models = modelsData || [];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleViewModel = (id) => {
    navigate(`/models/${id}`);
  };

  // Filtering logic
  const filteredModels = models.filter(model => {
    const matchesSearch =
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesAge = ageFilter ? model.age === Number(ageFilter) : true;
    const matchesStyle = styleFilter ? model.tagline.toLowerCase().includes(styleFilter.toLowerCase()) : true;
    return matchesSearch && matchesAge && matchesStyle;
  });

  return (
    <>
      <HeroSection>
        <MainHeading
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Collection.
        </MainHeading>
        <SubtextContainer>
          <Subtext
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Real, unreal all equally human.
          </Subtext>
          <Subtext
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Choose your muse.
          </Subtext>
          <Subtext
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Build your world.
          </Subtext>
        </SubtextContainer>
      </HeroSection>

      <ModelsGridSection>
        <div
          style={{
            background: '#fff',
            borderRadius: '32px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            padding: '1.2rem 2.2rem',
            maxWidth: '800px',
            margin: '0 auto 2.2rem auto',
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
          className="filter-container"
        >
          <style>{`
            .filter-input {
              padding: 0.7rem 1.2rem;
              border-radius: 18px;
              border: 1px solid #ccc;
              font-size: 1rem;
              font-family: 'Satoshi', sans-serif;
              color: #111;
              background: #fff;
              box-shadow: none;
              outline: none;
              transition: border-color 0.2s;
              min-height: 44px;
            }
            @media (max-width: 768px) {
              .filter-input {
                min-height: 36px !important;
              }
            }
            .filter-input:focus {
              border-color: #bbb;
              outline: none;
            }
            .filter-container {
              @media (max-width: 768px) {
                flex-direction: row !important;
                padding: 0.5rem 0.8rem !important;
                gap: 0.8rem !important;
                margin: 0 0 1rem 0 !important;
                border-radius: 16px !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                flex-wrap: wrap !important;
                justify-content: space-between !important;
              }
            }
            @media (max-width: 768px) {
              .filter-input {
                width: auto !important;
                min-width: 85px !important;
                max-width: 125px !important;
                font-size: 0.8rem;
                padding: 0.4rem 0.6rem;
                border-radius: 12px;
                flex: 1;
                min-height: 36px;
              }
            }
          `}</style>
          <input
            className="filter-input"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: '220px' }}
          />
          <input
            className="filter-input"
            type="number"
            placeholder="Age"
            value={ageFilter}
            onChange={e => setAgeFilter(e.target.value)}
            style={{ minWidth: '100px' }}
          />
          <input
            className="filter-input"
            type="text"
            placeholder="Style"
            value={styleFilter}
            onChange={e => setStyleFilter(e.target.value)}
            style={{ minWidth: '180px' }}
          />
        </div>
        {!modelsData ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Loading models...</div>
            <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
        <ModelsGrid>
          {filteredModels.slice(0, visibleCount).map(model => (
            <ModelCard key={model._id}>
              <ModelImage src={model.mainImage || '/images/placeholder-model.png'} alt={model.name} />
              <ModelInfoRow>
                <span>{model.name}</span>
                <Divider />
                <span>{model.age}</span>
                <Divider />
                <ModelTagline>{model.tagline}</ModelTagline>
              </ModelInfoRow>
              <ViewIconWrapper onClick={() => handleViewModel(model._id)} title="View details">
                <ViewIcon>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-4.418 0-8-3.582-8-5s3.582-5 8-5 8 3.582 8 5-3.582 5-8 5zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </ViewIcon>
              </ViewIconWrapper>
            </ModelCard>
          ))}
        </ModelsGrid>
        )}
        {modelsData && visibleCount < filteredModels.length && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              style={{
                padding: '0.8rem 2.2rem',
                borderRadius: '24px',
                background: '#111',
                color: '#fff',
                fontFamily: 'Satoshi, sans-serif',
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              className="load-more-btn"
              onClick={handleLoadMore}
            >
              Load More
            </button>
            <style jsx>{`
              @media (max-width: 768px) {
                .load-more-btn {
                  width: 80% !important;
                  max-width: 300px !important;
                  padding: 1rem 2rem !important;
                  font-size: 1.1rem !important;
                  min-height: 50px !important;
                }
              }
            `}</style>
          </div>
        )}
      </ModelsGridSection>
    </>
  );
}

export default ModelsPage;