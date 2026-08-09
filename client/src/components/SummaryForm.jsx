import React, { useState } from 'react';
import { FileText, Sparkles, Wand2, Lightbulb, Trash2, Check, Copy } from 'lucide-react';

const sampleSummaries = {
  "Software Engineer": "Results-driven Software Engineer with 4+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud architectures with a track record of optimizing application performance by 35%. Strong advocate for clean code and agile methodologies.",
  "Full Stack Developer": "Versatile Full Stack Developer with expertise in modern JavaScript frameworks, RESTful APIs, and database management. Proven ability to take projects from conceptualization to deployment, delivering high-impact user experiences.",
  "Data Scientist": "Detail-oriented Data Scientist specializing in machine learning, statistical analysis, and predictive modeling. Experienced in Python, SQL, and data visualization tools, turning complex datasets into actionable business insights.",
  "Product Manager": "Strategic Product Manager with experience leading cross-functional teams to build user-centric digital products. Skilled in roadmap planning, customer research, and data-driven prioritization that accelerated product growth.",
  "UI/UX Designer": "Creative UI/UX Designer passionate about crafting intuitive, accessible, and visually captivating digital experiences. Skilled in user research, wireframing, prototyping, and design systems."
};

const SummaryForm = ({ data = "", onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleTextChange = (e) => {
    onChange(e.target.value);
  };

  const wordCount = data ? data.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = data ? data.length : 0;

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let enhanced = data;
      if (!data || data.trim().length < 10) {
        enhanced = "Innovative and results-oriented professional with a strong track record of success. Proven expertise in solving complex problems, collaborating across teams, and delivering high-quality results in fast-paced environments.";
      } else {
        enhanced = `${data.trim()} Demonstrated track record of driving impactful results, streamlining workflows, and leveraging core competencies to achieve organizational goals.`;
      }
      onChange(enhanced);
      setIsGenerating(false);
    }, 600);
  };

  const handleSelectSample = (role) => {
    setSelectedRole(role);
    if (sampleSummaries[role]) {
      onChange(sampleSummaries[role]);
    }
  };

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <FileText className="size-5 text-sky-600" />
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Write a short and impactful summary highlighting your key achievements and goals.
          </p>
        </div>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
        >
          <Sparkles className={`size-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
        </button>
      </div>

      {/* Quick Role Templates Chips */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
          <Wand2 className="size-3.5 text-purple-600" />
          Quick Samples by Role:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(sampleSummaries).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSelectSample(role)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                selectedRole === role
                  ? 'bg-sky-50 border-sky-400 text-sky-700 font-medium'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Summary Content</label>
          <div className="flex items-center gap-2">
            {data && (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600 transition-colors cursor-pointer"
                  title="Copy text"
                >
                  {copied ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  title="Clear summary"
                >
                  <Trash2 className="size-3.5" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        <textarea
          rows={6}
          className="w-full p-3.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all leading-relaxed"
          placeholder="Write a compelling professional summary... e.g. Results-driven Software Engineer with 4+ years of experience specializing in web applications and backend systems..."
          value={data}
          onChange={handleTextChange}
        />

        {/* Counter & Word status */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Words: <strong className="text-gray-700">{wordCount}</strong> | Characters: <strong className="text-gray-700">{charCount}</strong>
          </span>
          <span className={wordCount >= 40 && wordCount <= 100 ? "text-green-600 font-medium" : "text-gray-400"}>
            Recommended: 40-80 words
          </span>
        </div>
      </div>

      {/* Guidance / Tips Box */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800">
        <Lightbulb className="size-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Pro Tip for ATS Resumes:</span> Keep your summary to 3-5 concise sentences. Include your title, years of experience, core technical skills, and quantifiable achievements.
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
