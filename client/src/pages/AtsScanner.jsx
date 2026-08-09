import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Scan, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  LoaderCircle, 
  Target, 
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import pdfToText from 'react-pdftotext';
import api from '../configs/api.js';
import toast from 'react-hot-toast';

const AtsScanner = () => {
  const { token } = useSelector(state => state.auth);

  const [activeInputType, setActiveInputType] = useState('upload'); // 'upload' | 'select' | 'paste'
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [allResumes, setAllResumes] = useState([]);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Fetch saved user resumes for "select" option
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (token) {
          const { data } = await api.get('/api/users/resumes', {
            headers: { Authorization: token }
          });
          setAllResumes(data.resumes || []);
        }
      } catch (err) {
        console.error("Failed to load user resumes", err);
      }
    };
    fetchResumes();
  }, [token]);

  const handleScan = async () => {
    let textToScan = '';

    if (activeInputType === 'upload') {
      if (!file) {
        toast.error("Please select a PDF resume file to upload.");
        return;
      }
      try {
        textToScan = await pdfToText(file);
      } catch (err) {
        toast.error("Failed to extract text from PDF. Please check the file or try pasting text directly.");
        return;
      }
    } else if (activeInputType === 'select') {
      if (!selectedResumeId) {
        toast.error("Please select one of your saved resumes.");
        return;
      }
      const chosen = allResumes.find(r => String(r._id) === String(selectedResumeId));
      if (!chosen) {
        toast.error("Selected resume not found.");
        return;
      }
      // Combine resume content into text
      const info = chosen.personal_info || {};
      const expText = (chosen.experience || []).map(e => `${e.position} at ${e.company}: ${Array.isArray(e.description) ? e.description.join(' ') : (e.description || '')}`).join('\n');
      const eduText = (chosen.education || []).map(ed => `${ed.degree} in ${ed.field} at ${ed.institution}`).join('\n');
      const skillsText = (chosen.skills || []).join(', ');

      textToScan = `
        ${info.full_name || ''} - ${info.profession || ''}
        Email: ${info.email || ''} | Phone: ${info.phone || ''}
        Summary: ${chosen.professional_summary || ''}
        Experience:
        ${expText}
        Education:
        ${eduText}
        Skills: ${skillsText}
      `;
    } else if (activeInputType === 'paste') {
      if (!pastedText || pastedText.trim().length < 20) {
        toast.error("Please paste at least 20 characters of resume text.");
        return;
      }
      textToScan = pastedText;
    }

    if (!textToScan || textToScan.trim().length < 20) {
      toast.error("Unable to gather resume text for scanning.");
      return;
    }

    setIsScanning(true);
    try {
      const { data } = await api.post('/api/ai/scan-ats', {
        resumeText: textToScan,
        targetRole,
        jobDescription
      }, {
        headers: { Authorization: token }
      });

      if (data.scanResult) {
        setScanResult(data.scanResult);
        toast.success("ATS Scan completed successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to scan resume. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-500', border: 'border-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (score >= 60) return { text: 'text-amber-600', bg: 'bg-amber-500', border: 'border-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { text: 'text-rose-600', bg: 'bg-rose-500', border: 'border-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold border border-sky-200/80 shadow-2xs">
            <Sparkles className="size-3.5 text-sky-600 animate-pulse" />
            AI-Powered Resume Auditor
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ATS Resume <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Scanner & Auditor</span>
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Instantly evaluate your resume against Applicant Tracking System (ATS) filters, unlock detailed category scores, discover missing keywords, and get actionable tips to land more interviews.
          </p>
        </div>

        {/* Input & Form Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-sky-950/5 p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Input Source Selector Tabs */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">
              Step 1: Provide Your Resume
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setActiveInputType('upload')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInputType === 'upload'
                    ? 'bg-white text-sky-600 shadow-sm shadow-sky-950/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="size-4" />
                <span className="hidden sm:inline">Upload PDF</span>
                <span className="sm:hidden">Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveInputType('select')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInputType === 'select'
                    ? 'bg-white text-sky-600 shadow-sm shadow-sky-950/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="size-4" />
                <span className="hidden sm:inline">Saved Resume</span>
                <span className="sm:hidden">Saved</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveInputType('paste')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInputType === 'paste'
                    ? 'bg-white text-sky-600 shadow-sm shadow-sky-950/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="size-4" />
                <span className="hidden sm:inline">Paste Text</span>
                <span className="sm:hidden">Paste</span>
              </button>
            </div>
          </div>

          {/* Input Source Content */}
          <div>
            {activeInputType === 'upload' && (
              <label className="block cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-8 bg-slate-50/50 hover:bg-sky-50/30 transition-all text-center group">
                  <UploadCloud className="size-10 text-sky-500 group-hover:scale-110 transition-transform" />
                  <div>
                    {file ? (
                      <p className="text-sm font-semibold text-sky-700">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-800">Click to upload your PDF resume</p>
                        <p className="text-xs text-slate-500 mt-1">Supports standard .pdf files</p>
                      </>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            )}

            {activeInputType === 'select' && (
              <div className="space-y-2">
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none cursor-pointer transition-all"
                >
                  <option value="">-- Choose from your HireWave resumes --</option>
                  {allResumes.map(r => (
                    <option key={r._id} value={r._id}>
                      {r.title || 'Untitled Resume'} ({new Date(r.updatedAt || Date.now()).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                {allResumes.length === 0 && (
                  <p className="text-xs text-amber-600">No saved resumes found in your account yet. Try uploading a PDF or pasting text.</p>
                )}
              </div>
            )}

            {activeInputType === 'paste' && (
              <textarea
                rows={5}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your full resume content here..."
                className="w-full p-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all resize-none leading-relaxed"
              />
            )}
          </div>

          {/* Step 2: Optional Target Job Matching */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target className="size-3.5 text-sky-600" />
                Step 2: Target Role & Description (Optional)
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Improves Keyword Alignment Accuracy</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Target Job Title (e.g. Senior Frontend Developer)"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all"
              />
              <textarea
                rows={1}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description / Requirements..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Scan Action Button */}
          <button
            type="button"
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-3.5 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-60"
          >
            {isScanning ? (
              <>
                <LoaderCircle className="size-5 animate-spin text-white" />
                <span>Auditing & Scoring Resume with AI...</span>
              </>
            ) : (
              <>
                <Scan className="size-5" />
                <span>Scan & Calculate ATS Score</span>
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {scanResult && (
          <div className="space-y-6 transition-all duration-500 animate-in fade-in">
            
            {/* Overall Score Header Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Score Gauge Ring */}
                <div className="flex items-center gap-6">
                  <div className={`relative w-28 h-28 rounded-full border-8 ${getScoreColor(scanResult.overallScore).border} flex items-center justify-center shadow-inner`}>
                    <div className="text-center">
                      <span className={`text-3xl font-extrabold ${getScoreColor(scanResult.overallScore).text}`}>
                        {scanResult.overallScore}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">/ 100</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(scanResult.overallScore).badge}`}>
                        {scanResult.overallScore >= 80 ? 'Excellent Match' : scanResult.overallScore >= 60 ? 'Moderate Match' : 'Needs Optimization'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Overall ATS Score</h2>
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                      {scanResult.summary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setScanResult(null)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50"
                >
                  <RotateCcw className="size-3.5" />
                  Reset Scan
                </button>
              </div>

              {/* Sub-Category Score Bars */}
              {scanResult.categoryScores && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
                  {Object.entries(scanResult.categoryScores).map(([key, score]) => (
                    <div key={key} className="space-y-1.5 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="capitalize text-slate-600">
                          {key === 'experienceImpact' ? 'Impact' : key === 'skillsMatch' ? 'Skills' : key}
                        </span>
                        <span className={getScoreColor(score).text}>{score}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getScoreColor(score).bg} transition-all duration-1000`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3 Column Feedback Breakdown Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Strengths */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 className="size-5" />
                  Key Strengths
                </div>
                <ul className="space-y-2.5">
                  {(scanResult.strengths || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                  <AlertTriangle className="size-5" />
                  Missing Keywords
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(scanResult.missingKeywords || []).map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full text-xs font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Improvements */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 space-y-4">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <Lightbulb className="size-5" />
                  Recommended Fixes
                </div>
                <ul className="space-y-2.5">
                  {(scanResult.improvements || []).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <ArrowRight className="size-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AtsScanner;
