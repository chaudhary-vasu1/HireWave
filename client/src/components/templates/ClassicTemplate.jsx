import React from "react";

const ClassicATSResume = ({ data }) => {
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
        startDate: exp.startDate || exp.start_date || exp.startYear || "",
        endDate: exp.endDate || exp.end_date || exp.endYear || (exp.is_current ? "Present" : ""),
        description: Array.isArray(exp.description) 
            ? exp.description 
            : Array.isArray(exp.responsibilities) 
            ? exp.responsibilities 
            : exp.description ? [exp.description] 
            : exp.responsibilities ? [exp.responsibilities] : []
    }));

    const rawEducation = data?.education || [];
    const education = rawEducation.map(edu => ({
        degree: edu.degree ? (edu.field ? `${edu.degree} in ${edu.field}` : edu.degree) : (edu.field || ""),
        institute: edu.institute || edu.institution || edu.school || "",
        startYear: edu.startYear || edu.startDate || "",
        endYear: edu.endYear || edu.endDate || edu.graduation_date || "",
        cgpa: edu.gpa || edu.cgpa || ""
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
        <div className="max-w-[850px] mx-auto bg-white text-black p-10 font-serif leading-relaxed">
            {/* Header */}
            <header className="text-center border-b-2 border-black pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-wide">
                    {personalInfo.full_name}
                </h1>

                {personalInfo.profession && (
                    <p className="mt-1 text-lg">{personalInfo.profession}</p>
                )}

                <div className="mt-3 text-sm flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
            </header>

            {/* Summary */}
            {/* Dynamic Sections Order */}
            {(() => {
                const renderSectionMap = {
                    summary: summary ? (
                        <section key="summary" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
                                Professional Summary
                            </h2>
                            <p className="text-sm text-justify">{summary}</p>
                        </section>
                    ) : null,
                    skills: skills.length > 0 ? (
                        <section key="skills" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
                                Technical Skills
                            </h2>
                            <p className="text-sm">
                                {skills.join(" • ")}
                            </p>
                        </section>
                    ) : null,
                    experience: experience.length > 0 ? (
                        <section key="experience" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-3">
                                Professional Experience
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-5">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">
                                            {exp.position}
                                        </h3>
                                        <span className="text-sm">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="italic text-sm">
                                        {exp.company}
                                    </div>
                                    <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
                                        {(exp.description || []).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    ) : null,
                    projects: projects.length > 0 ? (
                        <section key="projects" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-3">
                                Projects
                            </h2>
                            {projects.map((project, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <span className="text-sm">
                                                {project.link}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm mt-1">
                                        {project.description}
                                    </p>
                                    {project.techStack && (
                                        <p className="text-sm mt-1">
                                            <strong>Technologies:</strong> {project.techStack}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    education: education.length > 0 ? (
                        <section key="education" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-3">
                                Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">
                                            {edu.degree}
                                        </h3>
                                        <span className="text-sm">
                                            {edu.startYear} - {edu.endYear}
                                        </span>
                                    </div>
                                    <p className="italic text-sm">
                                        {edu.institute}
                                    </p>
                                    {edu.cgpa && (
                                        <p className="text-sm">
                                            CGPA: {edu.cgpa}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    ) : null,
                    certifications: certifications.length > 0 ? (
                        <section key="certifications" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-3">
                                Certifications
                            </h2>
                            <ul className="list-disc ml-6 text-sm space-y-1">
                                {certifications.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    achievements: achievements.length > 0 ? (
                        <section key="achievements" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-3">
                                Achievements
                            </h2>
                            <ul className="list-disc ml-6 text-sm space-y-1">
                                {achievements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null,
                    languages: languages.length > 0 ? (
                        <section key="languages" className="mt-6">
                            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
                                Languages
                            </h2>
                            <p className="text-sm">
                                {languages.join(", ")}
                            </p>
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

export default ClassicATSResume;