import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/globalStyles';
import { applyForJob } from '../services/api';

const CareerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const JobList = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
`;

const JobCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const JobImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const JobInfo = styled.div`
  padding: 2rem;
`;

const JobTitle = styled.h2`
  color: #585858;
  margin-bottom: 1rem;
`;

const JobDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ApplyButton = styled.button`
  background-color: #585858;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #585858;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #585858;
  }
`;

const PositionField = styled(Input)`
  background-color: #f5f5f5;
  color: #585858;
  font-weight: 500;
  cursor: not-allowed;
`;

const SubmitButton = styled.button`
  background-color: #585858;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #585858;
`;

const StatusMessage = styled.p`
  color: ${props => props.type === 'success' ? colors.success : props.type === 'error' ? colors.error : colors.primary};
  margin-top: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: ${colors.secondary};
  margin-bottom: 2rem;
`;

const ApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled(SubmitButton)`
  background-color: #e0e0e0;
  color: #585858;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

const Career = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    position_name: '',
    phone_number: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Example job listings - replace with actual jobs
  const jobs = [
    {
      id: 1,
      title_ser: 'Mašinski Tehničar',
      title_eng: 'Mechanical Technician',
      image: 'src/assets/logos/job1.png',
      description_ser: 'Tražimo iskusnog mašinskog tehničara za rad na proizvodnji gumenih delova...',
      description_eng: 'We are looking for an experienced mechanical technician to work on rubber parts production...'
    },
    {
      id: 2,
      title_ser: 'Tehnolog Proizvodnje',
      title_eng: 'Production Technologist',
      image: 'src/assets/logos/job2.jpg',
      description_ser: 'Tražimo tehnologa proizvodnje sa iskustvom u oblasti gumenih proizvoda...',
      description_eng: 'We are looking for a production technologist with experience in rubber products...'
    }
  ];

  const getJobTitle = (job) => {
    return i18n.language === 'sr' ? job.title_ser : job.title_eng;
  };

  const getJobDescription = (job) => {
    return i18n.language === 'sr' ? job.description_ser : job.description_eng;
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData(prev => ({
      ...prev,
      position_name: getJobTitle(job)
    }));
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone_number') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Format the phone number as +XXX XXX XXX XXX
      let formattedNumber = '';
      if (digitsOnly.length > 0) {
        formattedNumber = '+' + digitsOnly.slice(0, 3);
        if (digitsOnly.length > 3) {
          formattedNumber += ' ' + digitsOnly.slice(3, 6);
        }
        if (digitsOnly.length > 6) {
          formattedNumber += ' ' + digitsOnly.slice(6, 9);
        }
        if (digitsOnly.length > 9) {
          formattedNumber += ' ' + digitsOnly.slice(9, 12);
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if the number has between 9 and 12 digits
    return digitsOnly.length >= 9 && digitsOnly.length <= 12;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(formData.phone_number)) {
      setStatus({ 
        type: 'error', 
        message: i18n.language === 'sr' 
          ? 'Unesite validan broj telefona (9-12 cifara)' 
          : 'Please enter a valid phone number (9-12 digits)'
      });
      return;
    }

    setStatus({ type: 'loading', message: t('career.sending') });

    try {
      await applyForJob(formData);
      setStatus({ type: 'success', message: t('career.success') });
      setFormData({
        customer_name: '',
        email: '',
        position_name: '',
        phone_number: ''
      });
    } catch (error) {
      setStatus({ type: 'error', message: t('career.error') });
    }
  };

  return (
    <CareerContainer>
      <Title>{t('career.title')}</Title>
      <Description>{t('career.description')}</Description>

      <JobList>
        {jobs.map(job => (
          <JobCard key={job.id}>
            <JobImage src={job.image} alt={getJobTitle(job)} />
            <JobInfo>
              <JobTitle>{getJobTitle(job)}</JobTitle>
              <JobDescription>{getJobDescription(job)}</JobDescription>
              <ApplyButton onClick={() => handleApply(job)}>
                {t('career.apply')}
              </ApplyButton>
            </JobInfo>
          </JobCard>
        ))}
      </JobList>

      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <h2>{t('career.applyFor')} {getJobTitle(selectedJob)}</h2>
            <ApplicationForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="customer_name">{t('career.form.name')}</Label>
                <Input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">{t('career.form.email')}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="position_name">{t('career.form.position')}</Label>
                <PositionField
                  type="text"
                  id="position_name"
                  name="position_name"
                  value={getJobTitle(selectedJob)}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone_number">{t('career.form.phone')}</Label>
                <Input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+381 XXX XXX XXX"
                  required
                />
              </FormGroup>
              {status.message && (
                <StatusMessage type={status.type}>
                  {status.message}
                </StatusMessage>
              )}
              <ButtonGroup>
                <SubmitButton type="submit" disabled={status.type === 'loading'}>
                  {status.type === 'loading' ? t('career.sending') : t('career.apply')}
                </SubmitButton>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  {t('common.cancel')}
                </CancelButton>
              </ButtonGroup>
            </ApplicationForm>
          </ModalContent>
        </Modal>
      )}
    </CareerContainer>
  );
};

export default Career; 