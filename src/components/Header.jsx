import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/globalStyles';
import logo from '../assets/logos/hemigumplast-logo.png';
import html2canvas from 'html2canvas';

export const MainContentWrapper = styled.main`
  padding-top: 70px; // 50px header height + 20px extra space
  padding-bottom: 60px; // 40px footer height + 20px extra space
  min-height: calc(100vh - 90px); // 70px header + 40px footer
  color: ${colors.primary};

  /* Override for home page */
  .home-page & {
    color: inherit;
  }
`;

const HeaderContainer = styled.header`
  background-color: ${colors.primary};
  color: white;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 50px;
  box-shadow: ${shadows.md};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: ${transitions.default};
  padding: 0.5rem 2rem;
  background-color: ${colors.print};
  border-radius: 4px;
  border: none;
  min-width: 170px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: ${colors.hover};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 3rem;
  padding-left: 3rem;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled(Link)`
  background-color: ${colors.primary};
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  transition: ${transitions.default};
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: ${colors.hover};
  }
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.8;
  transition: ${transitions.default};

  &:hover {
    opacity: 1;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${colors.primary};
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: ${transitions.default};

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Header = ({ onLanguageChange, currentLang }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handlePrint = async () => {
    // 1) Scroll to top-left of viewport (so x/y offsets are correct)
    window.scrollTo(0, 0);
  
    // 2) Grab current scroll & viewport dimensions
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;
  
    // 3) Give lazy/CORS images a moment
    await new Promise(res => setTimeout(res, 200));
  
    // 4) Capture via html2canvas
    const canvas = await html2canvas(document.documentElement, {
      useCORS:        true,                    // allow cross-origin
      allowTaint:     false,
      backgroundColor: null,
      x:               scrollX,                // start capture at scrollX/Y
      y:               scrollY,
      width:           vw,                     // only viewport width
      height:          vh,                     // only viewport height
      windowWidth:     vw,                     // treat window as exactly vw×vh
      windowHeight:    vh,
      scrollX:         0,                      // no further internal offset
      scrollY:         0,
      scale:           window.devicePixelRatio // high-res capture
    });
  
    // 5) Open in print-preview
    const dataUrl = canvas.toDataURL("image/png");
    const printWin = window.open();
    if (printWin) {
      printWin.document.write(`
        <html>
          <head><title>Print Preview</title>
            <style>
              body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#fff; }
              img  { max-width:100vw; max-height:100vh; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWin.document.close();
    } else {
      // fallback download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "viewport.png";
      link.click();
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Nav>
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/about">{t('nav.about')}</NavLink>
          <NavLink to="/products">{t('nav.products')}</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
        </Nav>
        
        <RightSection>
          <Button as="button" onClick={handlePrint}>{t('buttons.print')}</Button>
          <LanguageButton onClick={() => onLanguageChange(currentLang === 'sr' ? 'en' : 'sr')}>
            {currentLang === 'sr' ? 'EN' : 'SR'}
          </LanguageButton>
          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </RightSection>
      </HeaderContent>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</MobileNavLink>
        <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</MobileNavLink>
        <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.products')}</MobileNavLink>
        <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 