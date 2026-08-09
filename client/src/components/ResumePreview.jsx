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
      <style >
        {`
        @page {
       size: letter;
        margin: 0;
        }
        @media print {
        html, body {
        width: 8.5in;
        height: 11in;
        overflow: hidden;
        }
        body *{
          visibility: hidden;
        }
         #resume-preview, #resume-preview * {
         visibility: visible;
        }

        #resume-preview{
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none ! important;
              border: none !important;
        }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview