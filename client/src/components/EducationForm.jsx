import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data = [] , onChange}) => {


     const addEducation = () =>{
        const newEducation = {
            institution:'',
            degree:'',
            field:'',
            graduation_date:'',
            gpa:'',
            
        };
        onChange([...data , newEducation]);
     }

     const removeEducation = (index) =>{
           const updated = data.filter((_,i) => i !==index);
           onChange(updated);
     }

     const updateEducation = (index ,field ,value) =>{
           const updated = [...data];
           updated[index] = {...updated[index] , [field]:value};
           onChange(updated);
     }

     
    

  return (
   <div className='space-y-6'>
   <div className='flex items-center justify-between'>
      <div>
         <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
           <GraduationCap className="size-5 text-sky-600" />
           Education
         </h3>
         <p className='text-sm text-gray-500'>Add Your Education Details</p>
      </div>
        <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors cursor-pointer'>
        <Plus className="size-4"/>
            Add Education
          </button>

     </div>

     {data.length === 0 ?(
      <div className = 'text-center py-8 text-gray-500'>
          <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
          <p>No education added yet.</p>
          <p className='text-sm'>Click  "Add Education" to get started.</p>
      </div>
     ):(
        <div className = 'space-y-4'>
            {data.map((education , index) =>(
                 <div key = {index}  className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white'>
                    <div className='flex justify-between items-start'>
                        <h4 className='font-medium text-sm text-gray-800'>Education #{index+1}</h4>
                        <button onClick = {()=> removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors cursor-pointer p-1 rounded hover:bg-red-50'>
                        <Trash2 className='size-4'/>
                        </button>
                    </div>
                    <div className='grid md:grid-cols-2 gap-3'>
                       <input value = {education.institution || education.institute || education.school || ''} onChange = {(e)=>updateEducation(index , "institution" , e.target.value)} type="text" placeholder='Institution / School Name' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none'/>
                       <input value = {education.degree || ''} onChange = {(e)=>updateEducation(index , "degree" , e.target.value)} type="text" placeholder='Degree' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' />
                       <input value = {education.field || ''} onChange = {(e)=>updateEducation(index , "field" , e.target.value)} type="text" placeholder = 'Field of Study' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none' />
                       <input value = {education.graduation_date || education.year || ''} onChange = {(e)=>updateEducation(index , "graduation_date" , e.target.value)} type="month" className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none ' />
                       <input value = {education.gpa || education.cgpa || ''} onChange = {(e)=>updateEducation(index , "gpa" , e.target.value)} type="text" className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none col-span-full' placeholder='GPA / CGPA (optional)' />
                    </div>
                 </div>
            ))}
        

        </div>
     )}
</div>
  )
}

export default EducationForm