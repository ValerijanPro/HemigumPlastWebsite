import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { colors, typography } from '../styles/globalStyles';
import { loadAllImages } from '../services/api';

// Single full-screen container with background image
const FullScreenContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 35px); /* Subtract footer height */
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; /* Prevent scrolling */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  }
`;

// Centered text content
const CenteredContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 2rem;
  max-width: 1200px;
  width: 90%;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 2rem;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await loadAllImages();
        if (data.building_image) {
          setBackgroundImage(data.building_image);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    fetchImages();

    // Prevent scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <Global 
        styles={css`
          html, body {
            overflow: hidden !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}
      />
      <FullScreenContainer bgImage={backgroundImage}>
        <CenteredContent>
          <Title>{t('home.hero.title')}</Title>
          <Subtitle>{t('home.hero.subtitle')}</Subtitle>
        </CenteredContent>
      </FullScreenContainer>
    </>
  );
};

export default Home; 