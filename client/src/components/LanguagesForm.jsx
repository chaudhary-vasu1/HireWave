import React, { useState } from 'react';
import { Globe, Plus, X } from 'lucide-react';

const LanguagesForm = ({ data = [], onChange }) => {
  const [newLanguage, setNewLanguage] = useState("");

  const addLanguage = () => {
    if (newLanguage.trim() && !data.includes(newLanguage.trim())) {
      onChange([...data, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
          <Globe className="size-5 text-sky-600" />
          Languages
        </h3>
        <p className='text-sm text-gray-500'>Add languages you speak and your proficiency level</p>
      </div>

      <div className='flex gap-2'>
        <input 
          type="text" 
          placeholder='Enter a language (e.g. English - Fluent, Spanish - Native)' 
          className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none'
          onChange={(e) => setNewLanguage(e.target.value)} 
          value={newLanguage}
          onKeyDown={handleKeyPress}
        />

        <button 
          onClick={addLanguage} 
          disabled={!newLanguage.trim()} 
          className='flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        >
          <Plus className='size-4'/> Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {data.map((lang, index) => (
            <span key={index} className='flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100'>
              {lang}
              <button 
                onClick={() => removeLanguage(index)} 
                className="hover:bg-indigo-100 text-indigo-600 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 text-gray-500'>
          <Globe className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
          <p>No languages added yet.</p>
          <p className='text-sm'>Add your spoken languages above.</p>
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;
