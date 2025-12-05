import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features: { name: string; us: boolean | "partial"; notebook: boolean | "partial"; diy: boolean | "partial" }[] = [
    { name: "Seamless LMS Integration", us: true, notebook: false, diy: false },
    { name: "Multimodal Content Generation", us: true, notebook: "partial", diy: "partial" },
    { name: "WCAG 2.1 Level AA Accessible Output", us: true, notebook: false, diy: false },
    { name: "HTML5 Videos (not MP4)", us: true, notebook: false, diy: false },
    { name: "Embedded Knowledge Checks", us: true, notebook: false, diy: false },
    { name: "Comprehensive Analytics & Tracking", us: true, notebook: false, diy: false },
    { name: "Faculty Can Edit Before Publishing", us: true, notebook: false, diy: "partial" },
    { name: "One-Click Publishing to LMS", us: true, notebook: false, diy: false },
    { name: "Spaced Repetition Learning", us: true, notebook: false, diy: false },
  ];

  const renderIcon = (status: boolean | "partial") => {
    if (status === true) return <div className="flex justify-center"><Check className="text-green-400 w-6 h-6" /></div>;
    if (status === "partial") return <div className="flex justify-center"><Minus className="text-yellow-500 w-6 h-6" /></div>;
    return <div className="flex justify-center"><X className="text-red-500 w-6 h-6" /></div>;
  };

  return (
    <section id="comparison" className="py-24 bg-[#08080c] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Why Design X Factor?</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A direct comparison of what you actually get with each approach. Stop piecing together fragmented tools.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl bg-space/50 backdrop-blur-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-6 text-sm font-bold text-slate-300 uppercase tracking-wider w-1/3">Feature</th>
                <th className="p-6 text-center text-lg font-bold text-white bg-brand-red/10 border-x border-white/10 w-1/4">
                  Design X Factor
                </th>
                <th className="p-6 text-center text-sm font-bold text-slate-400 w-1/5">NotebookLM</th>
                <th className="p-6 text-center text-sm font-bold text-slate-400 w-1/5">DIY (ChatGPT + Tools)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 text-slate-300 font-medium group-hover:text-white transition-colors">
                    {feature.name}
                  </td>
                  <td className="p-6 bg-brand-red/5 border-x border-white/10">
                    {renderIcon(feature.us)}
                  </td>
                  <td className="p-6">
                    {renderIcon(feature.notebook)}
                  </td>
                  <td className="p-6">
                    {renderIcon(feature.diy)}
                  </td>
                </tr>
              ))}
              <tr className="bg-white/5 font-bold">
                 <td className="p-6 text-white">Workflow Complexity</td>
                 <td className="p-6 text-center text-brand-blue border-x border-white/10">Simple & Automated</td>
                 <td className="p-6 text-center text-slate-400">Manual Copy-Paste</td>
                 <td className="p-6 text-center text-slate-400">Highly Fragmented</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};