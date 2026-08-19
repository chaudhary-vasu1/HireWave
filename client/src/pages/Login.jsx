import React from 'react'
import { Mail, Lock, User2, Eye, EyeOff, Loader2 } from "lucide-react";
import api from '../configs/api.js';
import {useDispatch} from 'react-redux'
import { login } from '../app/features/authSlice.js';
import toast from 'react-hot-toast';


import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state');
    const [state, setState] = React.useState( urlState||"login")
    const [showPassword, setShowPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            const {data} = await api.post(`/api/users/${state}`, formData)
             dispatch (login(data));
             localStorage.setItem('token' , data.token)
             toast.success(data.message)
             navigate('/')
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }


  return (
    <div className='min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-slate-50 to-indigo-100 flex items-center justify-center p-4'>
      <form 
        onSubmit={handleSubmit} 
        className="sm:w-[380px] w-full text-center border border-white/80 rounded-3xl p-8 bg-white/90 backdrop-blur-xl shadow-xl shadow-sky-950/5 transition-all duration-300"
      >
        <div className="flex justify-center mb-2">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-sky-500/20">
            H
          </span>
        </div>
        <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-xs mt-1">
          Please {state === "login" ? "sign in" : "register"} to continue with HireWave
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-slate-50 border border-slate-200/80 h-11 rounded-xl overflow-hidden px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-500/30 focus-within:border-sky-500 focus-within:bg-white transition-all">
            <User2 size={16} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              className="w-full text-sm bg-transparent border-none outline-none ring-0 placeholder:text-slate-400 text-slate-800" 
              value={formData.name} 
              onChange={handleChange} 
              onKeyDown={handleKeyDown}
              required 
            />
          </div>
        )}

        <div className="flex items-center w-full mt-3 bg-slate-50 border border-slate-200/80 h-11 rounded-xl overflow-hidden px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-500/30 focus-within:border-sky-500 focus-within:bg-white transition-all">
          <Mail size={16} className="text-slate-400 shrink-0" />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            className="w-full text-sm bg-transparent border-none outline-none ring-0 placeholder:text-slate-400 text-slate-800" 
            value={formData.email} 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            required 
          />
        </div>

        <div className="flex items-center mt-3 w-full bg-slate-50 border border-slate-200/80 h-11 rounded-xl overflow-hidden px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-500/30 focus-within:border-sky-500 focus-within:bg-white transition-all">
          <Lock size={16} className="text-slate-400 shrink-0" />
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            className="w-full text-sm bg-transparent border-none outline-none ring-0 placeholder:text-slate-400 text-slate-800" 
            value={formData.password} 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(prev => !prev)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none shrink-0 cursor-pointer transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {state === "login" && (
          <div className="mt-2 text-right">
            <button className="text-xs text-sky-600 hover:text-sky-700 font-medium transition-colors cursor-pointer" type="button">
              Forgot password?
            </button>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="mt-6 w-full h-11 rounded-xl text-white font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{state === "login" ? "Signing In..." : "Creating Account..."}</span>
            </>
          ) : (
            state === "login" ? "Sign In" : "Create Account"
          )}
        </button>

        <p 
          onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setState(prev => prev === "login" ? "register" : "login");
            }
          }}
          tabIndex={0}
          className="text-slate-500 text-xs mt-5 cursor-pointer font-medium hover:text-slate-700 transition-colors focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-md p-1"
        >
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
          <span className="text-sky-600 font-semibold hover:underline">
            {state === "login" ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login