import React from "react";

const ATSPremiumResume = ({ data }) => {
    const personalInfo = data?.personal_info || data?.personalInfo || {};
    const summary = data?.professional_summary || data?.summary || "";
    
    const hiddenSections = new Set(data?.hidden_sections || []);
    
    let skills = {};
    if (data?.skills && typeof data.skills === 'object' && !Array.isArray(data.skills)) {
        skills = Object.fromEntries(
            Object.entries(data.skills)
                .map(([key, val]) => [
                    key,
                    Array.isArray(val) ? val.filter(s => typeof s === 'string' && s.trim().length > 0).join(", ") : String(val).trim()
                ])
                .filter(([_, val]) => val.length > 0)
        );
    } else if (Array.isArray(data?.skills)) {
        const cleanSkills = data.skills.filter(s => typeof s === 'string' && s.trim().length > 0);
        if (cleanSkills.length > 0) {
            skills = { "Skills": cleanSkills.join(", ") };
        }
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
        link: proj.link || proj.website || proj.live_demo || "",
        github: proj.github || proj.github_link || proj.githubUrl || proj.repo || "",
        duration: proj.duration || "",
        techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || proj.type || ""),
        points: (Array.isArray(proj.points) ? proj.points : (proj.description ? [proj.description] : [])).filter(item => typeof item === 'string' && item.trim().length > 0)
    })).filter(proj => proj.title.trim() || proj.points.length > 0 || proj.link.trim() || proj.github.trim());

    const rawCertifications = data?.certifications || [];
    const certifications = rawCertifications
        .map(cert => typeof cert === 'string' ? cert.trim() : [cert.title, cert.issuer, cert.year].filter(Boolean).join(" - ").trim())
        .filter(cert => cert.length > 0);

    const achievements = (data?.achievements || []).filter(a => typeof a === 'string' && a.trim().length > 0);

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
            return url;
        }
        return `https://${url}`;
    };

    return (
        <div
            className="w-[210mm] min-h-[297mm] mx-auto bg-white text-gray-900
      px-10 py-8 font-sans text-[14px] leading-6"
        >
            {/* HEADER */}
            <header className="border-b-2 border-gray-800 pb-4">
                <h1 className="text-3xl font-bold tracking-wide uppercase">
                    {personalInfo.full_name}
                </h1>

                <p className="text-lg mt-1 text-gray-700">
                    {personalInfo.profession}
                </p>

                <div className="mt-3 text-[13px] flex flex-wrap gap-x-5 gap-y-1">
                    {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>}
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">{personalInfo.website}</a>}
                </div>
            </header>

            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <Section key="summary" title="Professional Summary">
                            <p>{summary}</p>
                        </Section>
                    ) : null,
                    skills: Object.keys(skills).length > 0 ? (
                        <Section key="skills" title="Technical Skills">
                            <div className="space-y-1">
                                {Object.entries(skills).map(([category, value]) => (
                                    <p key={category}>
                                        <strong>{category}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        </Section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <Section key="experience" title="Professional Experience">
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">
                                            {exp.position}
                                        </h3>
                                        <span>
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <p className="italic">{exp.company}</p>
                                    <ul className="list-disc ml-5 mt-2 space-y-1">
                                        {exp.description.map((item, i) => (
                                            <li key={i}>{item}</li>
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
                                    <div className="flex justify-between flex-wrap gap-1">
                                        <h3 className="font-semibold">
                                            {project.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs">
                                            {project.link && (
                                                <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                                    {project.link}
                                                </a>
                                            )}
                                            {project.link && project.github && <span className="text-gray-400">|</span>}
                                            {project.github && (
                                                <a href={formatUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline font-mono">
                                                    {project.github}
                                                </a>
                                            )}
                                            {project.duration && <span className="ml-1">{project.duration}</span>}
                                        </div>
                                    </div>
                                    {project.techStack && (
                                        <p>
                                            <strong>Tech Stack:</strong> {project.techStack}
                                        </p>
                                    )}
                                    {project.points && project.points.length > 0 && (
                                        <ul className="list-disc ml-5 mt-2">
                                            {project.points.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </Section>
                    ) : null,
                    education: education.length > 0 ? (
                        <Section key="education" title="Education">
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between">
                                        <strong>{edu.degree}</strong>
                                        <span>
                                            {edu.startYear} - {edu.endYear}
                                        </span>
                                    </div>
                                    <p>{edu.school}</p>
                                    {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                </div>
                            ))}
                        </Section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <Section key="certifications" title="Certifications">
                            <ul className="list-disc ml-5">
                                {certifications.map((cert, i) => (
                                    <li key={i}>{cert}</li>
                                ))}
                            </ul>
                        </Section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <Section key="achievements" title="Achievements">
                            <ul className="list-disc ml-5">
                                {achievements.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </Section>
                    ) : null,
                };

                const defaultOrder = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements'];
                const sectionOrder = data?.sections_order || defaultOrder;
                return sectionOrder.filter(secKey => !hiddenSections.has(secKey)).map(secKey => renderSectionMap[secKey]);
            })()}
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="mt-6">
        <h2 className="text-[15px] font-bold uppercase border-b border-gray-800 pb-1 mb-3">
            {title}
        </h2>

        {children}
    </section>
);

export default ATSPremiumResume;