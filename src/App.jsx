import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import styled from '@emotion/styled';
import { colors } from './styles/globalStyles';
import i18n from './i18n/config';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Career from './pages/Career';
import { MainContentWrapper } from './components/Header';

const AppContainer = styled.div`
  background-color: ${colors.secondary};
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px; // Footer height
`;

function App() {
  const [currentLang, setCurrentLang] = React.useState('sr');

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppContainer>
          <Header onLanguageChange={handleLanguageChange} currentLang={currentLang} />
          <MainContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/career" element={<Career />} />
            </Routes>
          </MainContentWrapper>
          <Footer />
        </AppContainer>
      </Router>
    </I18nextProvider>
  );
}

export default App; 