import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #EAEAEA;
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
  margin-top: 64px; /* Height of navbar */
  
  @media (max-width: 768px) {
    margin-top: 56px; /* Mobile navbar height */
  }
`;

function Layout() {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
