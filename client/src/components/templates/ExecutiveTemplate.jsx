import React from "react";

const ExecutiveTemplate = ({ data, accentColor = "#1e3a8a" }) => {
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

    return (
        <div className="max-w-[850px] mx-auto bg-white text-slate-900 p-10 font-serif leading-normal border-t-8" style={{ borderColor: accentColor }}>
            {/* Executive Header */}
            <header className="text-center border-b pb-6 mb-6 border-slate-300">
                <h1 className="text-4xl font-extrabold uppercase tracking-wider" style={{ color: accentColor }}>
                    {personalInfo.full_name || "Your Name"}
                </h1>
                
                {personalInfo.profession && (
                    <p className="text-lg font-medium text-slate-700 mt-1 uppercase tracking-widest">
                        {personalInfo.profession}
                    </p>
                )}

                <div className="mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-sans font-medium">
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>• {personalInfo.email}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                </div>
            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <section key="summary" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Executive Profile
                            </h2>
                            <p className="text-sm text-slate-800 leading-relaxed text-justify">{summary}</p>
                        </section>
                    ) : null,
                    skills: skills.length > 0 ? (
                        <section key="skills" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Core Competencies & Skills
                            </h2>
                            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-sans">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <section key="experience" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Professional Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base text-slate-900 font-sans">
                                            {exp.position}
                                        </h3>
                                        <span className="text-xs font-sans font-semibold text-slate-500">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold italic text-slate-700 mb-1">
                                        {exp.company}
                                    </div>
                                    <ul className="list-disc ml-5 text-xs text-slate-800 space-y-1 font-sans">
                                        {(exp.description || []).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    projects: projects.length > 0 ? (
                        <section key="projects" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Key Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-baseline font-sans">
                                        <h3 className="font-bold text-sm text-slate-900">
                                            {project.title}
                                        </h3>
                                        {project.link && <span className="text-xs text-slate-500 font-medium">{project.link}</span>}
                                    </div>
                                    <p className="text-xs text-slate-800 mt-1 font-sans">{project.description}</p>
                                    {project.techStack && (
                                        <p className="text-xs text-slate-600 mt-1 font-sans">
                                            <strong>Tech Stack:</strong> {project.techStack}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    education: education.length > 0 ? (
                        <section key="education" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Education & Credentials
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3 flex justify-between items-baseline font-sans">
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                                        <p className="text-xs text-slate-700 italic">{edu.school}</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-500 font-medium">
                                        <span>{edu.startYear} - {edu.endYear}</span>
                                        {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <section key="certifications" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Certifications & Licenses
                            </h2>
                            <ul className="list-disc ml-5 text-xs text-slate-800 space-y-1 font-sans">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <section key="achievements" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Key Achievements
                            </h2>
                            <ul className="list-disc ml-5 text-xs text-slate-800 space-y-1 font-sans">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages.length > 0 ? (
                        <section key="languages" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2 font-sans" style={{ color: accentColor, borderColor: accentColor }}>
                                Languages
                            </h2>
                            <p className="text-xs text-slate-800 font-sans">{languages.join(", ")}</p>
                        </section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements', 'languages'];
                const sectionOrder = data?.sections_order || defaultOrder;
                return sectionOrder.map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

export default ExecutiveTemplate;
