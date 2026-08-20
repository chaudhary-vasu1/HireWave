import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import TechProfessionalTemplate from './templates/TechProfessionalTemplate'
import CompactATSTemplate from './templates/CompactATSTemplate'
import CreativeModernATSTemplate from './templates/CreativeModernATSTemplate'

const ResumePreview = ({data , template , accentColor , classes = ''}) => {
    const renderTemplate = () =>{
        switch (template) {
           case "modern":
           return <ModernTemplate data={data} resume={data} accentColor={accentColor}/>;
           case "minimal":
           return <MinimalTemplate data={data} accentColor={accentColor}/>;
           case "minimal-image":
           return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
           case "executive":
           return <ExecutiveTemplate data={data} accentColor={accentColor}/>;
           case "tech":
           return <TechProfessionalTemplate data={data} accentColor={accentColor}/>;
           case "compact":
           return <CompactATSTemplate data={data} accentColor={accentColor}/>;
           case "creative-sidebar":
           return <CreativeModernATSTemplate data={data} accentColor={accentColor}/>;

          default:
        return <ClassicTemplate data={data} accentColor={accentColor}/>;
}
    } 
    return (
    <div className='w-full bg-gray-100 overflow-x-auto max-w-full rounded-lg'>
      <div id = 'resume-preview' className={`border border-gray-200 print:shadow-none print:border-none min-w-[320px] sm:min-w-0 ${classes}`}>
        {renderTemplate()}
      </div>
      <style>
        {`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          html, body, #root, main, div, section {
            display: block !important;
          }

          body * {
            visibility: hidden !important;
          }

          #resume-preview, #resume-preview * {
            visibility: visible !important;
          }

          #resume-preview {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            z-index: 999999 !important;
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #resume-preview img {
            max-width: 100% !important;
            object-fit: cover !important;
          }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview