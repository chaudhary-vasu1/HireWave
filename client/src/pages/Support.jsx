import { Mail, Clock, HelpCircle, FileText, Download, Shield } from "lucide-react";

const faqs = [
  {
    question: "How do I create my first resume?",
    answer:
      "Click on 'Build Resume', enter your details, customize your preferred template, and download your resume in just a few minutes.",
  },
  {
    question: "Can I edit my resume after saving it?",
    answer:
      "Yes. You can open any saved resume from your dashboard and continue editing whenever you like.",
  },
  {
    question: "Will my resume be ATS-friendly?",
    answer:
      "Yes. HireWave helps you build resumes using clean, recruiter-friendly layouts designed to improve ATS compatibility.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Absolutely. Export your resume as a professional PDF with a single click.",
  },
];

const Support = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-600 font-medium">
          <HelpCircle size={18} />
          Support Center
        </span>

        <h1 className="text-5xl font-bold text-slate-900 mt-6">
          How can we help?
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          We're here to make your resume-building experience smooth and
          stress-free. Browse our frequently asked questions or contact us if
          you need additional assistance.
        </p>
      </div>

      {/* Quick Help */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <FileText className="text-sky-500 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">
            Build Your Resume
          </h3>
          <p className="text-slate-600">
            Create professional resumes with our easy-to-use builder and modern
            templates.
          </p>
        </div>

        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <Download className="text-sky-500 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">
            Download PDF
          </h3>
          <p className="text-slate-600">
            Export your resume as a polished, high-quality PDF ready for job
            applications.
          </p>
        </div>

        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <Shield className="text-sky-500 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">
            Secure & Reliable
          </h3>
          <p className="text-slate-600">
            Your resume data is handled securely so you can focus on your job
            search with confidence.
          </p>
        </div>

      </div>

      {/* FAQs */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 hover:border-sky-300 transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {faq.question}
              </h3>

              <p className="text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Contact */}
      <div className="bg-sky-50 rounded-3xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Still Need Help?
        </h2>

        <p className="text-slate-600 mb-8">
          If you couldn't find the answer you're looking for, feel free to
          contact our support team.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">

          <div className="flex items-center gap-3">
            <Mail className="text-sky-500" />
            <span>choudharyvasu2705@gmail.om</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-sky-500" />
            <span>Mon – Fri • 9:00 AM – 6:00 PM (IST)</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Support;