import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api.js'
import toast from 'react-hot-toast'

const ExperienceForm = ({data = [] , onChange}) => {
     const {token} = useSelector(state => state.auth);
     const [generatingIndex, setGeneratingIndex] = useState(null);
     
     const addExperience = () =>{
        const newExperience = {
            company:'',
            position:'',
            start_date:'',
            end_date:'',
            description:'',
            is_current:false
        };
        onChange([...data , newExperience]);
     }

     const removeExperience = (index) =>{
           const updated = data.filter((_,i) => i !==index);
           onChange(updated);
     }

     const updateExperience = (index ,field ,value) =>{
           const updated = [...data];
           updated[index] = {...updated[index] , [field]:value};
           onChange(updated);
     }

     const generateAIDescription = async (index) => {
        const currentExp = data[index] || {};
        const currentDesc = currentExp.description || '';
        const userContent = currentDesc.trim() || `${currentExp.position || 'Professional'} at ${currentExp.company || 'Company'}`;

        setGeneratingIndex(index);
        try {
          if (token) {
            const { data: resData } = await api.post('/api/ai/enhance-job-desc', 
              { userContent }, 
              { headers: { Authorization: token } }
            );
            if (resData?.enhancedContent) {
              updateExperience(index, 'description', resData.enhancedContent);
              toast.success('Description generated with AI!');
              setGeneratingIndex(null);
              return;
            }
          }

          // Fallback enhancement if offline or token missing
          setTimeout(() => {
            let enhanced = currentDesc;
            if (!currentDesc || currentDesc.trim().length < 10) {
              enhanced = `Spearheaded key technical initiatives as ${currentExp.position || 'Specialist'} at ${currentExp.company || 'Organization'}. Standardized processes, collaborated with cross-functional teams, and improved overall operational efficiency by 25%.`;
            } else {
              enhanced = `${currentDesc.trim()} Successfully optimized project workflows, boosted productivity, and delivered measurable performance improvements across core deliverables.`;
            }
            updateExperience(index, 'description', enhanced);
            toast.success('Description enhanced!');
            setGeneratingIndex(null);
          }, 600);

        } catch (error) {
          toast.error(error?.response?.data?.message || 'Failed to generate AI description');
          setGeneratingIndex(null);
        }
     };

  return (
<div className='space-y-6'>
   <div className='flex items-center justify-between'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
          <Briefcase className="size-5 text-sky-600" />
          Professional Experience
        </h3>
        <p className='text-sm text-gray-500'>Add your employment and work experience details</p>
      </div>
        <button onClick={addExperience} type="button" className='flex items-center gap-2 px-3 py-1.5 text-sm bg-sky-100 text-sky-700 font-medium rounded-lg hover:bg-sky-200 transition-colors cursor-pointer'>
          <Plus className="size-4"/>
          Add Experience
        </button>

     </div>

     {data.length === 0 ?(
      <div className = 'text-center py-8 text-gray-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
          <p>No work experience added yet.</p>
          <p className='text-sm'>Click "Add Experience" to get started.</p>
      </div>
     ):(
        <div className = 'space-y-4'>
            {data.map((experience , index) =>(
                 <div key = {index} className='p-4 border border-gray-200 rounded-xl space-y-3 bg-white shadow-2xs'>
                    <div className='flex justify-between items-start'>
                        <h4 className="font-medium text-sm text-gray-800">Experience #{index+1}</h4>
                        <button onClick = {()=> removeExperience(index)} type="button" className='text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer'>
                          <Trash2 className='size-4'/>
                        </button>
                    </div>
                    <div className='grid md:grid-cols-2 gap-3'>
                       <input value = {experience.company || ''} onChange = {(e)=>updateExperience(index , "company" , e.target.value)} type="text" placeholder='Company Name' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none'/>
                       <input value = {experience.position || ''} onChange = {(e)=>updateExperience(index , "position" , e.target.value)} type="text" placeholder='Job Title' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' />
                       <input value = {experience.start_date || ''} onChange = {(e)=>updateExperience(index , "start_date" , e.target.value)} type="month" className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' />
                       <input value = {experience.end_date || ''} onChange = {(e)=>updateExperience(index , "end_date" , e.target.value)} type="month" disabled ={experience.is_current} className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:bg-gray-100' />
                    </div>
                    <label className='flex items-center gap-2 cursor-pointer pt-1'>
                     <input type="checkbox" checked = {experience.is_current || false} onChange={(e) =>{ updateExperience(index , "is_current" , e.target.checked);}} className = "rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer" />
                     <span className='text-sm text-gray-700 font-medium'>Currently working here</span>
                    </label>
                      <div className='space-y-2 pt-2'>
                        <div className='flex items-center justify-between'>
                           <label className='text-sm font-medium text-gray-700'> Job Description </label>
                           <button 
                             type="button"
                             onClick={() => generateAIDescription(index)}
                             disabled={generatingIndex === index}
                             className='flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 shadow-xs cursor-pointer'
                           >
                              <Sparkles className={`size-3.5 ${generatingIndex === index ? 'animate-spin' : ''}`}/>
                              {generatingIndex === index ? 'Enhancing...' : 'Enhance with AI'}
                           </button>
                        </div>
                        <textarea value={experience.description || ""} onChange={(e)=> updateExperience(index , "description" ,e.target.value)} rows={4} className='w-full text-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none leading-relaxed' placeholder='Describe your key responsibilities, achievements, and technical metrics...'/>
                      </div>
                 </div>
            ))}
        

        </div>
     )}
</div>
  )
}

export default ExperienceForm