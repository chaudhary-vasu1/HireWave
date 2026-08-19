import React from "react";
import { parseBulletPoints } from "../../utils/bulletUtils.js";

const MinimalImageResume = ({ data }) => {
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
        <div className="max-w-[850px] mx-auto bg-white text-gray-900 p-10 font-sans">

            {/* Header */}
            <header className="flex justify-between items-start border-b border-gray-300 pb-6">

                <div className="flex-1">

                    <h1 className="text-4xl font-bold tracking-wide">
                        {personalInfo.full_name}
                    </h1>

                    <p className="text-lg text-gray-600 mt-1">
                        {personalInfo.profession}
                    </p>

                    <div className="mt-4 text-sm space-y-1">
                        {personalInfo.email && <p><a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></p>}
                        {personalInfo.phone && <p><a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a></p>}
                        {personalInfo.location && <p>{personalInfo.location}</p>}
                        {personalInfo.linkedin && <p><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.linkedin}</a></p>}
                        {personalInfo.website && <p><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.website}</a></p>}
                    </div>

                </div>

                {personalInfo.image && (
                    <img
                        src={
                            typeof personalInfo.image === "string"
                                ? personalInfo.image
                                : URL.createObjectURL(personalInfo.image)
                        }
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
                    />
                )}

            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <Section key="summary" title="Professional Summary">
                            <p>{summary}</p>
                        </Section>
                    ) : null,
                    skills: skills.length > 0 ? (
                        <Section key="skills" title="Technical Skills">
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <Section key="experience" title="Professional Experience">
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {exp.position}
                                            </h3>
                                            <p className="text-gray-600">
                                                {exp.company}
                                            </p>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <ul className="list-disc ml-5 mt-3 space-y-1">
                                        {exp.description.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Section>
                    ) : null,
                    projects: projects.length > 0 ? (
                        <Section key="projects" title="Projects">
                            {projects.map((project, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {project.title}
                                        </h3>
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
                                    {project.points && project.points.length > 1 ? (
                                        <ul className="list-disc ml-5 mt-2 space-y-1">
                                            {project.points.map((pt, i) => (
                                                <li key={i}>{pt}</li>
                                            ))}
                                        </ul>
                                    ) : project.points && project.points.length === 1 ? (
                                        <p className="mt-2">{project.points[0]}</p>
                                    ) : null}
                                    {project.techStack && (
                                        <p className="mt-2 text-sm">
                                            <strong>Tech:</strong> {project.techStack}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    ) : null,
                    education: education.length > 0 ? (
                        <Section key="education" title="Education">
                            {education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {edu.degree}
                                        </h3>
                                        <span className="text-sm">
                                            {edu.startYear} - {edu.endYear}
                                        </span>
                                    </div>
                                    <p>{edu.school}</p>
                                    {edu.cgpa && (
                                        <p className="text-sm text-gray-600">
                                            CGPA: {edu.cgpa}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <Section key="certifications" title="Certifications">
                            <ul className="list-disc ml-5">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </Section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications'];
                const sectionOrder = data?.sections_order || defaultOrder;
                return sectionOrder.filter(secKey => !hiddenSections.has(secKey)).map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="mt-8">

        <h2 className="uppercase tracking-wider font-bold text-sm border-b border-gray-300 pb-2 mb-4">
            {title}
        </h2>

        {children}

    </section>
);

export default MinimalImageResume;