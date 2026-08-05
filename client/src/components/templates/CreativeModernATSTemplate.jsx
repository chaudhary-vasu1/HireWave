import React from "react";

const CreativeModernATSTemplate = ({ data, accentColor = "#4f46e5" }) => {
    const personalInfo = data?.personal_info || data?.personalInfo || {};
    const summary = data?.professional_summary || data?.summary || "";

    let skills = [];
    if (Array.isArray(data?.skills)) {
        skills = data.skills;
    } else if (data?.skills && typeof data.skills === 'object') {
        skills = Object.values(data.skills).flat();
    }

    const rawExperience = data?.experience || [];
    const experience = rawExperience.map(exp => ({
        position: exp.position || exp.role || "",
        company: exp.company || "",
        startDate: exp.startDate || exp.startYear || "",
        endDate: exp.endDate || exp.endYear || "Present",
        description: Array.isArray(exp.description) 
            ? exp.description 
            : Array.isArray(exp.responsibilities) 
            ? exp.responsibilities 
            : exp.description ? [exp.description] 
            : exp.responsibilities ? [exp.responsibilities] : []
    }));

    const rawEducation = data?.education || [];
    const education = rawEducation.map(edu => ({
        degree: edu.degree || "",
        school: edu.school || edu.institute || edu.institution || "",
        startYear: edu.startYear || edu.startDate || "",
        endYear: edu.endYear || edu.endDate || "",
        cgpa: edu.cgpa || ""
    }));

    const rawProjects = data?.projects || data?.project || [];
    const projects = rawProjects.map(proj => ({
        title: proj.title || "",
        link: proj.link || proj.website || "",
        description: proj.description || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || "")
    }));

    const rawCertifications = data?.certifications || [];
    const certifications = rawCertifications.map(cert => 
        typeof cert === 'string' ? cert : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ")
    );

    const achievements = data?.achievements || [];
    const languages = data?.languages || [];

    // Separate sidebar items (contact, skills, education, certifications, languages) vs main content items (summary, experience, projects, achievements)
    const sidebarSectionKeys = new Set(['skills', 'education', 'certifications', 'languages']);

    const defaultOrder = ['summary', 'experience', 'projects', 'skills', 'education', 'certifications', 'achievements', 'languages'];
    const currentOrder = data?.sections_order || defaultOrder;

    const mainSectionsOrder = currentOrder.filter(k => !sidebarSectionKeys.has(k));
    const sidebarSectionsOrder = currentOrder.filter(k => sidebarSectionKeys.has(k));

    return (
        <div className="max-w-[850px] mx-auto bg-white text-slate-900 font-sans shadow-md overflow-hidden">
            {/* Top Banner Header */}
            <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            {personalInfo.full_name || "Your Name"}
                        </h1>
                        {personalInfo.profession && (
                            <p className="text-base font-medium opacity-90 mt-1">
                                {personalInfo.profession}
                            </p>
                        )}
                    </div>
                    {personalInfo.image && (
                        <img
                            src={typeof personalInfo.image === "string" ? personalInfo.image : URL.createObjectURL(personalInfo.image)}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-sm"
                        />
                    )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-95">
                    {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                    {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                    {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
                </div>
            </header>

            {/* 2-Column Body */}
            <div className="grid grid-cols-12 p-8 gap-8">
                {/* Main Content (Left 7 Cols) */}
                <div className="col-span-7 space-y-6">
                    {(() => {
                        const renderMainMap = {
                            summary: summary ? (
                                <section key="summary">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Professional Summary
                                    </h2>
                                    <p className="text-xs text-slate-800 leading-relaxed text-justify">{summary}</p>
                                </section>
                            ) : null,
                            experience: experience.length > 0 ? (
                                <section key="experience">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1">
                                        Work Experience
                                    </h2>
                                    {experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                                                <span className="text-[11px] font-medium text-slate-500">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <p className="text-xs font-semibold italic text-slate-600 mb-1">{exp.company}</p>
                                            <ul className="list-disc ml-4 text-xs text-slate-700 space-y-1">
                                                {(exp.description || []).map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </section>
                            ) : null,
                            projects: projects.length > 0 ? (
                                <section key="projects">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1">
                                        Projects
                                    </h2>
                                    {projects.map((project, index) => (
                                        <div key={index} className="mb-3 text-xs">
                                            <div className="flex justify-between items-baseline font-semibold">
                                                <span className="text-slate-900">{project.title}</span>
                                                {project.link && <span className="text-indigo-600 text-[11px]">{project.link}</span>}
                                            </div>
                                            <p className="text-slate-700 mt-0.5">{project.description}</p>
                                            {project.techStack && (
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    <strong>Tech:</strong> {project.techStack}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            ) : null,
                            achievements: achievements.length > 0 ? (
                                <section key="achievements">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Key Achievements
                                    </h2>
                                    <ul className="list-disc ml-4 text-xs text-slate-700 space-y-1">
                                        {achievements.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </section>
                            ) : null,
                        };

                        return mainSectionsOrder.map(secKey => renderMainMap[secKey]);
                    })()}
                </div>

                {/* Sidebar Column (Right 5 Cols) */}
                <div className="col-span-5 space-y-6 bg-slate-50/80 p-5 rounded-lg border border-slate-100 h-fit">
                    {(() => {
                        const renderSidebarMap = {
                            skills: skills.length > 0 ? (
                                <section key="skills">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Core Skills
                                    </h2>
                                    <div className="flex flex-wrap gap-1.5 text-xs">
                                        {skills.map((skill, index) => (
                                            <span key={index} className="px-2 py-0.5 bg-white text-slate-800 rounded border border-slate-200 font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            ) : null,
                            education: education.length > 0 ? (
                                <section key="education">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Education
                                    </h2>
                                    {education.map((edu, index) => (
                                        <div key={index} className="mb-2 text-xs">
                                            <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                            <p className="text-slate-600 italic">{edu.school}</p>
                                            <div className="text-[11px] text-slate-500 flex justify-between mt-0.5">
                                                <span>{edu.startYear} - {edu.endYear}</span>
                                                {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            ) : null,
                            certifications: certifications.length > 0 ? (
                                <section key="certifications">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Certifications
                                    </h2>
                                    <ul className="list-disc ml-4 text-xs text-slate-700 space-y-1">
                                        {certifications.map((cert, index) => (
                                            <li key={index}>{cert}</li>
                                        ))}
                                    </ul>
                                </section>
                            ) : null,
                            languages: languages.length > 0 ? (
                                <section key="languages">
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1">
                                        Languages
                                    </h2>
                                    <p className="text-xs text-slate-700 font-medium">{languages.join(", ")}</p>
                                </section>
                            ) : null,
                        };

                        return sidebarSectionsOrder.map(secKey => renderSidebarMap[secKey]);
                    })()}
                </div>
            </div>
        </div>
    );
};

export default CreativeModernATSTemplate;
