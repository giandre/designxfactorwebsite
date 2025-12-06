import React, { useEffect, useState, useCallback } from 'react';
import { FileText, FileType, Presentation, FileSpreadsheet, Code, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [orbiters, setOrbiters] = useState([]);
  const [fallers, setFallers] = useState([]);
  const [nextId, setNextId] = useState(0);

  const types = ['pdf', 'doc', 'ppt', 'xls', 'html'];

  // Create an orbiting particle (stays in orbit)
  const createOrbiter = useCallback((id) => {
    const orbitRadius = 220 + Math.random() * 200;
    return {
      id: id,
      type: types[Math.floor(Math.random() * types.length)],
      angle: Math.random() * Math.PI * 2,
      radius: orbitRadius,
      orbitSpeed: (0.001 + Math.random() * 0.001) * (Math.random() > 0.5 ? 1 : -1),
      z: Math.random() * 100 - 50,
      scale: 0.45 + Math.random() * 0.35,
      rotation: Math.random() * 20 - 10,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.002 + Math.random() * 0.002,
    };
  }, []);

  // Create a falling particle (gets sucked in)
  const createFaller = useCallback((id, fromOrbiter) => {
    return {
      id: id,
      type: fromOrbiter ? fromOrbiter.type : types[Math.floor(Math.random() * types.length)],
      angle: fromOrbiter ? fromOrbiter.angle : Math.random() * Math.PI * 2,
      distance: fromOrbiter ? fromOrbiter.radius : (350 + Math.random() * 100),
      speed: 1 + Math.random() * 0.5,
      orbitSpeed: 0.008 + Math.random() * 0.006,
      z: fromOrbiter ? fromOrbiter.z : (Math.random() * 100 - 50),
      scale: fromOrbiter ? fromOrbiter.scale : (0.45 + Math.random() * 0.35),
      rotation: fromOrbiter ? fromOrbiter.rotation : (Math.random() * 20 - 10),
    };
  }, []);

  // Initialize orbiters
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 18; i++) {
      initial.push(createOrbiter(i));
    }
    setOrbiters(initial);
    setNextId(18);
  }, [createOrbiter]);

  // Occasionally send an orbiter falling into center
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbiters(prev => {
        if (prev.length < 10) return prev;
        
        // Pick a random orbiter to fall
        const idx = Math.floor(Math.random() * prev.length);
        const chosen = prev[idx];
        
        // Create a faller from this orbiter
        setFallers(f => [...f, createFaller(Date.now(), chosen)]);
        setNextId(n => n + 1);
        
        // Remove from orbiters and add a new one at a different position
        const newOrbiters = prev.filter((_, i) => i !== idx);
        const replacement = createOrbiter(Date.now() + 1);
        return [...newOrbiters, replacement];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [createOrbiter, createFaller]);

  // Animation loop
  useEffect(() => {
    let animationId;
    let time = 0;

    const animate = () => {
      time += 1;

      // Update orbiters (just rotate around)
      setOrbiters(prev => prev.map(p => ({
        ...p,
        angle: p.angle + p.orbitSpeed,
        wobble: p.wobble + p.wobbleSpeed,
      })));

      // Update fallers (spiral inward)
      setFallers(prev => {
        return prev
          .map(p => {
            const newDistance = p.distance - p.speed;
            const newSpeed = p.speed * 1.015; // Accelerate
            const newOrbitSpeed = p.orbitSpeed * 1.01;
            
            return {
              ...p,
              distance: newDistance,
              angle: p.angle + p.orbitSpeed,
              speed: newSpeed,
              orbitSpeed: newOrbitSpeed,
              rotation: p.rotation + 2,
            };
          })
          .filter(p => p.distance > 20); // Remove when reached center
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getStyle = (type) => {
    const styles = {
      pdf: { color: 'bg-red-500', icon: FileType, iconColor: 'text-red-500' },
      doc: { color: 'bg-blue-500', icon: FileText, iconColor: 'text-blue-500' },
      ppt: { color: 'bg-orange-500', icon: Presentation, iconColor: 'text-orange-500' },
      xls: { color: 'bg-green-500', icon: FileSpreadsheet, iconColor: 'text-green-500' },
      html: { color: 'bg-purple-500', icon: Code, iconColor: 'text-purple-500' },
    };
    return styles[type] || styles.doc;
  };

  const renderParticle = (p, isFalling) => {
    const dist = isFalling ? p.distance : p.radius;
    const wobbleOffset = isFalling ? 0 : Math.sin(p.wobble) * 8;
    const x = Math.cos(p.angle) * dist;
    const y = Math.sin(p.angle) * dist + wobbleOffset;
    
    let opacity = 0.85;
    if (isFalling && p.distance < 80) {
      opacity = (p.distance - 20) / 60;
    }
    
    const scale = isFalling 
      ? p.scale * (1 + (350 - p.distance) / 400)
      : p.scale;
    
    const style = getStyle(p.type);
    const Icon = style.icon;

    return (
      <div
        key={p.id}
        className="absolute top-1/2 left-1/2 w-16 h-20 pointer-events-none transition-opacity duration-300"
        style={{
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${p.z}px) scale(${scale}) rotateZ(${p.rotation}deg)`,
          opacity: Math.max(0, opacity),
        }}
      >
        <div className="w-full h-full bg-white/95 rounded-md shadow-lg overflow-hidden border border-white/50">
          <div className={`h-2 w-full ${style.color}`} />
          <div className="p-1.5">
            <Icon size={12} className={style.iconColor} />
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded" />
              <div className="h-1 w-3/4 bg-slate-100 rounded" />
              <div className="h-1 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />
      
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-2 h-2 bg-white rounded-full blur-sm" />
        <div className="absolute -inset-12 bg-blue-400/30 rounded-full blur-xl" />
        <div className="absolute -inset-24 bg-blue-500/15 rounded-full blur-2xl" />
        <div className="absolute -inset-40 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Particles container */}
      <div className="absolute inset-0" style={{ perspective: '600px' }}>
        {orbiters.map(p => renderParticle(p, false))}
        {fallers.map(p => renderParticle(p, true))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
          Transforming Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400">
            Content Experience
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 font-light max-w-xl mx-auto mb-10">
          Turn your static documents into an intelligent, accessible, and interactive ecosystem.
        </p>
        
        <button 
          onClick={scrollToNext}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all backdrop-blur-sm"
        >
          Get Started
        </button>
        
        <div 
          onClick={scrollToNext}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-300"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}

// Named export to match: import { Hero } from '@/components/Hero'