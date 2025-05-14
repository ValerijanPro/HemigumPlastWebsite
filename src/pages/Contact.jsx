import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/globalStyles';
import { sendContactForm, loadAllImages } from '../services/api';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BuildingImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: ${borderRadius.medium};
  margin-bottom: 3rem;
  box-shadow: ${shadows.medium};
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${colors.primary};
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 600px;
  font-size: 1.1rem;
  font-weight: 500;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const InfoText = styled.span`
  color: ${colors.primary};
  font-size: 1.1rem;
  font-weight: 500;
`;

const MapButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${borderRadius.medium};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.default};
  margin-top: 1rem;

  &:hover {
    background-color: ${colors.hover};
  }
`;



const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    message_title: '',
    message_body: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [buildingImage, setBuildingImage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await loadAllImages();
        if (images.building_image) {
          setBuildingImage(images.building_image);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    fetchImages();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = t('contact.errors.name');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    if (!formData.message_title.trim()) {
      newErrors.message_title = t('contact.errors.title');
    }
    if (!formData.message_body.trim()) {
      newErrors.message_body = t('contact.errors.message');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading', message: t('contact.sending') });

    try {
      await sendContactForm(formData);
      setStatus({ type: 'success', message: t('contact.success') });
      setFormData({
        customer_name: '',
        email: '',
        message_title: '',
        message_body: ''
      });
      setErrors({});
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.error') });
    }
  };

  return (
    <ContactContainer>
      {buildingImage && (
        <BuildingImage src={buildingImage} alt={t('contact.building')} />
      )}

      <ContactContent>
        <Title>{t('contact.title')}</Title>
        <Description>{t('contact.description')}</Description>

        <ContactInfo>
          <InfoItem>
            <Icon>📍</Icon>
            <InfoText>{t('contact.address')}</InfoText>
          </InfoItem>
          <InfoItem>
            <Icon>📞</Icon>
            <InfoText>{t('contact.phone')}</InfoText>
          </InfoItem>
          <InfoItem>
            <Icon>✉️</Icon>
            <InfoText>{t('contact.email')}</InfoText>
          </InfoItem>
          <MapButton 
            onClick={() => window.open('https://maps.app.goo.gl/YKr1QvUt1kMVUZnQ7', '_blank')}
          >
            {t('contact.open_map')}
          </MapButton>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 