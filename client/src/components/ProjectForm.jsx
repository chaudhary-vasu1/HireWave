import { Plus, Trash2 } from 'lucide-react';
import React from 'react';

const ProjectForm = ({ data = [], onChange }) => {

    const projectList = Array.isArray(data) ? data : [];

    const addProject = () => {
        const newProject = {
            title: '',
            name: '',
            type: '',
            techStack: '',
            link: '',
            website: '',
            github: '',
            github_link: '',
            description: ''
        };
        onChange([...projectList, newProject]);
    };

    const removeProject = (index) => {
        const updated = projectList.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...projectList];
        const current = updated[index] || {};
        
        let updatedItem = { ...current, [field]: value };
        if (field === 'title' || field === 'name') {
            updatedItem.title = value;
            updatedItem.name = value;
        }
        if (field === 'techStack' || field === 'type') {
            updatedItem.techStack = value;
            updatedItem.type = value;
        }
        if (field === 'link' || field === 'website') {
            updatedItem.link = value;
            updatedItem.website = value;
        }
        if (field === 'github' || field === 'github_link') {
            updatedItem.github = value;
            updatedItem.github_link = value;
        }

        updated[index] = updatedItem;
        onChange(updated);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Add Your Project Details</p>
                </div>
                <button 
                    onClick={addProject} 
                    className='flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-100 text-sky-700 font-medium rounded-lg hover:bg-sky-200 transition-colors'
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            <div className='space-y-4 mt-6'>
                {projectList.map((project, index) => {
                    const titleVal = project.title || project.name || '';
                    const techVal = Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.techStack || project.type || '');
                    const linkVal = project.link || project.website || project.live_demo || '';
                    const githubVal = project.github || project.github_link || project.githubUrl || '';
                    const descVal = Array.isArray(project.description) 
                        ? project.description.map(d => typeof d === 'string' && (d.startsWith('•') || d.startsWith('-') || d.startsWith('*')) ? d : `• ${d}`).join('\n') 
                        : (project.description || '');

                    return (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-2xs'>
                            <div className='flex justify-between items-start'>
                                <h4 className='font-medium text-sm text-gray-800'>Project #{index + 1}</h4>
                                <button 
                                    onClick={() => removeProject(index)} 
                                    className='text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50'
                                    title="Remove Project"
                                >
                                    <Trash2 className='size-4' />
                                </button>
                            </div>
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input 
                                    value={titleVal} 
                                    onChange={(e) => updateProject(index, "title", e.target.value)} 
                                    type="text" 
                                    placeholder='Project Name / Title' 
                                    className='px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none rounded-lg'
                                />
                                <input 
                                    value={techVal} 
                                    onChange={(e) => updateProject(index, "techStack", e.target.value)} 
                                    type="text" 
                                    placeholder='Technologies / Tech Stack (e.g. React, Node.js)' 
                                    className='px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none rounded-lg' 
                                />
                                <input 
                                    value={linkVal} 
                                    onChange={(e) => updateProject(index, "link", e.target.value)} 
                                    type="text" 
                                    placeholder='Live Demo / Project Link (e.g. https://my-app.com)' 
                                    className='px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none rounded-lg' 
                                />
                                <input 
                                    value={githubVal} 
                                    onChange={(e) => updateProject(index, "github", e.target.value)} 
                                    type="text" 
                                    placeholder='GitHub Repo Link (e.g. https://github.com/user/repo)' 
                                    className='px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none rounded-lg' 
                                />
                                <textarea 
                                    rows={3} 
                                    value={descVal} 
                                    onChange={(e) => updateProject(index, "description", e.target.value)}  
                                    placeholder='Describe your project...' 
                                    className='px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none rounded-lg col-span-full' 
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectForm;