import { FileText, CheckCircle, AlertTriangle, Scale } from "lucide-react";

const Terms = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-600 font-medium">
          <FileText size={18} />
          Terms & Conditions
        </span>

        <h1 className="text-5xl font-bold text-slate-900 mt-6">
          Terms of Use
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
          By accessing or using HireWave, you agree to comply with the
          following terms and conditions. Please read them carefully before
          using our services.
        </p>
      </div>

      <div className="space-y-8">

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-green-500" />
            <h2 className="text-2xl font-semibold">
              Acceptable Use
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            HireWave is intended for creating professional resumes and career
            documents. Users agree not to misuse the platform or submit
            misleading, fraudulent, or unlawful content.
          </p>
        </div>

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-sky-500" />
            <h2 className="text-2xl font-semibold">
              Intellectual Property
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            All website content, branding, logos, templates, and software are
            the property of HireWave unless otherwise stated. Unauthorized
            reproduction or redistribution is prohibited.
          </p>
        </div>

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-orange-500" />
            <h2 className="text-2xl font-semibold">
              Disclaimer
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            HireWave provides tools to assist users in creating professional
            resumes. While we strive to improve your chances of securing job
            opportunities, we cannot guarantee interviews, job offers, or
            employment outcomes.
          </p>
        </div>

        <div className="bg-sky-50 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Changes to These Terms
          </h2>

          <p className="text-slate-600 leading-8">
            We may update these Terms from time to time to reflect changes in
            our services or legal requirements. Continued use of HireWave
            following any updates constitutes acceptance of the revised Terms.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;