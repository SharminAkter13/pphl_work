import React, { useState, useEffect } from 'react';
import InputGroup from '../InputGroup'; 

const Form = ({ fields, onSubmit, initialData = {}, onCancel, submitLabel = 'Save' }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked }); 
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillChange = (skill) => {
    const currentSkills = formData.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    setFormData({ ...formData, skills: updatedSkills }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field => {
          if (field.type === 'radio') {
            return (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="flex space-x-4">
                  {field.options?.map(opt => (
                    <label key={opt.value} className="inline-flex items-center text-sm">
                      <input 
                        type="radio" 
                        name={field.name} 
                        value={opt.value} 
                        checked={formData[field.name] === opt.value} 
                        onChange={handleChange} 
                        className="mr-2" 
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === 'checkbox-group') {
            return (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="grid grid-cols-2 gap-2">
                  {field.options?.map(opt => (
                    <label key={opt.value} className="inline-flex items-center text-sm">
                      <input 
                        type="checkbox" 
                        checked={(formData.skills || []).includes(opt.value)} 
                        onChange={() => handleSkillChange(opt.value)} 
                        className="mr-2" 
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <InputGroup
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={field.type !== 'file' ? (formData[field.name] || '') : undefined}
              onChange={handleChange}
              required={field.required}
            />
          );
        })}
      </div>
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">{submitLabel}</button>
      </div>
    </form>
  );
};

export default Form;