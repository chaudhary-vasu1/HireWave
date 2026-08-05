import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-sky-200/60 to-white mt-30">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                    <a href="#">
                     
                    <img src = "/logo.svg" alt="logo" className="h-14 w-auto"/>
                    </a>
                    <div>
                        <p className="text-slate-800 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to = '/' className="hover:text-sky-600 transition">Home</Link></li>
                            <li><Link to = '/support' className="hover:text-sky-600 transition">Support</Link></li>
                            <li><Link to = '/pricing' className="hover:text-sky-600 transition">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to = '/company' className="hover:text-sky-600 transition">Company</Link></li>
                            
                            
                            <li><Link to = '/about' className="hover:text-sky-600 transition">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><Link to="/privacy-policy" className="hover:text-sky-600 transition">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-sky-600 transition">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                    <div className="flex items-center gap-4 mt-3">
<a
  href="https://instagram.com/chaudhary_vasu1"
  target="_blank"
  rel="noreferrer"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5 hover:text-sky-500"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
</a>
                        <a href="https://www.linkedin.com/in/vasu-choudhary-cse" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-5 hover:text-sky-500" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://x.com/Chaudhary_vasu1" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter size-5 hover:text-sky-500" aria-hidden="true">
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                </path>
                            </svg>
                        </a>
                        
                    </div>
                    <p className="mt-3 text-center">© 2026 <Link to = '/app'>HireWave</Link></p>
                </div>
            </footer>
        </>
  )
}

export default Footer