import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../app/features/authSlice.js';

import { Scan, Home } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const logoutUser = () => {
      navigate('/');
      dispatch(logout());

    } 

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all'>
      <nav className='max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 text-slate-800'>
        <Link 
          to='/' 
          title="Go to Home Page"
          aria-label="Go to Home Page"
          className='flex items-center gap-2.5 group transition-all active:scale-95 cursor-pointer relative'
        >
          <img src='/logo.svg' alt='HireWave Logo' className="h-8 w-auto transition-transform group-hover:scale-105" />
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-2xs pointer-events-none">
            <Home className="size-3 text-sky-600" />
            <span>Home</span>
          </span>
        </Link>

        <div className='flex items-center gap-3 text-sm'>
          {user && (
            <Link 
              to="/app/ats-scanner" 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-50 to-indigo-50 hover:from-sky-100 hover:to-indigo-100 text-sky-700 font-semibold rounded-full border border-sky-200/80 text-xs transition-all cursor-pointer shadow-2xs"
            >
              <Scan className="size-3.5 text-sky-600" />
              <span>ATS Scanner</span>
            </Link>
          )}

          {user && (
            <div className='max-sm:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-full border border-slate-200/60 font-medium text-slate-700 text-xs shadow-2xs'>
              <span className='w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs'>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
              <span>Hi, {user?.name}</span>
            </div>
          )}
          <button 
            onClick={logoutUser} 
            className='bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-300 px-5 py-1.5 rounded-full font-medium active:scale-95 transition-all text-slate-700 text-xs shadow-2xs cursor-pointer'
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar