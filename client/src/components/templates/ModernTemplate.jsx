import React from "react";

const ModernATSResume = ({ data, resume, accentColor = "#3B82F6" }) => {
    const rawData = data || resume || {};

    const personalInfo = rawData?.personal_info || rawData?.personalInfo || {};
    const summary = rawData?.professional_summary || rawData?.summary || "";

    let skills = [];
    if (Array.isArray(rawData?.skills)) {
        skills = rawData.skills;
    } else if (rawData?.skills && typeof rawData.skills === 'object') {
        skills = Object.values(rawData.skills).flat();
    }

    const rawExperience = rawData?.experience || [];
    const experience = rawExperience.map(exp => ({
        position: exp.position || exp.role || "",
        company: exp.company || "",
        startDate: exp.startDate || exp.start_date || exp.startYear || "",
        endDate: exp.endDate || exp.end_date || exp.endYear || (exp.is_current ? "Present" : ""),
        description: Array.isArray(exp.description) 
            ? exp.description 
            : Array.isArray(exp.responsibilities) 
            ? exp.responsibilities 
            : exp.description ? [exp.description] 
            : exp.responsibilities ? [exp.responsibilities] : []
    }));

    const rawEducation = rawData?.education || [];
    const education = rawEducation.map(edu => ({
        degree: edu.degree ? (edu.field ? `${edu.degree} in ${edu.field}` : edu.degree) : (edu.field || ""),
        institute: edu.institute || edu.institution || edu.school || "",
        year: edu.graduation_date || edu.year || (edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "")),
        cgpa: edu.gpa || edu.cgpa || ""
    }));

    const rawProjects = rawData?.projects || rawData?.project || [];
    const projects = rawProjects.map(proj => ({
        title: proj.title || proj.name || "",
        link: proj.link || proj.website || "",
        description: proj.description || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || "")
    }));

    const rawCertifications = rawData?.certifications || [];
    const certifications = rawCertifications.map(cert => 
        typeof cert === 'string' ? cert : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ")
    );

    const achievements = rawData?.achievements || [];
    const languages = rawData?.languages || [];

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

                <p className="text-lg text-gray-600 mt-1">
                    {personalInfo.profession}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4 text-gray-700">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">{personalInfo.website}</a>}
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
                            <p className="leading-7">{summary}</p>
                        </section>
                    ) : null,
                    skills: skills?.length > 0 ? (
                        <section key="skills" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-2">
                                Technical Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded bg-gray-100 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    ) : null,
                    experience: experience?.length > 0 ? (
                        <section key="experience" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Professional Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-lg">
                                            {exp.position}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <p className="font-medium text-gray-700">
                                        {exp.company}
                                    </p>
                                    <ul className="list-disc ml-5 mt-2 space-y-1">
                                        {exp.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    projects: projects?.length > 0 ? (
                        <section key="projects" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                                {project.link}
                                            </a>
                                        )}
                                    </div>
                                    <p className="mt-1">{project.description}</p>
                                    {project.techStack && (
                                        <p className="mt-2 text-sm">
                                            <strong>Tech:</strong> {project.techStack}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    education: education?.length > 0 ? (
                        <section key="education" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {edu.degree}
                                        </h3>
                                        <span>{edu.year}</span>
                                    </div>
                                    <p>{edu.institute}</p>
                                    {edu.cgpa && (
                                        <p className="text-sm text-gray-600">
                                            CGPA: {edu.cgpa}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications?.length > 0 ? (
                        <section key="certifications" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Certifications
                            </h2>
                            <ul className="list-disc ml-5">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements?.length > 0 ? (
                        <section key="achievements" className="mb-6">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Achievements
                            </h2>
                            <ul className="list-disc ml-5">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages?.length > 0 ? (
                        <section key="languages">
                            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">
                                Languages
                            </h2>
                            <p>{languages.join(", ")}</p>
                        </section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements', 'languages'];
                const sectionOrder = rawData?.sections_order || defaultOrder;
                return sectionOrder.map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

export default ModernATSResume;