import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logos/hemigumplast-logo3.png';
import { loadAllImages } from '../services/api';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 4rem;
`;

const Logo = styled.img`
  max-width: 500px;
  height: auto;
  margin: 0 auto;
`;

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #585858;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: justify;
`;

const CertificatesSection = styled.section`
  margin-top: 3rem;
`;

const CertificatesTitle = styled.h2`
  color: #585858;
  margin-bottom: 1.5rem;
`;

const About = () => {
  const { t, i18n } = useTranslation();
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    const fetchAboutText = async () => {
      try {
        const data = await loadAllImages();
        const text = i18n.language === 'sr' ? data.about_us_text_sr : data.about_us_text_en;
        setAboutText(text);
      } catch (error) {
        console.error('Error loading about text:', error);
      }
    };

    fetchAboutText();
  }, [i18n.language]);

  return (
    <AboutContainer>
      <Logo src={logo} alt="Hemigumplast Logo" />
      
      <ContentSection>
        <Title>{t('about.title')}</Title>
        <Text>
          {aboutText}
        </Text>

        <CertificatesSection>
          <CertificatesTitle>{t('about.certificates.title')}</CertificatesTitle>
          <Text>
            {t('about.certificates.description')}
          </Text>
        </CertificatesSection>
      </ContentSection>
    </AboutContainer>
  );
};

export default About; 