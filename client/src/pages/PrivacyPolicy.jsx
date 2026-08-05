import React from "react";
import { Shield, Lock, Database, Eye } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-100 text-sky-600 font-medium">
          <Shield size={18} />
          Privacy Policy
        </span>

        <h1 className="text-5xl font-bold text-slate-900 mt-6">
          Your Privacy Matters
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
          At HireWave, protecting your personal information is one of our
          highest priorities. This Privacy Policy explains how we collect,
          use, and safeguard your information while providing our resume
          building services.
        </p>
      </div>

      <div className="space-y-8">

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-sky-500" />
            <h2 className="text-2xl font-semibold">
              Information We Collect
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            We may collect information that you voluntarily provide while
            creating your resume, including your name, contact details,
            education, work experience, skills, and other professional
            information required to build your resume.
          </p>
        </div>

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-sky-500" />
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            Your information is used solely to provide resume creation,
            customization, PDF generation, and related services. We do not
            sell your personal information to third parties.
          </p>
        </div>

        <div className="border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-sky-500" />
            <h2 className="text-2xl font-semibold">
              Data Security
            </h2>
          </div>

          <p className="text-slate-600 leading-8">
            We implement reasonable security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
            While we strive to keep your information secure, no online service
            can guarantee absolute security.
          </p>
        </div>

        <div className="bg-sky-50 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Your Rights
          </h2>

          <p className="text-slate-600 leading-8">
            You have the right to review, update, or request deletion of your
            personal information at any time. If you have any questions
            regarding this Privacy Policy, please contact us through our
            support page.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;