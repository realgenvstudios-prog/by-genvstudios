import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const NavbarContainer = styled.nav`
  width: 100%;
  background: #EAEAEA;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: none;
`;

const NavbarContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 3rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 56px;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  transition: transform 0.2s cubic-bezier(.4,0,.2,1), box-shadow 0.2s cubic-bezier(.4,0,.2,1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  
  @media (max-width: 768px) {
    height: 32px;
  }
`;

const LogoText = styled(Link)`
  font-size: 1.15rem;
  font-weight: 700;
  text-decoration: none;
  color: #111;
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 0.5px;
  &:hover {
    color: #111;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 0.3px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  color: ${({ $active }) => ($active ? '#000' : '#aaa')};
  text-decoration: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 400;
  padding: 0 0.25rem;
  position: relative;
  transition: color 0.2s;
  &:hover {
    color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    white-space: nowrap;
    padding: 0 0.2rem;
  }
`;

const Divider = styled.span`
  display: inline-block;
  width: 1px;
  height: 22px;
  background: #222;
  margin: 0 0.6rem;
  opacity: 0.5;
`;

const ContactLink = styled(Link)`
  font-size: 1rem;
  color: ${({ $active }) => ($active ? '#000' : '#aaa')};
  text-decoration: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  transition: color 0.2s;
  padding-right: 0.5rem;
  &:hover {
    color: #000;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 4px;
  svg {
    width: 100%;
    height: 100%;
    stroke: #111;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  outline: none;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 20px;
  }
`;

const HamburgerLine = styled.span`
  width: 100%;
  height: 2px;
  background: #111;
  margin: 2px 0;
  transition: all 0.3s ease;
  transform-origin: center;
  
  ${({ $isOpen }) => $isOpen && `
    &:first-child {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:last-child {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `}
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #EAEAEA;
    border-top: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: #111;
  text-decoration: none;
  font-family: 'Times New Roman', Times, serif;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const BottomBorder = styled.div`
  width: 100%;
  height: 2px;
  background: #222;
  opacity: 0.25;
  position: absolute;
  bottom: 0;
  left: 0;
`;

function Navbar() {
  // Hover state for desktop nav link highlight
  const [hovered, setHovered] = useState(null);
  // Mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Fetch site settings from database
  const settings = useQuery(api.settings.get);
  
  const renderLogo = () => {
    return (
      <LogoText to="/">BY GENVSTUDIOS</LogoText>
    );
  };
  // navItems: key for each nav link
  const navItems = [
    { key: 'home', label: 'Home', to: '/' },
    { key: 'about', label: 'About', to: '/about' },
    { key: 'models', label: 'Models', to: '/models' },
    { key: 'blog', label: 'Blog', to: '/blog' },
  ];

  return (
    <NavbarContainer>
          <NavbarContent>
      {renderLogo()}
        <NavLinks>
          {navItems.map((item, idx) => (
            <>
              <NavLink
                key={item.key}
                to={item.to}
                $active={hovered === item.key || hovered === null}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.label}
              </NavLink>
              {idx < navItems.length - 1 && <Divider />}
            </>
          ))}
        </NavLinks>
        <ContactLink
          to="/contact"
          $active={hovered === 'contact' || hovered === null}
          onMouseEnter={() => setHovered('contact')}
          onMouseLeave={() => setHovered(null)}
        >
          Contact Us
          <ArrowIcon>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" />
            </svg>
          </ArrowIcon>
        </ContactLink>
        
        <HamburgerButton 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <HamburgerLine $isOpen={mobileMenuOpen} />
          <HamburgerLine $isOpen={mobileMenuOpen} />
          <HamburgerLine $isOpen={mobileMenuOpen} />
        </HamburgerButton>
      </NavbarContent>
      
      <MobileMenu $isOpen={mobileMenuOpen}>
        {navItems.map((item) => (
          <MobileNavLink
            key={item.key}
            to={item.to}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </MobileNavLink>
        ))}
        <MobileNavLink
          to="/contact"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact Us
        </MobileNavLink>
      </MobileMenu>
      
      <BottomBorder />
    </NavbarContainer>
  );
}

export default Navbar;