import React, { useState, useEffect, useRef } from 'react';
import { Check, X, Minus } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [taglineVisible, setTaglineVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHeaderVisible(true);
      setTableVisible(true);
      setVisibleCards(new Set(Array.from({ length: 12 }, (_, i) => i)));
      setTaglineVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === headerRef.current) setHeaderVisible(true);
          if (entry.target === tableRef.current) setTableVisible(true);
          if (entry.target === taglineRef.current) setTaglineVisible(true);
          const cardIdx = entry.target.getAttribute('data-card');
          if (cardIdx !== null) setVisibleCards(prev => new Set([...prev, Number(cardIdx)]));
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (tableRef.current) observer.observe(tableRef.current);
    if (taglineRef.current) observer.observe(taglineRef.current);
    cardRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);
  const features: { name: string; us: boolean | "partial"; templateShops: boolean | "partial"; diy: boolean | "partial" }[] = [
    { name: "Designs for YOUR actual audience (personas)", us: true, templateShops: false, diy: false },
    { name: "Validates with real learners before production", us: true, templateShops: false, diy: false },
    { name: "ADA/WCAG 2.1 AA compliant from day one", us: true, templateShops: "partial", diy: false },
    { name: "Black & white content approval (no surprises)", us: true, templateShops: "partial", diy: true },
    { name: "Delivered in weeks, not months", us: true, templateShops: false, diy: "partial" },
    { name: "Multiple output formats (HTML, SCORM, API)", us: true, templateShops: "partial", diy: false },
    { name: "Works on mobile, tablet, desktop", us: true, templateShops: "partial", diy: "partial" },
    { name: "Interactive knowledge checks & scenarios", us: true, templateShops: false, diy: false },
    { name: "Enterprise quality design", us: true, templateShops: "partial", diy: false },
    { name: "Affordable pricing", us: true, templateShops: false, diy: true },
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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 id="comparison-heading" className="text-4xl md:text-5xl font-black text-white mb-6">
            Not All Training Partners Are Equal
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The best of both worlds: enterprise-level quality with startup speed and affordability.
          </p>
        </div>

        {/* Mobile View (Cards) */}
        <div className="lg:hidden space-y-6" role="list" aria-label="Feature comparison cards">
          {features.map((feature, idx) => (
            <article
              key={idx}
              ref={el => { cardRefs.current[idx] = el; }}
              data-card={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-5 transition-all"
              role="listitem"
              style={{
                opacity: visibleCards.has(idx) ? 1 : 0,
                transform: visibleCards.has(idx) ? 'translateY(0)' : 'translateY(25px)',
                transitionDuration: '500ms',
                transitionDelay: `${idx * 80}ms`,
              }}
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
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Templates</span>
                  <div className="bg-transparent p-2 rounded-lg w-full flex justify-center">
                    {renderIcon(feature.templateShops, feature.name, "Template Shops")}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">DIY + AI</span>
                  <div className="bg-transparent p-2 rounded-lg w-full flex justify-center">
                    {renderIcon(feature.diy, feature.name, "DIY with AI Tools")}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Summary Cards */}
          <div
            ref={el => { cardRefs.current[10] = el; }}
            data-card={10}
            className="bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20 rounded-xl p-5 mt-8 transition-all duration-600"
            style={{
              opacity: visibleCards.has(10) ? 1 : 0,
              transform: visibleCards.has(10) ? 'translateY(0)' : 'translateY(25px)',
              transitionDuration: '600ms',
            }}
          >
            <h3 className="text-brand-blue font-bold mb-4 text-center">Delivery Timeline</h3>
            <dl className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-200">Design X Factor</dt>
                <dd className="text-white font-bold">2-4 Weeks</dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator" />
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">Template Shops</dt>
                <dd className="text-slate-300">Days (cookie-cutter)</dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator" />
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">DIY with AI Tools</dt>
                <dd className="text-slate-300">Varies (often incomplete)</dd>
              </div>
            </dl>
          </div>

          <div
            ref={el => { cardRefs.current[11] = el; }}
            data-card={11}
            className="bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-xl p-5 transition-all"
            style={{
              opacity: visibleCards.has(11) ? 1 : 0,
              transform: visibleCards.has(11) ? 'translateY(0)' : 'translateY(25px)',
              transitionDuration: '600ms',
              transitionDelay: '150ms',
            }}
          >
            <h3 className="text-brand-gold font-bold mb-4 text-center">Typical Investment</h3>
            <dl className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-200">Design X Factor</dt>
                <dd className="text-white font-bold">$ <span className="text-xs text-slate-300 font-normal">Enterprise quality, startup pricing</span></dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator" />
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">Template Shops</dt>
                <dd className="text-slate-300">$$ <span className="text-xs text-slate-400 font-normal">Generic output</span></dd>
              </div>
              <div className="w-full h-px bg-white/10" role="separator" />
              <div className="flex justify-between items-center text-sm">
                <dt className="text-slate-300">DIY with AI Tools</dt>
                <dd className="text-slate-300">$ <span className="text-xs text-slate-400 font-normal">Hidden time costs</span></dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Desktop View (Accessible Table) */}
        <div
          ref={tableRef}
          className="hidden lg:block overflow-x-auto rounded-2xl border border-white/10 shadow-2xl bg-space/50 backdrop-blur-sm transition-all duration-700"
          style={{
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <table
            className="w-full text-left border-collapse min-w-[800px]"
            aria-label="Feature comparison between Design X Factor, Template Shops, and DIY with AI Tools"
          >
            <caption className="sr-only">
              Comparison of features across Design X Factor, Template Shops, and DIY (ChatGPT + AI Tools) approaches
            </caption>
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th scope="col" className="p-6 text-sm font-bold text-slate-200 uppercase tracking-wider w-2/5">
                  Feature
                </th>
                <th scope="col" className="p-6 text-center text-lg font-bold text-white bg-brand-red/10 border-x border-white/10 w-1/5">
                  Design X Factor
                </th>
                <th scope="col" className="p-6 text-center text-sm font-bold text-slate-300 w-1/5">
                  Template Shops
                </th>
                <th scope="col" className="p-6 text-center text-sm font-bold text-slate-300 w-1/5">
                  DIY with AI Tools
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
                    {renderIcon(feature.templateShops, feature.name, "Template Shops")}
                  </td>
                  <td className="p-6">
                    {renderIcon(feature.diy, feature.name, "DIY with AI Tools")}
                  </td>
                </tr>
              ))}
              <tr className="bg-white/5 font-bold">
                <th scope="row" className="p-6 text-white text-left">Delivery Timeline</th>
                <td className="p-6 text-center text-brand-blue border-x border-white/10">2-4 Weeks</td>
                <td className="p-6 text-center text-slate-300">Days (cookie-cutter)</td>
                <td className="p-6 text-center text-slate-300">Varies</td>
              </tr>
              <tr className="bg-white/5 font-bold">
                <th scope="row" className="p-6 text-white text-left">Typical Investment</th>
                <td className="p-6 text-center text-brand-gold border-x border-white/10">$<span className="text-xs block text-slate-300 font-normal mt-1">Enterprise quality, startup pricing</span></td>
                <td className="p-6 text-center text-slate-300">$$<span className="text-xs block text-slate-400 font-normal mt-1">Generic output</span></td>
                <td className="p-6 text-center text-slate-300">$<span className="text-xs block text-slate-400 font-normal mt-1">Hidden time costs</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-center mt-12 text-lg text-slate-300 italic transition-all duration-700"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Enterprise design. Startup speed.{' '}
          <span className="text-brand-gold font-semibold not-italic">A price that won't require board approval.</span>
        </p>
      </div>
    </section>
  );
};
