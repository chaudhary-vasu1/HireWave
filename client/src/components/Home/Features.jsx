import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12"
    >
      {/* Badge */}
      <div className="flex items-center gap-2 text-sm text-sky-600 bg-blue-400/10 border border-sky-200 rounded-full px-6 py-1.5">
        <Zap width={14} />
        <span>Create. Optimize. Get Hired.</span>
      </div>

      {/* Section Title */}
      <Title
        title="Build Your Resume with Confidence"
        description="Create ATS-friendly resumes in minutes using AI-powered suggestions, modern templates, and effortless customization."
      />

      {/* Features */}
      <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Resume Builder Preview"
        />

        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors ${
                !isHover ? "border-violet-300 bg-violet-100" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-violet-600"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  AI Resume Builder
                </h3>

                <p className="text-sm text-slate-600 max-w-xs">
                  Generate professional, ATS-friendly resumes with intelligent
                  AI suggestions tailored to your career goals.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-sky-100 border border-transparent group-hover:border-sky-300 flex gap-4 rounded-xl transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-sky-600"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  ATS Optimization
                </h3>

                <p className="text-sm text-slate-600 max-w-xs">
                  Improve your chances of getting shortlisted with
                  recruiter-friendly formatting and keyword optimization.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  One-Click PDF Export
                </h3>

                <p className="text-sm text-slate-600 max-w-xs">
                  Download polished, professional PDF resumes instantly and
                  apply to your dream jobs with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Features;