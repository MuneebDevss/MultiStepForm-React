import React from 'react';

export const PersonalInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'File size must not exceed 5MB' }));
      } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors(prev => ({ ...prev, profilePicture: 'Only JPG and PNG files are allowed' }));
      } else {
        updateFormData({ profilePicture: file });
        setErrors(prev => ({ ...prev, profilePicture: null }));
      }
    }
  };

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 2 || value.length > 50) {
          error = 'Must be between 2 and 50 characters';
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = 'Only alphabetic characters are allowed';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Invalid email format';
        } else if (/\b(temporary|disposable)\b/.test(value)) {
          error = 'Temporary email domains are not allowed';
        }
        break;
      case 'dateOfBirth':
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          error = 'You must be at least 18 years old';
        } else if (birthDate > today) {
          error = 'Date of birth cannot be in the future';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-2">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block mb-2">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="profilePicture" className="block mb-2">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileChange}
          accept="image/jpeg,image/png"
          className={`w-full p-2 border rounded ${errors.profilePicture ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
      </div>
    </div>
  );
};