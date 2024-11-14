import React from 'react';

export const AccountPreferences = ({ formData, updateFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name.startsWith('notifications.')) {
        const notificationKey = name.split('.')[1];
        updateFormData({
          notifications: {
            ...formData.notifications,
            [notificationKey]: checked
          }
        });
      } else {
        updateFormData({ [name]: checked });
      }
    } else {
      updateFormData({ [name]: value });
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'username':
        if (value.length < 5 || value.length > 20) {
          error = 'Username must be between 5 and 20 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain alphanumeric characters and underscores';
        }
        // Here you would typically check if the username is unique
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          error = 'Password must contain uppercase, lowercase, number, and special character';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Account Preferences</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Notification Preferences</h3>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            name="notifications.email"
            checked={formData.notifications.email}
            onChange={handleChange}
            className="mr-2"
          />
          Email notifications
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            name="notifications.sms"
            checked={formData.notifications.sms}
            onChange={handleChange}
            className="mr-2"
          />
          SMS notifications
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            name="notifications.marketing"
            checked={formData.notifications.marketing}
            onChange={handleChange}
            className="mr-2"
          />
          Marketing communications
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mr-2"
            required
          />
          I accept the Terms and Conditions
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleChange}
            className="mr-2"
            required
          />
          I accept the Privacy Policy
        </label>
      </div>
    </div>
  );
};