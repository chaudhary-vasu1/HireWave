import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-slate-900">
          About <span className="text-sky-500">HireWave</span>
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
          HireWave is an AI-powered resume builder designed to help job seekers
          create professional, ATS-friendly resumes with ease. Our mission is
          to simplify resume creation and empower everyone to make a lasting
          first impression.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
          alt="Team working together"
          className="rounded-2xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Our Story
          </h2>

          <p className="text-slate-600 leading-8">
            Writing a resume shouldn't be difficult. We created HireWave to make
            resume building faster, smarter, and more effective. Whether you're
            a student, a recent graduate, or an experienced professional,
            HireWave provides modern templates, AI-powered suggestions, and ATS
            optimization to help you stand out in today's competitive job
            market.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-sky-50 rounded-3xl p-10 mb-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
          Our Mission
        </h2>

        <p className="text-center text-slate-600 text-lg max-w-4xl mx-auto leading-8">
          Our mission is to make professional resume creation accessible to
          everyone by combining intuitive design with AI technology. We aim to
          help users save time, improve their resumes, and confidently apply for
          their dream jobs.
        </p>
      </div>

      {/* Why Choose HireWave */}
      <div>
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Why Choose HireWave?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              🤖 AI Assistance
            </h3>

            <p className="text-slate-600">
              Generate impactful content and improve your resume with
              intelligent AI suggestions.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              🎯 ATS-Friendly
            </h3>

            <p className="text-slate-600">
              Build resumes optimized for Applicant Tracking Systems to increase
              your chances of getting shortlisted.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              📄 Professional Templates
            </h3>

            <p className="text-slate-600">
              Choose from clean, modern, recruiter-approved templates and
              download your resume as a high-quality PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;