import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import DashBoard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About"
import Support from "./pages/Support"
import Pricing from './pages/Pricing'
import Company from './pages/Company'
import { useDispatch } from 'react-redux'
import api from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import {Toaster} from 'react-hot-toast'

import AtsScanner from './pages/AtsScanner'

  const App = () => {

    const dispatch = useDispatch();

    const getUserData = async() =>{
      const token = localStorage.getItem('token')
     try {
      if(token){
        const {data} = await api.get('/api/users/data' ,{headers:{Authorization:token}})
        if(data.user){
          dispatch(login({token , user: data.user}))
        }
        dispatch(setLoading(false))
      }
      else{
        dispatch(setLoading(false))
      }
     } catch (error) {
        dispatch(setLoading(false))
        console.log(error.message)
     }
    }

    useEffect(() => {
      getUserData();
    }, []);
  return (
   <>
   <Toaster/>
   <Routes>
    <Route path = '/' element = {<Home />}/>

    <Route path = 'app' element = {<Layout/>}>
     <Route index element = {<DashBoard/>}/> 
     <Route path = 'builder/:resumeId' element = {<ResumeBuilder/>}/>
     <Route path = 'ats-scanner' element = {<AtsScanner/>}/>
    </Route>

    <Route path = 'view/:resumeId' element = {<Preview />}/>
    <Route path="/login" element={<Login />} />
   

    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/about" element={<About />} />
    <Route path="/support" element={<Support />} />
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path='/company' element={<Company/>}/>
   </Routes>
   </>
  )
}

export default App