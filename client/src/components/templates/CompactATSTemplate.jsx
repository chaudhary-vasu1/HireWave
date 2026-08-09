import React from "react";

const CompactATSTemplate = ({ data, accentColor = "#0f766e" }) => {
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
        title: proj.title || proj.name || "",
        link: proj.link || proj.website || "",
        description: proj.description || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || "")
    }));

    const rawCertifications = data?.certifications || [];
    const certifications = rawCertifications.map(cert => 
        typeof cert === 'string' ? cert : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ")
    );

    const achievements = data?.achievements || [];
    const languages = data?.languages || [];

    return (
        <div className="max-w-[850px] mx-auto bg-white text-slate-900 p-8 font-sans leading-snug">
            {/* Header */}
            <header className="flex justify-between items-end border-b pb-4 mb-4 border-slate-300">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                        {personalInfo.full_name || "Your Name"}
                    </h1>
                    {personalInfo.profession && (
                        <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>
                            {personalInfo.profession}
                        </p>
                    )}
                </div>

                <div className="text-right text-[11px] text-slate-600 space-y-0.5">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                </div>
            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <section key="summary" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-1 text-slate-800" style={{ borderColor: accentColor }}>
                                Professional Summary
                            </h2>
                            <p className="text-xs text-slate-700 leading-normal">{summary}</p>
                        </section>
                    ) : null,
                    skills: skills.length > 0 ? (
                        <section key="skills" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-1 text-slate-800" style={{ borderColor: accentColor }}>
                                Skills & Competencies
                            </h2>
                            <p className="text-xs text-slate-700 font-medium">
                                {skills.join(" • ")}
                            </p>
                        </section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <section key="experience" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-2 text-slate-800" style={{ borderColor: accentColor }}>
                                Work Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between items-baseline text-xs">
                                        <span className="font-bold text-slate-900">{exp.position}</span>
                                        <span className="text-slate-500 font-medium">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-[11px] font-semibold text-slate-600 italic mb-0.5">{exp.company}</div>
                                    <ul className="list-disc ml-4 text-xs text-slate-700 space-y-0.5">
                                        {(exp.description || []).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    projects: projects.length > 0 ? (
                        <section key="projects" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-2 text-slate-800" style={{ borderColor: accentColor }}>
                                Key Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-2 text-xs">
                                    <div className="flex justify-between items-baseline font-semibold">
                                        <span className="text-slate-900">{project.title}</span>
                                        {project.link && <span className="text-slate-500 text-[11px]">{project.link}</span>}
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
                    education: education.length > 0 ? (
                        <section key="education" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-2 text-slate-800" style={{ borderColor: accentColor }}>
                                Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-2 flex justify-between items-baseline text-xs">
                                    <div>
                                        <span className="font-bold text-slate-900">{edu.degree}</span>
                                        <span className="text-slate-600 italic ml-2">({edu.school})</span>
                                    </div>
                                    <div className="text-slate-500 text-right">
                                        <span>{edu.startYear} - {edu.endYear}</span>
                                        {edu.cgpa && <span className="ml-2">CGPA: {edu.cgpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <section key="certifications" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-1 text-slate-800" style={{ borderColor: accentColor }}>
                                Certifications
                            </h2>
                            <ul className="list-disc ml-4 text-xs text-slate-700 space-y-0.5">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <section key="achievements" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-1 text-slate-800" style={{ borderColor: accentColor }}>
                                Achievements
                            </h2>
                            <ul className="list-disc ml-4 text-xs text-slate-700 space-y-0.5">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages.length > 0 ? (
                        <section key="languages" className="mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider border-l-2 pl-2 mb-1 text-slate-800" style={{ borderColor: accentColor }}>
                                Languages
                            </h2>
                            <p className="text-xs text-slate-700">{languages.join(", ")}</p>
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

export default CompactATSTemplate;
