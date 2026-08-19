import React from "react";
import { parseBulletPoints } from "../../utils/bulletUtils.js";

const CompactATSTemplate = ({ data, accentColor = "#0f766e" }) => {
    const personalInfo = data?.personal_info || data?.personalInfo || {};
    const summary = data?.professional_summary || data?.summary || "";

    const hiddenSections = new Set(data?.hidden_sections || []);

    let skills = [];
    if (Array.isArray(data?.skills)) {
        skills = data.skills.filter(s => typeof s === 'string' && s.trim().length > 0);
    } else if (data?.skills && typeof data.skills === 'object') {
        skills = Object.values(data.skills).flat().filter(s => typeof s === 'string' && s.trim().length > 0);
    }

    const rawExperience = data?.experience || [];
    const experience = rawExperience.map(exp => ({
        position: exp.position || exp.role || "",
        company: exp.company || "",
        startDate: exp.startDate || exp.startYear || "",
        endDate: exp.endDate || exp.endYear || "Present",
        description: parseBulletPoints(exp.description || exp.responsibilities)
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
        link: proj.link || proj.website || proj.live_demo || "",
        github: proj.github || proj.github_link || proj.githubUrl || proj.repo || "",
        description: proj.description || "",
        points: parseBulletPoints(proj.description || proj.points),
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || "")
    })).filter(proj => proj.title.trim() || proj.points.length > 0 || proj.link.trim() || proj.github.trim());

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
                    {personalInfo.email && <div><a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></div>}
                    {personalInfo.phone && <div><a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a></div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.linkedin && <div><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.linkedin}</a></div>}
                    {personalInfo.website && <div><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.website}</a></div>}
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
                                        <div className="flex items-center gap-2 text-[11px]">
                                            {project.link && (
                                                <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                                    {project.link}
                                                </a>
                                            )}
                                            {project.link && project.github && <span className="text-slate-400">|</span>}
                                            {project.github && (
                                                <a href={formatUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline">
                                                    {project.github}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {project.points && project.points.length > 1 ? (
                                        <ul className="list-disc ml-4 mt-0.5 text-xs text-slate-700 space-y-0.5">
                                            {project.points.map((pt, i) => (
                                                <li key={i}>{pt}</li>
                                            ))}
                                        </ul>
                                    ) : project.points && project.points.length === 1 ? (
                                        <p className="text-slate-700 mt-0.5">{project.points[0]}</p>
                                    ) : null}
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
                return sectionOrder.filter(secKey => !hiddenSections.has(secKey)).map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

export default CompactATSTemplate;
