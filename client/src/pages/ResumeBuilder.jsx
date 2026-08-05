import React, { useEffect, useState } from "react";
import dummyResumeData from '../assets/assets'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User, ArrowUp, ArrowDown, ArrowUpDown, Layout } from 'lucide-react'
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";

const defaultSectionsOrder = [
  'summary',
  'skills',
  'experience',
  'education',
  'projects',
  'certifications',
  'achievements',
  'languages'
];

const sectionLabels = {
  summary: 'Professional Summary',
  skills: 'Technical Skills',
  experience: 'Professional Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
  achievements: 'Achievements',
  languages: 'Languages'
};

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: '#3B82F6',
    public: false,
    sections_order: defaultSectionsOrder
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => String(resume._id) === String(resumeId))
    if (resume) {
      setResumeData({
        ...resume,
        sections_order: resume.sections_order || defaultSectionsOrder
      });
      document.title = resume.title
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
    { id: 'reorder', name: 'Reorder Sections', icon: ArrowUpDown },
  ]
  const activeSection = sections[activeSectionIndex];

  const currentOrder = resumeData.sections_order || defaultSectionsOrder;

  const moveSectionUp = (index) => {
    if (index <= 0) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    setResumeData(prev => ({ ...prev, sections_order: newOrder }));
  };

  const moveSectionDown = (index) => {
    if (index >= currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    setResumeData(prev => ({ ...prev, sections_order: newOrder }));
  };

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6 '>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4 -ml-9' /> Back to DashBoard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/*Left panel- Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using activesectionindex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-sky-500 to-sky-600 border-none transition-all duration-2000" style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

              {/* Section Tabs Selector */}
              <div className="flex flex-wrap gap-1.5 py-3 mb-4 border-b border-gray-200">
                {sections.map((sec, idx) => {
                  const Icon = sec.icon;
                  const isActive = idx === activeSectionIndex;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-sky-500 text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      {sec.name}
                    </button>
                  );
                })}
              </div>

              {/* section navigation buttons */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  {activeSection.icon && <activeSection.icon className="size-4 text-sky-600" />}
                  {activeSection.name}
                </span>

                <div className="flex items-center gap-1">
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all">
                      <ChevronLeft className="size-3.5" /> Previous
                    </button>
                  )}

                  {activeSectionIndex !== sections.length - 1 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 transition-all">
                      Next <ChevronRight className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/*  form content*/}
              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info || {}} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}

                {activeSection.id === 'summary' && (
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-gray-800">Professional Summary</h3>
                    <textarea
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Write a compelling summary of your career and skills..."
                      value={resumeData.professional_summary || ""}
                      onChange={(e) => setResumeData(prev => ({ ...prev, professional_summary: e.target.value }))}
                    />
                  </div>
                )}

                {activeSection.id === 'reorder' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">Reorder Resume Sections</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Use the buttons to move any section up or down in your preview.</p>
                    </div>

                   

                    {/* Reorderable Items List */}
                    <div className="space-y-2">
                      {currentOrder.map((secKey, idx) => (
                        <div
                          key={secKey}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-xs hover:border-sky-300 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 flex items-center justify-center bg-sky-100 text-sky-700 text-xs font-bold rounded-full">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-medium text-gray-800">
                              {sectionLabels[secKey] || secKey}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveSectionUp(idx)}
                              disabled={idx === 0}
                              title="Move Section Up"
                              className={`p-1.5 rounded-md text-xs border transition-all ${
                                idx === 0 
                                  ? 'text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed' 
                                  : 'text-gray-600 border-gray-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                              }`}
                            >
                              <ArrowUp className="size-3.5" />
                            </button>

                            <button
                              onClick={() => moveSectionDown(idx)}
                              disabled={idx === currentOrder.length - 1}
                              title="Move Section Down"
                              className={`p-1.5 rounded-md text-xs border transition-all ${
                                idx === currentOrder.length - 1 
                                  ? 'text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed' 
                                  : 'text-gray-600 border-gray-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300'
                              }`}
                            >
                              <ArrowDown className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*Right panel- Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-xs mb-4">
              <div className="flex items-center gap-2">
                <Layout className="size-4 text-sky-600"/>
                <span className="text-xs font-semibold text-gray-700">Template:</span>
                <select
                  value={resumeData.template || "classic"}
                  onChange={(e) => setResumeData(prev => ({ ...prev, template: e.target.value }))}
                  className="text-xs font-medium bg-gray-50 border border-gray-300 text-gray-800 rounded-md px-2.5 py-1 focus:ring-2 focus:ring-sky-500 focus:outline-none cursor-pointer"
                >
                  <option value="classic">Classic ATS</option>
                  <option value="modern">Modern ATS</option>
                  <option value="minimal">Minimal ATS</option>
                  <option value="minimal-image">Minimal Image</option>
                  <option value="executive">Executive ATS</option>
                  <option value="tech">Tech / Engineer ATS</option>
                  <option value="compact">Compact Single-Page ATS</option>
                  <option value="creative-sidebar">Modern Sidebar ATS</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">Color:</span>
                {['#3B82F6', '#1e3a8a', '#0284c7', '#0f766e', '#4f46e5', '#dc2626', '#059669', '#111827'].map(color => (
                  <button
                    key={color}
                    onClick={() => setResumeData(prev => ({ ...prev, accent_color: color }))}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      resumeData.accent_color === color ? 'ring-2 ring-sky-500 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    title={`Set accent color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* ----- resume preview---- */}
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder