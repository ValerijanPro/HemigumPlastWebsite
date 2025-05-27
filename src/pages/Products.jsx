import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/globalStyles';
import { loadProducts, loadAllImages } from '../services/api';

const ProductsContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 200px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 8rem 1rem 1rem 1rem;
  }
`;

const CategorySidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  background-color: ${colors.secondary};
  border-radius: ${borderRadius.medium};
  padding: 1rem;
  height: fit-content;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  border-radius: ${borderRadius.small};
  transition: ${transitions.default};
  font-size: 1.1rem;
  font-weight: ${props => props.active ? 600 : 400};
  color: ${props => props.active ? colors.primary : colors.primary}80;
  background-color: ${props => props.active ? `${colors.primary}20` : 'transparent'};

  &:hover {
    background-color: ${colors.primary}20;
    color: ${colors.primary};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CategoryHeader = styled.div`
  background-color: ${colors.secondary};
  border-radius: ${borderRadius.medium};
  padding: 0 1.5rem;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${colors.primary};
`;

const CategoryDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${colors.primary};
`;

const ProductGallery = styled.div`
  position: relative;
  background-color: ${colors.secondary};
  border-radius: ${borderRadius.medium};
  padding: 0;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
`;

const GalleryItem = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
`;

const ImageError = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
`;

const MissingContent = styled.div`
  color: ${colors.primary};
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

const ProductNavigation = styled.div`
  display: flex;
  gap: 16rem;
  justify-content: center;
`;

const ProductNavigationButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${borderRadius.medium};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.default};
  min-width: 200px;

  &:hover {
    background-color: ${colors.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: ${transitions.default};
  z-index: 2;

  &:hover {
    background-color: ${colors.hover};
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const BackButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  padding: 1rem 1.5rem;
  border-radius: ${borderRadius.medium};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px #0001;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${colors.hover};
    box-shadow: 0 4px 16px #0002;
    transform: translateY(-2px) scale(1.03);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(250px, 1fr);
  }
`;

const CategoryCard = styled.div`
  background-color: #f5f5f7;
  border-radius: 24px;
  padding: 2rem;
  cursor: pointer;
  transition: ${transitions.default};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 2px 12px #0002;
  border: 1px solid ${colors.secondary};
  height: 100px;
  width: 100%;
  max-width: 300px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;

  @media (max-width: 1900px) {
    height: 75px;
    max-width: 300px;
    padding: 1.2rem;
  }

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 6px 24px #0003;
    background-color: ${colors.secondary};
  }
`;

const CategoryCardTitle = styled.h2`
  font-size: 1.8rem;
  color: ${colors.primary};
  margin: 0;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1900px) {
    font-size: 1.4rem;
  }
`;

const CategoryCardDescription = styled.p`
  font-size: 1.5rem;
  color: ${colors.primary}80;
  margin: 0;
  line-height: 1.5;
`;

const Products = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [watermarkLogo, setWatermarkLogo] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsData, imagesData] = await Promise.all([
          loadProducts(),
          loadAllImages()
        ]);
        setCategories(productsData.categories);
        if (imagesData.watermark_logo) {
          setWatermarkLogo(imagesData.watermark_logo);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setImageErrors({});
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleImageError = (imageUrl) => {
    setImageErrors(prev => ({
      ...prev,
      [imageUrl]: true
    }));
  };

  const getProductImages = (category) => {
    // Only use Serbian images if the current language is Serbian
    if (i18n.language === 'sr') {
      return category.products['sr'] || [];
    }
    // For English, only use English images
    return category.products['en'] || [];
  };

  const hasImages = selectedCategory?.products?.[i18n.language]?.length > 0;

  const getCategoryName = (category) => {
    return i18n.language === 'sr' ? category.category_name_ser : category.category_name_eng;
  };

  const getCategoryText = (category) => {
    return i18n.language === 'sr' ? category.category_text_ser : category.category_text_eng;
  };

  const getImageUrl = (url) => {
    if (url.includes('staticflickr.com')) {
      return url;
    }
    const fileId = url.split('id=')[1];
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : url;
  };

  if (selectedCategory) {
    const productImages = getProductImages(selectedCategory);
    
    return (
      <ProductsContainer>
        <MainContent>
          <ProductGallery>
            <BackButton onClick={handleBack}>
              <span style={{display:'flex',alignItems:'center'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'8px'}}>
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('common.back')}
              </span>
            </BackButton>
            {selectedCategory.category_image && (
              <GalleryItem style={{ marginBottom: '2rem', maxWidth: '30%', margin: '0 auto 2rem auto' }}>
                <GalleryImage
                  src={getImageUrl(selectedCategory.category_image)}
                  alt={getCategoryName(selectedCategory)}
                  onError={() => handleImageError(selectedCategory.category_image)}
                  style={{ width: '100%', height: 'auto' }}
                />
              </GalleryItem>
            )}
            <CategoryCardDescription style={{margin: '0 auto 2rem auto', maxWidth: '700px', textAlign: 'center', color: 'black'}}>
              {getCategoryText(selectedCategory)}
            </CategoryCardDescription>
            {selectedCategory[`additional_table_${i18n.language === 'sr' ? 'ser' : 'en'}`] && (
              <GalleryItem style={{ marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translateX(32px)' }}>
                <GalleryImage
                  src={getImageUrl(selectedCategory[`additional_table_${i18n.language === 'sr' ? 'ser' : 'en'}`])}
                  alt={`${getCategoryName(selectedCategory)} - Additional Table`}
                  onError={() => handleImageError(selectedCategory[`additional_table_${i18n.language === 'sr' ? 'ser' : 'en'}`])}
                  style={{ width: '100%', height: 'auto' }}
                />
              </GalleryItem>
            )}
            {hasImages ? (
              <GalleryGrid>
                {productImages.map((imageUrl, index) => (
                  <GalleryItem key={index} style={{ position: 'relative' }}>
                    {!imageErrors[imageUrl] ? (
                      <>
                        <GalleryImage
                          src={getImageUrl(imageUrl)}
                          alt={`${getCategoryName(selectedCategory)} - Image ${index + 1}`}
                          onError={() => handleImageError(imageUrl)}
                        />
                        {watermarkLogo && (
                          <img 
                            src={getImageUrl(watermarkLogo)} 
                            alt="Watermark"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '100%',
                              height: 'auto',
                              opacity: 0.05,
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <ImageError>
                        Failed to load image
                      </ImageError>
                    )}
                  </GalleryItem>
                ))}
              </GalleryGrid>
            ) : (
              <MissingContent>No images available for this category</MissingContent>
            )}
          </ProductGallery>
        </MainContent>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <MainContent>
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              onClick={() => handleCategorySelect(category)}
            >
              <CategoryCardTitle>
                {getCategoryName(category)}
              </CategoryCardTitle>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </MainContent>
    </ProductsContainer>
  );
};

export default Products; 