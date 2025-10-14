import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { motion, useScroll } from 'framer-motion';
import styled from 'styled-components';

// Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ModelsPage from './pages/ModelsPage';
import ModelDetailPage from './pages/ModelDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import NotificationsPage from './pages/NotificationsPage.jsx';
import TestPage from './pages/TestPage';

// Global styles
const GlobalContainer = styled.div`
  font-family: 'Inter', sans-serif;
  color: #111;
  overflow-x: hidden;
`;

// Progress bar
const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #000;
  transform-origin: 0%;
  z-index: 1001;
`;

function AppContent() {
  const { scrollYProgress } = useScroll();
  // We no longer auto-redirect; navigation is manual
  return (
    <>
      <ProgressBar style={{ scaleX: scrollYProgress }} />
      <Routes>
        {/* Admin routes (standalone) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />

        {/* Public routes under shared Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="models/:id" element={<ModelDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GlobalContainer>
      <AppContent />
    </GlobalContainer>
  );
}

export default App;
