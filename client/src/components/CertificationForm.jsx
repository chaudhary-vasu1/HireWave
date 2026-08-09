import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

const CertificationForm = ({ data = [], onChange }) => {
  const addCertification = () => {
    const newCert = {
      title: '',
      issuer: '',
      year: ''
    };
    onChange([...data, newCert]);
  };

  const removeCertification = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data];
    const item = updated[index];
    if (typeof item === 'string') {
      updated[index] = { title: item, issuer: '', year: '', [field]: value };
    } else {
      updated[index] = { ...item, [field]: value };
    }
    onChange(updated);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            <Award className="size-5 text-sky-600" />
            Certifications & Licenses
          </h3>
          <p className='text-sm text-gray-500'>Add your professional certifications, licenses, and courses</p>
        </div>
        <button 
          onClick={addCertification} 
          className='flex items-center gap-2 px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors cursor-pointer'
        >
          <Plus className="size-4"/>
          Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Award className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
          <p>No certifications added yet.</p>
          <p className='text-sm'>Click "Add Certification" to add certificates and licenses.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((cert, index) => {
            const titleVal = typeof cert === 'string' ? cert : cert?.title || '';
            const issuerVal = typeof cert === 'string' ? '' : cert?.issuer || '';
            const yearVal = typeof cert === 'string' ? '' : cert?.year || cert?.date || '';

            return (
              <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white'>
                <div className='flex justify-between items-start'>
                  <h4 className='font-medium text-sm text-gray-800'>Certification #{index + 1}</h4>
                  <button 
                    onClick={() => removeCertification(index)} 
                    className='text-red-500 hover:text-red-700 transition-colors cursor-pointer p-1 rounded hover:bg-red-50'
                  >
                    <Trash2 className='size-4'/>
                  </button>
                </div>
                <div className='grid md:grid-cols-2 gap-3'>
                  <input 
                    value={titleVal} 
                    onChange={(e) => updateCertification(index, "title", e.target.value)} 
                    type="text" 
                    placeholder='Certification Name (e.g. AWS Certified Solutions Architect)' 
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none col-span-full'
                  />
                  <input 
                    value={issuerVal} 
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)} 
                    type="text" 
                    placeholder='Issuing Organization (e.g. Amazon Web Services)' 
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' 
                  />
                  <input 
                    value={yearVal} 
                    onChange={(e) => updateCertification(index, "year", e.target.value)} 
                    type="text" 
                    placeholder='Year / Date (e.g. 2023)' 
                    className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CertificationForm;
