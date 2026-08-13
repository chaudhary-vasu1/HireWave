import React from "react";

const ModernATSResume = ({ data, resume, accentColor = "#3B82F6" }) => {
    const rawData = data || resume || {};

    const personalInfo = rawData?.personal_info || rawData?.personalInfo || {};
    const summary = rawData?.professional_summary || rawData?.summary || "";

    const hiddenSections = new Set(rawData?.hidden_sections || []);

    let skills = [];
    if (Array.isArray(rawData?.skills)) {
        skills = rawData.skills.filter(s => typeof s === 'string' && s.trim().length > 0);
    } else if (rawData?.skills && typeof rawData.skills === 'object') {
        skills = Object.values(rawData.skills).flat().filter(s => typeof s === 'string' && s.trim().length > 0);
    }

    const rawExperience = rawData?.experience || [];
    const experience = rawExperience.map(exp => ({
        position: exp.position || exp.role || "",
        company: exp.company || "",
        startDate: exp.startDate || exp.start_date || exp.startYear || "",
        endDate: exp.endDate || exp.end_date || exp.endYear || (exp.is_current ? "Present" : ""),
        description: (Array.isArray(exp.description) 
            ? exp.description 
            : Array.isArray(exp.responsibilities) 
            ? exp.responsibilities 
            : exp.description ? [exp.description] 
            : exp.responsibilities ? [exp.responsibilities] : []).filter(item => typeof item === 'string' && item.trim().length > 0)
    })).filter(exp => exp.position.trim() || exp.company.trim() || exp.description.length > 0);

    const rawEducation = rawData?.education || [];
    const education = rawEducation.map(edu => ({
        degree: edu.degree ? (edu.field ? `${edu.degree} in ${edu.field}` : edu.degree) : (edu.field || ""),
        institute: edu.institute || edu.institution || edu.school || "",
        year: edu.graduation_date || edu.year || (edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "")),
        cgpa: edu.gpa || edu.cgpa || ""
    })).filter(edu => edu.degree.trim() || edu.institute.trim());

    const rawProjects = rawData?.projects || rawData?.project || [];
    const projects = rawProjects.map(proj => ({
        title: proj.title || proj.name || "",
        link: proj.link || proj.website || proj.live_demo || "",
        github: proj.github || proj.github_link || proj.githubUrl || proj.repo || "",
        description: proj.description || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || "")
    })).filter(proj => proj.title.trim() || proj.description.trim() || proj.link.trim() || proj.github.trim());

    const rawCertifications = rawData?.certifications || [];
    const certifications = rawCertifications
        .map(cert => typeof cert === 'string' ? cert.trim() : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ").trim())
        .filter(cert => cert.length > 0);

    const achievements = (rawData?.achievements || []).filter(a => typeof a === 'string' && a.trim().length > 0);
    const languages = (rawData?.languages || []).filter(l => typeof l === 'string' && l.trim().length > 0);

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
            return url;
        }
        return `https://${url}`;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 p-10 shadow-lg font-sans">

            {/* Header */}
            <header className="border-b-2 pb-5 mb-6" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-wide">
                    {personalInfo.full_name}
                </h1>
                {personalInfo.profession && (
                    <p className="text-lg font-semibold mt-1" style={{ color: accentColor }}>
                        {personalInfo.profession}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm mt-3 text-gray-600">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.website}</a>}
                </div>
            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <section key="summary" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">
                                Professional Summary
                            </h2>
                            <p className="text-sm leading-relaxed text-justify">{summary}</p>
                        </section>
                    ) : null,
                    skills: skills.length > 0 ? (
                        <section key="skills" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">
                                Technical Skills
                            </h2>
                            <p className="text-sm">{skills.join(" • ")}</p>
                        </section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <section key="experience" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Professional Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-base">{exp.position}</h3>
                                        <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-semibold italic text-gray-700">{exp.company}</p>
                                    <ul className="list-disc ml-5 mt-1 text-sm space-y-1 text-gray-800">
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
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-base">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-sm">
                                            {project.link && (
                                                <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                                    {project.link}
                                                </a>
                                            )}
                                            {project.link && project.github && <span className="text-gray-400">|</span>}
                                            {project.github && (
                                                <a href={formatUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                                                    {project.github}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm mt-1">{project.description}</p>
                                    {project.techStack && (
                                        <p className="text-sm mt-1 text-gray-700">
                                            <strong>Tech:</strong> {project.techStack}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    education: education.length > 0 ? (
                        <section key="education" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-base">{edu.degree}</h3>
                                        <span className="text-sm text-gray-600">{edu.year}</span>
                                    </div>
                                    <p className="text-sm italic text-gray-700">{edu.institute}</p>
                                    {edu.cgpa && <p className="text-sm">CGPA: {edu.cgpa}</p>}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <section key="certifications" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">
                                Certifications
                            </h2>
                            <ul className="list-disc ml-5 text-sm space-y-1">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <section key="achievements" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">
                                Achievements
                            </h2>
                            <ul className="list-disc ml-5 text-sm space-y-1">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages.length > 0 ? (
                        <section key="languages" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Languages
                            </h2>
                            <p>{languages.join(", ")}</p>
                        </section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements', 'languages'];
                const sectionOrder = rawData?.sections_order || defaultOrder;
                return sectionOrder.filter(secKey => !hiddenSections.has(secKey)).map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

export default ModernATSResume;