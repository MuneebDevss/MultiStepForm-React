import React, { useState, useEffect } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { ContactInfo } from './ContactInfo';
import { ProfessionalInfo } from './ProfessionalInfo';
import { AccountPreferences } from './AccountPreferences';
import { ProgressBar } from './ProgressBar';
import { ErrorSummary } from './ErrorSummary';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Notification } from './Notification';
import  FormSubmitted  from './FormSubmitted';


export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      profilePicture: null,
      phoneNumber: '',
      secondaryPhoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      occupation: '',
      yearsOfExperience: '',
      skills: [],
      linkedinProfile: '',
      portfolioWebsite: '',
      username: '',
      password: '',
      confirmPassword: '',
      notifications: {
        email: false,
        sms: false,
        marketing: false
      },
      termsAccepted: false,
      privacyAccepted: false
    };
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
      
    } else {
      setNotification({ type: 'error', message: 'Please fix the errors before proceeding.' });
    }
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const validateStep = () => {
    const stepErrors = {};
    let isValid = true;
    
    switch (step) {
      case 1:
        
        if (!formData.firstName) stepErrors.firstName = 'First name is required';
        if (!formData.lastName) stepErrors.lastName = 'Last name is required';
        if (!formData.email) stepErrors.email = 'Email is required';
        if (!formData.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!formData.phoneNumber) stepErrors.phoneNumber = 'Phone number is required';
        if (!formData.addressLine1) stepErrors.addressLine1 = 'Address is required';
        if (!formData.city) stepErrors.city = 'City is required';
        if (!formData.postalCode) stepErrors.postalCode = 'Postal code is required';
        if (!formData.country) stepErrors.country = 'Country is required';
        break;
      case 3:
        if (!formData.occupation) stepErrors.occupation = 'Occupation is required';
        if (!formData.yearsOfExperience) stepErrors.yearsOfExperience = 'Years of experience is required';
        if (formData.skills.length < 2) stepErrors.skills = 'At least 2 skills are required';
        break;
      case 4:
        if (!formData.username) stepErrors.username = 'Username is required';
        if (!formData.password) stepErrors.password = 'Password is required';
        if (!formData.confirmPassword) stepErrors.confirmPassword = 'Please confirm your password';
        if (!formData.termsAccepted) stepErrors.termsAccepted = 'You must accept the terms and conditions';
        if (!formData.privacyAccepted) stepErrors.privacyAccepted = 'You must accept the privacy policy';
        break;
      default:
        break;
    }
    const data= Object.entries(errors).filter(([field, error])=>
      (error!=null)
  );
  
  if(data.length===0)
  {
    isValid=true;
    setErrors({});
  }
  else
  {
    setErrors(stepErrors);
      isValid = false;
  }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setErrors({});
      setIsLoading(true);
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setNotification({ type: 'success', message: 'Form submitted successfully!' });
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
      } catch (error) {
        setNotification({ type: 'error', message: 'An error occurred while submitting the form.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setNotification({ type: 'error', message: 'Please fix the errors before submitting.' });
    }
  };

  const clearForm = () => {
    setShowConfirmation(true);
  };

  const confirmClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      profilePicture: null,
      phoneNumber: '',
      secondaryPhoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      occupation: '',
      yearsOfExperience: '',
      skills: [],
      linkedinProfile: '',
      portfolioWebsite: '',
      username: '',
      password: '',
      confirmPassword: '',
      notifications: {
        email: false,
        sms: false,
        marketing: false
      },
      termsAccepted: false,
      privacyAccepted: false
    });
    setStep(1);
    setErrors({});
    setShowConfirmation(false);
    setNotification({ type: 'success', message: 'Form cleared successfully.' });
  };

  const cancelClearForm = () => {
    setShowConfirmation(false);
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.keys(formData).filter(key => formData[key] !== '' && formData[key] !== null && formData[key] !== false).length;
    return (completedFields / totalFields) * 100;
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />;
      case 2:
        return <ContactInfo formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />;
      case 3:
        return <ProfessionalInfo formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />;
      case 4:
        return <AccountPreferences formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />;
      case 5:
        return <FormSubmitted/>
      default:
        return <div>Form completed!</div>;
    }
  };
  if(step<=4)
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Multi-Step Registration Form</h1>
      <ProgressBar progress={calculateProgress()} />
      <ErrorSummary errors={errors} />
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={
              Object.entries(errors).some(([field, error]) => error != null)
            }
          >
            Next Step
          </button>
          
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={isLoading || Object.entries(errors).some(([field, error]) => error != null)}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
      <button
        onClick={clearForm}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Form
      </button>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to clear the form? All data will be lost."
          onConfirm={confirmClearForm}
          onCancel={cancelClearForm}
        />
      )}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}