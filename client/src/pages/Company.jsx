import React from "react";
import {
  Building2,
  Target,
  Eye,
  Rocket,
  Users,
  Sparkles,
} from "lucide-react";

const Company = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-600 font-medium">
          <Building2 size={18} />
          Our Company
        </span>

        <h1 className="text-5xl font-bold text-slate-900 mt-6">
          Building Better Careers with{" "}
          <span className="text-sky-500">HireWave</span>
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
          HireWave is dedicated to helping students, graduates, and professionals
          create impressive, ATS-friendly resumes that open doors to new career
          opportunities.
        </p>
      </div>

      {/* Company Overview */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">

        <div className="border rounded-2xl p-8">
          <Target className="text-sky-500 mb-4" size={34} />

          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-slate-600 leading-8">
            Our mission is to simplify resume creation through modern design,
            intelligent technology, and an intuitive user experience. We believe
            every job seeker deserves a professional resume without spending
            hours designing one.
          </p>
        </div>

        <div className="border rounded-2xl p-8">
          <Eye className="text-sky-500 mb-4" size={34} />

          <h2 className="text-2xl font-bold mb-4">
            Our Vision
          </h2>

          <p className="text-slate-600 leading-8">
            We envision a future where creating an outstanding resume is fast,
            effortless, and accessible to everyone—helping millions confidently
            take the next step in their careers.
          </p>
        </div>

      </div>

      {/* Values */}
      <div className="mb-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="border rounded-2xl p-8 hover:shadow-lg transition">
            <Sparkles className="text-sky-500 mb-4" size={30} />

            <h3 className="text-xl font-semibold mb-3">
              Innovation
            </h3>

            <p className="text-slate-600">
              We continuously improve HireWave with smarter tools, cleaner
              designs, and AI-powered features.
            </p>
          </div>

          <div className="border rounded-2xl p-8 hover:shadow-lg transition">
            <Users className="text-sky-500 mb-4" size={30} />

            <h3 className="text-xl font-semibold mb-3">
              User First
            </h3>

            <p className="text-slate-600">
              Every feature is built with job seekers in mind, making resume
              creation simple, efficient, and enjoyable.
            </p>
          </div>

          <div className="border rounded-2xl p-8 hover:shadow-lg transition">
            <Rocket className="text-sky-500 mb-4" size={30} />

            <h3 className="text-xl font-semibold mb-3">
              Growth
            </h3>

            <p className="text-slate-600">
              We believe a great resume is the first step toward landing better
              opportunities and achieving career success.
            </p>
          </div>

        </div>

      </div>

      {/* Future */}
      <div className="bg-sky-50 rounded-3xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Looking Ahead
        </h2>

        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-8">
          HireWave is constantly evolving. Our roadmap includes AI-powered resume
          writing, ATS scoring, cover letter generation, interview preparation,
          portfolio hosting, and career insights—all designed to help you stand
          out in today's competitive job market.
        </p>

      </div>

    </div>
  );
};

export default Company;