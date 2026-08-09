import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  Scan,
} from "lucide-react";
import dummyResumeData from "../assets/assets";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import pdfToText from 'react-pdftotext';

const DashBoard = () => {

  const {user ,token} = useSelector(state =>state.auth)
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () => {
   try {
    const {data} = await api.get('/api/users/resumes'  ,{headers:{
          Authorization:token
         }})
         setAllResumes(data.resumes);
    
   } catch (error) {
     toast.error(error?.response?.data?.message || error.message)
   }
  };
  const createResume = async (event) => {
    try {
         event.preventDefault();
         const {data} = await api.post('/api/resumes/create' ,{title} ,{headers:{
          Authorization:token
         }})
         setAllResumes([... allResumes , data.resume])
         setTitle('')
         setShowCreateResume(false)
         navigate(`/app/builder/${data.resume._id}`)
    
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
       const resumeText = await pdfToText(resume);
        const {data} = await api.post('/api/ai/upload' ,{title , resumeText} ,{headers:{
          Authorization:token
         }})

         setTitle('');
         setResume(null);
         setShowUploadResume(false);
         navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false);
    
  }
  const editTitle = async (event) => {
    try {

       event.preventDefault();
       const {data} = await api.put(`/api/resumes/update` ,{resumeId :editResumeId , resumeData : {title}},{headers:{
          Authorization:token
         }})

         setAllResumes(allResumes.map(resume => resume._id === editResumeId ?{
          ...resume , title}:resume))
          setTitle('')
          setEditResumeId('')
          toast.success(data.message)
      
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
   

  }

   const deleteResume = async (resumeId) => {

      try {
        
        const confirm = window.confirm("Are you sure you want to delete this resume?")
     if(confirm){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}` ,{headers:{
          Authorization:token
         }})

       setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
       toast.success(data.message);
         
        
      }
     } catch (error) {
        
      }
  }
   



  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Create, manage and organize your professional resumes effortlessly.
          </p>
        </div>


        <div className="flex flex-wrap gap-5">

          <button onClick={() => {
            setShowCreateResume(true)
          }} className="w-full sm:max-w-40 h-52 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-200/50">
            <PlusIcon className="size-12 p-3 rounded-full bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-90" />

            <p className="text-sm font-medium text-slate-600">
              Create Resume
            </p>
          </button>


          <button onClick={() => {
            setShowUploadResume(true)
          }} className="w-full sm:max-w-40 h-52 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-200/50">
            <UploadCloudIcon className="size-12 p-3 rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-600 text-white transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1" />

            <p className="text-sm font-medium text-slate-600">
              Upload Existing
            </p>
          </button>

          <button onClick={() => {
            navigate('/app/ats-scanner')
          }} className="w-full sm:max-w-40 h-52 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-200/50">
            <Scan className="size-12 p-3 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white transition-all duration-300 group-hover:scale-110" />

            <p className="text-sm font-medium text-slate-600">
              ATS Scanner
            </p>
          </button>
        </div>

        <hr className="my-8 border-slate-200" />


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={index} onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative h-56 rounded-2xl overflow-hidden border bg-white group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  borderColor: `${baseColor}30`,
                }}
              >

                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: baseColor }}
                />


                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at top, ${baseColor}18, transparent 70%)`,
                  }}
                />


                <div onClick={(e) => e.stopPropagation()} className="absolute top-3 right-3 hidden group-hover:flex gap-2 z-20">
                  
                  <button
                  type="button"
                  onClick={() => deleteResume(resume._id)}
                  >
                  <TrashIcon className="size-4 text-red-500" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                  >
                    <PencilIcon className="size-4 text-sky-600" />
                  </button>

                </div>


                <div className="h-full flex flex-col justify-center items-center px-4">
                  <div
                    className="p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${baseColor}18`,
                    }}
                  >
                    <FilePenLineIcon
                      className="size-8"
                      style={{ color: baseColor }}
                    />
                  </div>

                  <h3
                    className="font-semibold text-center text-sm"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-3">
                    Updated{" "}
                    {resume.updatedAt
                      ? new Date(resume.updatedAt).toLocaleDateString()
                      : "Today"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Create New Resume</h2>
              <p className="text-xs text-slate-500 mb-5">Give your new resume a title to get started.</p>

              <input 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                type="text" 
                placeholder="e.g. Software Engineer Resume" 
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl mb-5 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:bg-white outline-none transition-all" 
                required 
              />

              <button className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer text-sm">
                Create Resume
              </button>
              <XIcon className="absolute top-5 right-5 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors p-0.5 rounded-full hover:bg-slate-100" onClick={() => {
                setShowCreateResume(false); setTitle('')
              }} />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Upload Existing Resume</h2>
              <p className="text-xs text-slate-500 mb-4">Our AI will automatically parse your resume fields.</p>

              <input 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                type="text" 
                placeholder="Enter resume title" 
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:bg-white outline-none transition-all" 
                required 
              />
              <div>
                <label htmlFor="resume-input" className="block text-xs font-medium text-slate-700">
                  Select Resume File (PDF)
                  <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-200 border-dashed rounded-2xl p-6 my-3 hover:border-sky-500 hover:bg-sky-50/50 cursor-pointer transition-all group">
                    {resume ? (
                      <p className="text-sky-700 font-medium text-sm">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-10 text-sky-500 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-medium text-slate-600">
                          Click to browse PDF file
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input type='file' id='resume-input' accept='.pdf' hidden onChange={(event) => {
                  setResume(event.target.files[0]);
                }} />
              </div>
              <button disabled={isLoading} className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50">
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
                {isLoading ? 'Processing with AI...' : 'Upload & Parse Resume'}
              </button>
              <XIcon className="absolute top-5 right-5 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors p-0.5 rounded-full hover:bg-slate-100" onClick={() => {
                setShowUploadResume(false); setTitle('')
              }} />
            </div>
          </form>
        )}

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Edit Resume Title</h2>
              <p className="text-xs text-slate-500 mb-4">Update the title of your resume.</p>

              <input 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                type="text" 
                placeholder="Enter resume title" 
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl mb-5 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:bg-white outline-none transition-all" 
                required 
              />

              <button className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer text-sm">
                Update Title
              </button>
              <XIcon className="absolute top-5 right-5 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors p-0.5 rounded-full hover:bg-slate-100" onClick={() => {
                setEditResumeId(''); setTitle('')
              }} />
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default DashBoard;