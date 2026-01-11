import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features: { name: string; us: boolean | "partial"; traditional: boolean | "partial"; diy: boolean | "partial" }[] = [
    { name: "Rapid Delivery (weeks, not months)", us: true, traditional: false, diy: "partial" },
    { name: "Multi-format Output (eBook, Video, Audio)", us: true, traditional: "partial", diy: "partial" },
    { name: "WCAG 2.1 AA Accessibility Built-in", us: true, traditional: "partial", diy: false },
    { name: "Enterprise Quality Design", us: true, traditional: true, diy: false },
    { name: "LMS-Ready Packages", us: true, traditional: true, diy: false },
    { name: "Interactive Knowledge Checks", us: true, traditional: "partial", diy: false },
    { name: "AI-Enhanced Production", us: true, traditional: false, diy: "partial" },
    { name: "Revisions Included", us: true, traditional: "partial", diy: true },
    { name: "Affordable Pricing", us: true, traditional: false, diy: true },
  ];

  const getStatusText = (status: boolean | "partial") => {
    if (status === true) return "Supported";
    if (status === "partial") return "Partially supported";
    return "Not supported";
  };

  const renderIcon = (status: boolean | "partial", featureName: string, provider: string) => {
    const statusText = getStatusText(status);
    const fullLabel = `${featureName}: ${statusText} by ${provider}`;
    
    if (status === true) {
      return (
        <div className="flex justify-center" role="img" aria-label={fullLabel}>
          <Check className="text-green-400 w-6 h-6" aria-hidden="true" />
          <span className="sr-only">{statusText}</span>
        </div>
      );
    }
    if (status === "partial") {
      return (
        <div className="flex justify-center" role="img" aria-label={fullLabel}>
          <Minus className="text-yellow-500 w-6 h-6" aria-hidden="true" />
          <span className="sr-only">{statusText}</span>
        </div>
      );
    }
    return (
      <div className="flex justify-center" role="img" aria-label={fullLabel}>
        <X className="text-red-500 w-6 h-6" aria-hidden="true" />
        <span className="sr-only">{statusText}</span>
      </div>
    );
  };

  return (
    <section 
      id="comparison" 
      className="py-24 bg-[#08080c] relative overflow-hidden scroll-mt-24" 
      aria-labelledby="comparison-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 id="comparison-heading" className="text-4xl md:text-5xl font-black text-white mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The best of both worlds: enterprise-level quality with startup speed and affordability.
          </p>
        </div>

        {/* --- Mobile View (Cards) --- */}
        <div className="lg:hidden space-y-6" role="list" aria-label="Feature comparison cards">
          {features.map((feature, idx) => (
            <article 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-xl p-5"
              role="listitem"
            >
              <h3 className="text-white font-bold mb-4 text-center border-b border-white/5 pb-3">
                {feature.name}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-brand-red font-bold uppercase tracking-wider">Us</span>
                  <div className="bg-white/5 p-2 rounded-lg w-full flex justify-center border border-white/5">
                    {renderIcon(feature.us, feature.name, "Design X Factor")}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Traditional</span>
                  <div className="bg-transparent p-2 rounded-lg w-full flex justify-center">
                    {renderIcon(feature.traditional, feature.name, "Traditional Agency")}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">DIY</span>
                  <div className="bg-transparent p-2 rounded-lg w-full flex justify-center">
                    {renderIcon(feature.diy, feature.name, "DIY Tools")}
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20 rounded-xl p-5 mt-8">
            <h3 className="text-brand-blue font-bold mb-4 text-center">Delivery Timeline</h3>
            <dl className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-200">Design X Factor</dt>
                <dd className="text-white font-bold">2-4 Weeks</dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator"></div>
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">Traditional Agency</dt>
                <dd className="text-slate-300">3-6 Months</dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator"></div>
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">DIY Tools</dt>
                <dd className="text-slate-300">Varies (Often Incomplete)</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* --- Desktop View (Accessible Table) --- */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-white/10 shadow-2xl bg-space/50 backdrop-blur-sm">
          <table
            className="w-full text-left border-collapse min-w-[800px]"
            aria-label="Feature comparison between Design X Factor, Traditional Agencies, and DIY tools"
          >
            <caption className="sr-only">
              Comparison of features across Design X Factor, Traditional Agencies, and DIY (ChatGPT + Tools) approaches
            </caption>
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th scope="col" className="p-6 text-sm font-bold text-slate-200 uppercase tracking-wider w-1/3">
                  Feature
                </th>
                <th scope="col" className="p-6 text-center text-lg font-bold text-white bg-brand-red/10 border-x border-white/10 w-1/4">
                  Design X Factor
                </th>
                <th scope="col" className="p-6 text-center text-sm font-bold text-slate-300 w-1/5">
                  Traditional Agency
                </th>
                <th scope="col" className="p-6 text-center text-sm font-bold text-slate-300 w-1/5">
                  DIY (ChatGPT + Tools)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <th scope="row" className="p-6 text-slate-200 font-medium group-hover:text-white transition-colors text-left">
                    {feature.name}
                  </th>
                  <td className="p-6 bg-brand-red/5 border-x border-white/10">
                    {renderIcon(feature.us, feature.name, "Design X Factor")}
                  </td>
                  <td className="p-6">
                    {renderIcon(feature.traditional, feature.name, "Traditional Agency")}
                  </td>
                  <td className="p-6">
                    {renderIcon(feature.diy, feature.name, "DIY Tools")}
                  </td>
                </tr>
              ))}
              <tr className="bg-white/5 font-bold">
                <th scope="row" className="p-6 text-white text-left">Delivery Timeline</th>
                <td className="p-6 text-center text-brand-blue border-x border-white/10">2-4 Weeks</td>
                <td className="p-6 text-center text-slate-300">3-6 Months</td>
                <td className="p-6 text-center text-slate-300">Varies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};