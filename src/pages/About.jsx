import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logos/hemigumplast-logo3.png';

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
  const { t } = useTranslation();

  return (
    <AboutContainer>
      <Logo src={logo} alt="Hemigumplast Logo" />
      
      <ContentSection>
        <Title>{t('about.title')}</Title>
        <Text>
          {t('about.description')}
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