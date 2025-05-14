import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { colors, typography, spacing, shadows, transitions } from '../styles/globalStyles';
import logo from '../assets/logos/hemigumplast-logo3.png';

const FooterContainer = styled.footer`
  background-color: ${colors.primary};
  color: white;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 35px;
`;

const FooterContent = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLogo = styled.img`
  width: auto;
  height: 55px;
  object-fit: contain;
  transform: scale(0.9);
  /*background-color: white;*/
  padding: 5px 20px;
  border-radius: 4px;
  margin-left: -20px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  opacity: 0.8;
  font-size: 0.8rem;
  white-space: nowrap;
`;

const Icon = styled.span`
  font-size: 0.9rem;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo src={logo} alt="Hemigumplast Logo" />
        <ContactInfo>
          <ContactItem>
            <Icon>📍</Icon>
            <span>{t('footer.address')}</span>
          </ContactItem>
          <ContactItem>
            <Icon>📞</Icon>
            <span>{t('footer.phone')}</span>
          </ContactItem>
          <ContactItem>
            <Icon>✉️</Icon>
            <span>{t('footer.email')}</span>
          </ContactItem>
        </ContactInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 