const API_BASE_URL = 'https://digimont-b0236e96b22c.herokuapp.com/django';

// Load all images
export const loadAllImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hmgp_load_all_images`);
    if (!response.ok) {
      throw new Error('Failed to load images');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading images:', error);
    throw error;
  }
};

// Load all products
export const loadProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hmgp_products`);
    if (!response.ok) {
      throw new Error('Failed to load products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading products:', error);
    throw error;
  }
};

// Send contact form
export const sendContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hmgp_contact_us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to send contact form');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};

// Apply for job
export const applyForJob = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hmgp_apply_for_job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to submit job application');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
}; 