import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import dummyResumeData from "../assets/assets";
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };
  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false)
    navigate(`/app/builder/res123`)
  }
  const editTitle = async (event) => {
    event.preventDefault();

  }

   const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?")
    if(confirm){
      setAllResumes(prev => prev.filter(item => String(item._id) !== String(resumeId)))
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
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Joe Doe
            </span>
          </h1>

          <p className="text-slate-500 mt-2">
            Create, manage and organize your resumes.
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
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 focus:border-sky-600 ring-sky-600">
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-sky-600 ring-sky-600" required />

              <button className="w-full py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors">Create Resume</button>
              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => {
                setShowCreateResume(false), setTitle('')
              }} />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 focus:border-sky-600 ring-sky-600">
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title}
                type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-sky-600 ring-sky-600" required />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-sky-500 hover:text-sky-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-sky-700">{resume.name} </p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>
                          Upload Resume
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input type='file' id='resume-input' accept='.pdf' hidden onChange={(event) => {
                  setResume(event.target.files[0]);
                }} />
              </div>
              <button className="w-full py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors">Upload Resume</button>
              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => {
                setShowUploadResume(false), setTitle('')
              }} />
            </div>
          </form>

        )

        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 focus:border-sky-600 ring-sky-600">
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-sky-600 ring-sky-600" required />

              <button className="w-full py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors">Update</button>
              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => {
                setEditResumeId(''), setTitle('')
              }} />
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default DashBoard;