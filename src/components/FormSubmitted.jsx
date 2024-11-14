import React from 'react';

const FormSubmitted = () => {
  return (
    <div className="form-submitted-container" style={containerStyle}>
      <h2 style={headingStyle}>Form Submitted Successfully!</h2>
      <p style={paragraphStyle}>Thank you for filling out the form. We have received your submission.</p>
      <p style={paragraphStyle}>We will get back to you soon.</p>
    </div>
  );
};

// Inline styles for customization (optional)
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
};

const headingStyle = {
  color: '#28a745',
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
};

const paragraphStyle = {
  color: '#555',
  fontSize: '1rem',
};

export default FormSubmitted;
