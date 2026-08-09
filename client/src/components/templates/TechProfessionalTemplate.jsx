import React from "react";

const TechProfessionalTemplate = ({ data, accentColor = "#0284c7" }) => {
    const personalInfo = data?.personal_info || data?.personalInfo || {};
    const summary = data?.professional_summary || data?.summary || "";

    const hiddenSections = new Set(data?.hidden_sections || []);

    let skillsObj = {};
    let skillsList = [];
    if (data?.skills && typeof data.skills === 'object' && !Array.isArray(data.skills)) {
        skillsObj = data.skills;
    } else if (Array.isArray(data?.skills)) {
        skillsList = data.skills.filter(s => typeof s === 'string' && s.trim().length > 0);
    }

    const rawExperience = data?.experience || [];
    const experience = rawExperience.map(exp => ({
        position: exp.position || exp.role || "",
        company: exp.company || "",
        startDate: exp.startDate || exp.startYear || "",
        endDate: exp.endDate || exp.endYear || "Present",
        description: (Array.isArray(exp.description) 
            ? exp.description 
            : Array.isArray(exp.responsibilities) 
            ? exp.responsibilities 
            : exp.description ? [exp.description] 
            : exp.responsibilities ? [exp.responsibilities] : []).filter(item => typeof item === 'string' && item.trim().length > 0)
    })).filter(exp => exp.position.trim() || exp.company.trim() || exp.description.length > 0);

    const rawEducation = data?.education || [];
    const education = rawEducation.map(edu => ({
        degree: edu.degree || "",
        school: edu.school || edu.institute || edu.institution || "",
        startYear: edu.startYear || edu.startDate || "",
        endYear: edu.endYear || edu.endDate || "",
        cgpa: edu.cgpa || ""
    })).filter(edu => edu.degree.trim() || edu.school.trim());

    const rawProjects = data?.projects || data?.project || [];
    const projects = rawProjects.map(proj => ({
        title: proj.title || proj.name || "",
        link: proj.link || proj.website || "",
        description: proj.description || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || "")
    })).filter(proj => proj.title.trim() || proj.description.trim() || proj.link.trim());

    const rawCertifications = data?.certifications || [];
    const certifications = rawCertifications
        .map(cert => typeof cert === 'string' ? cert.trim() : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ").trim())
        .filter(cert => cert.length > 0);

    const achievements = (data?.achievements || []).filter(a => typeof a === 'string' && a.trim().length > 0);
    const languages = (data?.languages || []).filter(l => typeof l === 'string' && l.trim().length > 0);

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
            return url;
        }
        return `https://${url}`;
    };

    return (
        <div className="max-w-[850px] mx-auto bg-white text-slate-900 p-10 font-sans leading-relaxed">
            {/* Header */}
            <header className="border-l-4 pl-4 pb-2 mb-6" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {personalInfo.full_name || "Your Name"}
                </h1>
                
                {personalInfo.profession && (
                    <p className="text-base font-semibold mt-0.5" style={{ color: accentColor }}>
                        {personalInfo.profession}
                    </p>
                )}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-mono">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">| {personalInfo.phone}</a>}
                    {personalInfo.location && <span>| {personalInfo.location}</span>}
                    {personalInfo.github && <a href={formatUrl(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-600">| {personalInfo.github}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-600">| {personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-600">| {personalInfo.website}</a>}
                </div>
            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <section key="summary" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
                                // Summary
                            </h2>
                            <p className="text-sm text-slate-800 leading-relaxed">{summary}</p>
                        </section>
                    ) : null,
                    skills: (Object.keys(skillsObj).length > 0 || skillsList.length > 0) ? (
                        <section key="skills" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
                                // Technical Stack
                            </h2>
                            {Object.keys(skillsObj).length > 0 ? (
                                <div className="space-y-1.5 text-xs">
                                    {Object.entries(skillsObj).map(([cat, vals]) => (
                                        <div key={cat} className="flex gap-2">
                                            <span className="font-semibold text-slate-700 w-28 capitalize">{cat}:</span>
                                            <span className="text-slate-800 flex-1 font-mono">
                                                {Array.isArray(vals) ? vals.join(", ") : vals}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                                    {skillsList.map((skill, index) => (
                                        <span key={index} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <section key="experience" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1">
                                // Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-sm text-slate-900">
                                            {exp.position} <span className="font-normal text-slate-500">at</span> {exp.company}
                                        </h3>
                                        <span className="text-xs font-mono text-slate-500">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <ul className="list-disc ml-5 mt-1 text-xs text-slate-700 space-y-1">
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
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1">
                                // Key Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-sm text-slate-900">
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-sky-600 hover:underline">
                                                {project.link}
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-700 mt-1">{project.description}</p>
                                    {project.techStack && (
                                        <p className="text-xs font-mono mt-1" style={{ color: accentColor }}>
                                            <strong>Stack:</strong> [{project.techStack}]
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    education: education.length > 0 ? (
                        <section key="education" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b pb-1">
                                // Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3 flex justify-between items-baseline text-xs">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <p className="text-slate-600">{edu.school}</p>
                                    </div>
                                    <div className="text-right font-mono text-slate-500">
                                        <span>{edu.startYear} - {edu.endYear}</span>
                                        {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <section key="certifications" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
                                // Certifications
                            </h2>
                            <ul className="list-disc ml-5 text-xs text-slate-700 space-y-1 font-mono">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <section key="achievements" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
                                // Achievements
                            </h2>
                            <ul className="list-disc ml-5 text-xs text-slate-700 space-y-1">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages.length > 0 ? (
                        <section key="languages" className="mb-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b pb-1">
                                // Languages
                            </h2>
                            <p className="text-xs text-slate-800 font-mono">{languages.join(", ")}</p>
                        </section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages'];
                const sectionOrder = data?.sections_order || defaultOrder;
                return sectionOrder.filter(secKey => !hiddenSections.has(secKey)).map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

export default TechProfessionalTemplate;
