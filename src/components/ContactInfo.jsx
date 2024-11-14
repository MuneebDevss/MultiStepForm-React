import React from 'react';

export const ContactInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'phoneNumber':
        if (!/^\+?[\d\s-]{10,}$/.test(value)) {
          error = 'Invalid phone number format';
        }
        break;
      case 'addressLine1':
        if (value.length < 5) {
          error = 'Address must be at least 5 characters long';
        }
        break;
      case 'city':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'City name should not contain numbers';
        }
        break;
      case 'postalCode':
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = 'Invalid postal code format';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['phoneNumber', 'addressLine1', 'city', 'stateProvince', 'postalCode', 'country'];
    let isValid = true;

    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      // Submit form data
      console.log('Form submitted:', formData);
    } else {
      console.log('Form contains errors.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="secondaryPhoneNumber" className="block mb-2">Secondary Phone Number (Optional)</label>
        <input
          type="tel"
          id="secondaryPhoneNumber"
          name="secondaryPhoneNumber"
          value={formData.secondaryPhoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="addressLine1" className="block mb-2">Address Line 1</label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.addressLine1 && <p className="text-red-500">{errors.addressLine1}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="addressLine2" className="block mb-2">Address Line 2 (Optional)</label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block mb-2">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.city && <p className="text-red-500">{errors.city}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="stateProvince" className="block mb-2">State/Province</label>
        <select
          id="stateProvince"
          name="stateProvince"
          value={formData.stateProvince}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select State/Province</option>
          <option value="Punjab">Punjab</option>
          <option value="Sindh">Sindh</option>
          <option value="Balochistan">Balochistan</option>
          <option value="KPK">KPK</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="postalCode" className="block mb-2">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.postalCode && <p className="text-red-500">{errors.postalCode}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block mb-2">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Country</option>
          <option value="Pakistan">Pakistan</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Ireland">Ireland</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};
