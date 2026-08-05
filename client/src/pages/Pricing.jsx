import React from "react";
import { Check, Star } from "lucide-react";
import  {Link} from "react-router-dom";

const freeFeatures = [
  "1 Professional Resume",
  "ATS-Friendly Templates",
  "Easy Resume Builder",
  "One-Click PDF Export",
  "Basic Customization",
  "Email Support",
];

const proFeatures = [
  "Unlimited Resumes",
  "Everything in Free",
  "Premium Resume Templates",
  "AI Resume Suggestions",
  "ATS Resume Score",
  "Cover Letter Generator",
  "Cloud Resume Storage",
  "Priority Support",
];

const Pricing = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-5 py-2 rounded-full font-medium">
          <Star size={18} />
          Simple & Transparent Pricing
        </span>

        <h1 className="text-5xl font-bold text-slate-900 mt-6">
          Choose the Right Plan
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
          Whether you're creating your first resume or preparing for your next
          career move, HireWave has a plan designed for you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Free Plan */}
        <div className="border rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-slate-900">
            Free
          </h3>

          <p className="text-slate-500 mt-2">
            Perfect for students and first-time job seekers.
          </p>

          <div className="mt-8">
            <span className="text-5xl font-bold">₹0</span>
            <span className="text-slate-500"> / Forever</span>
          </div>

          <Link to = '/app'><button className="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition">
            Get Started Free
          </button>
          </Link>

          <div className="mt-8 space-y-4">
            {freeFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="relative border-2 border-sky-500 rounded-3xl p-8 shadow-lg">

          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-5 py-1 rounded-full text-sm font-semibold">
            Coming Soon
          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            Pro
          </h3>

          <p className="text-slate-500 mt-2">
            For professionals who want advanced AI-powered tools.
          </p>

          <div className="mt-8">
            <span className="text-5xl font-bold">₹299</span>
            <span className="text-slate-500"> / month</span>
          </div>

          <button
            disabled
            className="w-full mt-8 bg-slate-200 text-slate-500 py-3 rounded-xl font-semibold cursor-not-allowed"
          >
            Coming Soon
          </button>

          <div className="mt-8 space-y-4">
            {proFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="text-green-500" size={18} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* FAQ */}
      <div className="mt-20 bg-sky-50 rounded-3xl p-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">

          <div>
            <h3 className="font-semibold text-lg">
              Is HireWave really free?
            </h3>

            <p className="text-slate-600 mt-2">
              Yes. You can create and download professional resumes using our
              Free plan without paying anything.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Will there be a Pro plan?
            </h3>

            <p className="text-slate-600 mt-2">
              Yes. We plan to introduce AI-powered resume optimization,
              premium templates, cover letter generation, and more advanced
              features in the Pro plan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Can I upgrade later?
            </h3>

            <p className="text-slate-600 mt-2">
              Absolutely. You can switch to the Pro plan whenever it becomes
              available.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Pricing;