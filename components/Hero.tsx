import React, { useEffect, useState, useCallback } from 'react';
import { FileText, FileType, Presentation, FileSpreadsheet, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [orbiters, setOrbiters] = useState<any[]>([]);
  const [fallers, setFallers] = useState<any[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const types = ['pdf', 'doc', 'ppt', 'xls'];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const createOrbiter = useCallback((id: number) => {
    const orbitRadius = 220 + Math.random() * 200;
    return {
      id: id,
      type: types[Math.floor(Math.random() * types.length)],
      angle: Math.random() * Math.PI * 2,
      radius: orbitRadius,
      orbitSpeed: (0.0008 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1),
      z: Math.random() * 100 - 50,
      scale: 0.55 + Math.random() * 0.35,
      rotation: Math.random() * 20 - 10,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.002 + Math.random() * 0.002,
    };
  }, []);

  const createFaller = useCallback((id: number, fromOrbiter?: any) => {
    return {
      id: id,
      type: fromOrbiter ? fromOrbiter.type : types[Math.floor(Math.random() * types.length)],
      angle: fromOrbiter ? fromOrbiter.angle : Math.random() * Math.PI * 2,
      distance: fromOrbiter ? fromOrbiter.radius : (350 + Math.random() * 100),
      speed: 0.8 + Math.random() * 0.4,
      orbitSpeed: 0.006 + Math.random() * 0.005,
      z: fromOrbiter ? fromOrbiter.z : (Math.random() * 100 - 50),
      scale: fromOrbiter ? fromOrbiter.scale : (0.55 + Math.random() * 0.35),
      rotation: fromOrbiter ? fromOrbiter.rotation : (Math.random() * 20 - 10),
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const initial: any[] = [];
    for (let i = 0; i < 18; i++) {
      initial.push(createOrbiter(i));
    }
    setOrbiters(initial);
  }, [createOrbiter, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setOrbiters(prev => {
        if (prev.length < 10) return prev;

        const idx = Math.floor(Math.random() * prev.length);
        const chosen = prev[idx];

        setFallers(f => [...f, createFaller(Date.now(), chosen)]);

        const newOrbiters = prev.filter((_, i) => i !== idx);
        const replacement = createOrbiter(Date.now() + 1);
        return [...newOrbiters, replacement];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [createOrbiter, createFaller, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationId: number;

    const animate = () => {
      setOrbiters(prev => prev.map(p => ({
        ...p,
        angle: p.angle + p.orbitSpeed,
        wobble: p.wobble + p.wobbleSpeed,
      })));

      setFallers(prev => {
        return prev
          .map(p => {
            const newDistance = p.distance - p.speed;
            const newSpeed = p.speed * 1.012;
            const newOrbitSpeed = p.orbitSpeed * 1.008;

            return {
              ...p,
              distance: newDistance,
              angle: p.angle + p.orbitSpeed,
              speed: newSpeed,
              orbitSpeed: newOrbitSpeed,
              rotation: p.rotation + 1.5,
            };
          })
          .filter(p => p.distance > 20);
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [prefersReducedMotion]);

  const scrollThreshold = 900;
  const progress = scrollY <= 10 ? 0 : Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
  const heroOpacity = 1 - Math.pow(progress, 2);
  const heroBlur = progress * 10;

  const getStyle = (type: string) => {
    const styles: Record<string, { color: string; icon: any; iconColor: string; label: string }> = {
      pdf: { color: 'bg-red-500', icon: FileType, iconColor: 'text-red-500', label: 'PDF' },
      doc: { color: 'bg-blue-500', icon: FileText, iconColor: 'text-blue-500', label: 'DOCX' },
      ppt: { color: 'bg-orange-500', icon: Presentation, iconColor: 'text-orange-500', label: 'PPTX' },
      xls: { color: 'bg-green-500', icon: FileSpreadsheet, iconColor: 'text-green-500', label: 'XLSX' },
    };
    return styles[type] || styles.doc;
  };

  const renderParticle = (p: any, isFalling: boolean) => {
    const dist = isFalling ? p.distance : p.radius;
    const wobbleOffset = isFalling ? 0 : Math.sin(p.wobble) * 8;
    const x = Math.cos(p.angle) * dist;
    const y = Math.sin(p.angle) * dist + wobbleOffset;

    let opacity = 0.9;
    if (isFalling && p.distance < 80) {
      opacity = (p.distance - 20) / 60;
    }

    const scale = isFalling
      ? p.scale * (1 + (350 - p.distance) / 500)
      : p.scale;

    const style = getStyle(p.type);
    const Icon = style.icon;

    return (
      <div
        key={p.id}
        className="absolute top-1/2 left-1/2 w-[70px] h-[90px] pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${p.z}px) scale(${scale}) rotateZ(${p.rotation}deg)`,
          opacity: Math.max(0, opacity) * heroOpacity,
        }}
      >
        <div className="w-full h-full bg-slate-100/95 backdrop-blur-sm rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20">
          <div className={`h-2 w-full ${style.color}`} />
          <div className="p-2 flex-1 flex flex-col gap-1 bg-gradient-to-b from-white to-slate-50">
            <div className="flex justify-between items-center">
              <Icon size={14} className={style.iconColor} />
              <span className="text-[6px] font-bold text-slate-400 tracking-wider">{style.label}</span>
            </div>
            <div className="space-y-1 opacity-60">
              <div className="h-0.5 w-full bg-slate-300 rounded-sm" />
              <div className="h-0.5 w-4/5 bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-full bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-3/4 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const scrollToNext = () => {
    // Hero is 150vh for parallax effect; scroll past it to the next section
    const heroSection = document.querySelector('[aria-label="Hero section - Corporate training transformation"]');
    if (heroSection) {
      const nextSectionTop = heroSection.getBoundingClientRect().height + heroSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: nextSectionTop, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToNext();
    }
  };

  return (
    <section
      className="relative h-[150vh] bg-space"
      aria-label="Hero section - Corporate training transformation"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">

        {/* Background Gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a15] to-[#050508] opacity-90"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[80px] animate-pulse-slow"
          aria-hidden="true"
        />

        {/* Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-2 h-2 bg-white/80 rounded-full blur-sm" />
          <div className="absolute -inset-8 bg-blue-400/20 rounded-full blur-xl" />
          <div className="absolute -inset-16 bg-blue-500/10 rounded-full blur-2xl" />
        </div>

        {/* Orbiting file particles */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ perspective: '600px' }}
            aria-hidden="true"
            role="presentation"
          >
            {orbiters.map(p => renderParticle(p, false))}
            {fallers.map(p => renderParticle(p, true))}
          </div>
        )}

        {/* Central Text Content */}
        <div
          className="relative z-20 text-center max-w-4xl px-6 pt-16"
          style={{
            opacity: heroOpacity,
            transform: prefersReducedMotion ? 'none' : `scale(${1 + progress * 0.2})`,
            filter: prefersReducedMotion || heroBlur === 0 ? 'none' : `blur(${heroBlur}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out'
          }}
        >
          <div
            className="absolute inset-0 bg-brand-blue/5 blur-[60px] -z-10 rounded-full"
            aria-hidden="true"
          />

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            Your Training Content Exists.{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-red">
              We Make It Unforgettable.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            We transform static corporate training into experiences that learners actually remember — in weeks, not months.
          </p>

          <div className="flex justify-center mb-8">
            <button
              onClick={scrollToNext}
              className="px-8 py-3 bg-brand-red hover:bg-brand-red/90 rounded-full text-white font-semibold transition-all shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
            >
              See What We Do
            </button>
          </div>

          <div
            onClick={scrollToNext}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="flex flex-col items-center gap-4 opacity-60 cursor-pointer focus:outline-none focus-visible:opacity-100"
            aria-label="Scroll to next section"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Scroll</span>
            <ChevronDown size={20} className="text-slate-400" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
};
