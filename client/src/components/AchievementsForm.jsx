import React, { useState } from 'react';
import { Trophy, Plus, X } from 'lucide-react';

const AchievementsForm = ({ data = [], onChange }) => {
  const [newAchievement, setNewAchievement] = useState("");

  const addAchievement = () => {
    if (newAchievement.trim() && !data.includes(newAchievement.trim())) {
      onChange([...data, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const removeAchievement = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAchievement();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
          <Trophy className="size-5 text-sky-600" />
          Key Achievements & Awards
        </h3>
        <p className='text-sm text-gray-500'>Add major honors, awards, publications, or competitive achievements</p>
      </div>

      <div className='flex gap-2'>
        <input 
          type="text" 
          placeholder='Enter an achievement (e.g. Winner of National Hackathon 2023)' 
          className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none'
          onChange={(e) => setNewAchievement(e.target.value)} 
          value={newAchievement}
          onKeyDown={handleKeyPress}
        />

        <button 
          onClick={addAchievement} 
          disabled={!newAchievement.trim()} 
          className='flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        >
          <Plus className='size-4'/> Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className='space-y-2'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 shadow-xs'>
              <span>{item}</span>
              <button 
                onClick={() => removeAchievement(index)} 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md p-1 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 text-gray-500'>
          <Trophy className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
          <p>No achievements added yet.</p>
          <p className='text-sm'>Add your notable honors or awards above.</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsForm;
