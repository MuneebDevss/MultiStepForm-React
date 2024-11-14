import React from 'react';

export const ProfessionalInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validateField(name, value);
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
  
    // Create a new skills array based on whether the checkbox is checked or unchecked
    const skills = checked
      ? [...formData.skills, value]       // Add skill if checkbox is checked
      : formData.skills.filter(skill => skill !== value); // Remove skill if unchecked
  
    updateFormData({ skills });
    validateField('skills', skills);
  };
  

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'occupation':
        if (value === 'other' && !formData.otherOccupation) {
          error = 'Please specify your occupation';
        }
        break;
      case 'yearsOfExperience':
        const years = parseInt(value);
        const birthYear = new Date(formData.dateOfBirth).getFullYear();
        const maxYears = new Date().getFullYear() - birthYear - 18;
        if (isNaN(years) || years < 0) {
          error = 'Years of experience must be a non-negative number';
        } else if (years > maxYears) {
          error = `Years of experience cannot exceed ${maxYears}`;
        }
        break;
      case 'skills':
        if (value.length < 2) {
          error = 'Please select at least 2 skills';
        } else if (value.length > 10) {
          error = 'You can select up to 10 skills';
        }
        break;
      case 'linkedinProfile':
        if (value && !/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/.test(value)) {
          error = 'Please enter a valid LinkedIn URL';
        }
        break;
      case 'portfolioWebsite':
        if (value && !/^https?:\/\/.*$/.test(value)) {
          error = 'Please enter a valid URL';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Professional Information</h2>
      <div className="mb-4">
        <label htmlFor="occupation" className="block mb-2">Current Occupation</label>
        <select
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Occupation</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
        </select>
        {formData.occupation === 'other' && (
          <input
            type="text"
            name="otherOccupation"
            value={formData.otherOccupation}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            placeholder="Please specify"
            required
          />
        )}
        {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="yearsOfExperience" className="block mb-2">Years of Experience</label>
        <input
          type="number"
          id="yearsOfExperience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
        {errors.yearsOfExperience && <p className="text-red-500">{errors.yearsOfExperience}</p>}
      </div>
      <div className="mb-4">
  <label className="block mb-2">Skills (select 2-10)</label>
  <div className="grid grid-cols-2 gap-2">
    {['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS'].map(skill => (
      <label key={skill} className="flex items-center">
        <input
          type="checkbox"
          name="skills"
          value={skill.toLowerCase()}
          checked={formData.skills.includes(skill.toLowerCase())}
          onChange={handleSkillChange}
          className="mr-2"
        />
        {skill}
      </label>
    ))}
  </div>
  {errors.skills && <p className="text-red-500">{errors.skills}</p>}
</div>

      <div className="mb-4">
        <label htmlFor="linkedinProfile" className="block mb-2">LinkedIn Profile (Optional)</label>
        <input
          type="url"
          id="linkedinProfile"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="https://www.linkedin.com/in/yourprofile"
        />
        {errors.linkedinProfile && <p className="text-red-500">{errors.linkedinProfile}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="portfolioWebsite" className="block mb-2">Portfolio Website (Optional)</label>
        <input
          type="url"
          id="portfolioWebsite"
          name="portfolioWebsite"
          value={formData.portfolioWebsite}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="https://www.yourportfolio.com"
        />
        {errors.portfolioWebsite && <p className="text-red-500">{errors.portfolioWebsite}</p>}
      </div>
    </div>
  );
};