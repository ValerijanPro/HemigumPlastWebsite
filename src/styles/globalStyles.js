import { css } from '@emotion/react';

// Color Palette
export const colors = {
  primary: '#888888', // Less dark gray for footer and header
  secondary: '#d1d1d1', // Background color
  white: '#ffffff',
  black: '#000000',
  lightGray: '#f5f5f5',
  darkGray: '#333333',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  hover: '#777777', // Slightly darker for hover states
  shadow: 'rgba(0, 0, 0, 0.1)',
  print: '#aaaaa9' // Less bright color for print button
};

// Typography
export const typography = {
  fontFamily: {
    primary: "'Montserrat', sans-serif",
    secondary: "'Roboto', sans-serif",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.5rem',
  xl: '1rem',
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

// Transitions
export const transitions = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

// Breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Media Queries
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

// Common Styled Components
export const buttonStyles = css`
  background-color: ${colors.secondary};
  color: ${colors.white};
  border: none;
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.md};
  transition: all ${transitions.fast};
  
  &:hover {
    background-color: ${colors.hover};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.secondary}40;
  }
`;

export const cardStyles = css`
  background-color: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  overflow: hidden;
  transition: transform ${transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.lg};
  }
`;

export const sectionStyles = css`
  padding: ${spacing.xl} 0;
`;

export const containerStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.lg};
`;

export const headingStyles = css`
  color: ${colors.secondary};
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.lg};
`;

export const textStyles = css`
  color: ${colors.darkGray};
  font-family: ${typography.fontFamily.secondary};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.normal};
`;

// Global styles
export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${typography.fontFamily.secondary};
    font-size: 16px;
    line-height: ${typography.lineHeight.normal};
    color: ${colors.darkGray};
    background-color: ${colors.white};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.primary};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.secondary};
    margin-bottom: ${spacing.md};
  }
  
  h1 {
    font-size: ${typography.fontSize['4xl']};
    line-height: ${typography.lineHeight.tight};
  }
  
  h2 {
    font-size: ${typography.fontSize['3xl']};
    line-height: ${typography.lineHeight.tight};
  }
  
  h3 {
    font-size: ${typography.fontSize['2xl']};
    line-height: ${typography.lineHeight.tight};
  }
  
  p {
    margin-bottom: ${spacing.md};
  }
  
  a {
    color: ${colors.secondary};
    text-decoration: none;
    transition: color ${transitions.fast};
    
    &:hover {
      color: ${colors.hover};
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    cursor: pointer;
  }
`; 