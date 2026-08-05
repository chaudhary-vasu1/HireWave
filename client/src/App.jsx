import React from 'react'
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

  const App = () => {
  return (
   <>
   <Routes>
    <Route path = '/' element = {<Home />}/>

    <Route path = 'app' element = {<Layout/>}>
     <Route index element = {<DashBoard/>}/> 
     <Route path = 'builder/:resumeId' element = {<ResumeBuilder/>}/>
    </Route>

    <Route path = 'view/:resumeId' element = {<Preview />}/>
    <Route path = 'login' element = {<Login />}/>

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