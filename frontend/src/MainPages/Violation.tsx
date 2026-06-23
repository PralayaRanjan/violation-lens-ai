"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Camera,
  Zap,
  FileCheck,
  Server,
  Eye,
  Activity,
  Shield,
  Cpu,
  FileText,
  Monitor,
  Database,
  AlertTriangle,
  Clock,
  CheckCircle,
  Crosshair,
  BarChart,
  Layers,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ["problem", "solution", "how-it-works", "violations", "features"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const getLinkStyle = (section: string) => {
    return activeSection === section
      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] scale-110 transition-all duration-300"
      : "text-slate-400 hover:text-cyan-400 font-bold transition-all duration-300";
  };

  return (
    <div className="font-sans overflow-x-hidden min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 relative">

      {/* 3D Deep Space Holographic Background Glows */}
      <div className="fixed top-[-10%] left-[10%] w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-violet-700/15 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. Navbar */}
      <nav className="fixed top-0 inset-x-0 h-24 border-b border-white/10 bg-[#020617]/70 backdrop-blur-3xl z-[100] flex items-center px-6 md:px-12 justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <Link href="/" className="flex items-center gap-3 text-3xl font-black text-white tracking-tighter hover:scale-105 transition-transform duration-300 drop-shadow-md">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-60 rounded-full" />
            <ShieldAlert className="relative text-cyan-400 w-9 h-9" />
          </div>
          <span>Violation<span className="text-cyan-400">Lens</span> <span className="text-slate-500 font-semibold text-xl ml-1 hidden sm:inline-block">AI</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a href="#problem" className={getLinkStyle("problem")}>Problem</a>
          <a href="#solution" className={getLinkStyle("solution")}>Solution</a>
          <a href="#how-it-works" className={getLinkStyle("how-it-works")}>How It Works</a>
          <a href="#violations" className={getLinkStyle("violations")}>Violations</a>
          <a href="#features" className={getLinkStyle("features")}>Features</a>
          <Link href="/analyze" className="text-cyan-400 hover:text-cyan-300 font-black flex items-center gap-2 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Demo <Zap className="w-4 h-4 animate-pulse" />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 px-7 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.8)] flex items-center gap-2 border-t border-white/20 border-b-black/50"
          >
            <Monitor className="w-5 h-5" /> Command Center
          </Link>
        </div>
      </nav>

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto space-y-40 relative z-10">

        {/* 2. Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0f172a]/80 border-t border-l border-white/10 border-r border-b border-transparent text-cyan-300 text-sm font-black shadow-[5px_5px_15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
              AI-Powered Traffic Violation Intelligence
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] drop-shadow-xl">
              From Traffic Images to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 mt-3 pb-2 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Review-Ready Evidence
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              ViolationLens AI automatically analyzes traffic images, detects vehicles and road users, classifies traffic violations, extracts license plate details, and generates annotated evidence for human review.
            </p>

            <div className="flex items-center gap-4 text-sm font-bold text-cyan-100 bg-[#0f172a]/60 p-5 rounded-2xl border-t border-l border-white/10 border-b border-r border-black/40 w-fit backdrop-blur-2xl shadow-[10px_10px_30px_rgba(0,0,0,0.5)]">
              <Cpu className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Computer Vision + OCR + Rule Engine + Human Review
            </div>

            <div className="flex flex-wrap gap-5 pt-6">
              <Link href="/analyze" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] hover:-translate-y-1 border-t border-white/20">
                Run AI Analysis <Camera className="w-5 h-5" />
              </Link>
              <Link href="/dashboard" className="px-8 py-4 bg-[#1e293b]/80 hover:bg-[#334155] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 border-t border-l border-white/10 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md hover:-translate-y-1">
                View Dashboard <Activity className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 3D Glassmorphism Evidence Card */}
          <div className="relative mx-auto w-full max-w-lg perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 to-violet-600/40 rounded-3xl blur-3xl transform rotate-3 scale-105 pointer-events-none" />

            <div className="bg-[#0b1021]/60 backdrop-blur-3xl border-t border-l border-white/20 border-b border-r border-black/50 rounded-3xl overflow-hidden shadow-[15px_15px_40px_rgba(0,0,0,0.8)] relative z-10 transform transition-all hover:scale-[1.03] hover:border-cyan-500/50 duration-500 group">
              <div className="h-60 bg-[#020617]/80 relative overflow-hidden flex items-center justify-center border-b border-white/10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                <Camera className="w-24 h-24 text-slate-700 opacity-40 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-12 left-14 w-40 h-32 border-[3px] border-rose-500 bg-rose-500/10 rounded-lg shadow-[0_0_25px_rgba(244,63,94,0.6)]" />
                <div className="absolute top-7 left-14 bg-rose-500 text-white text-[11px] font-black px-3 py-1 rounded shadow-[0_0_15px_rgba(244,63,94,1)] tracking-widest uppercase">Triple Riding</div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-black text-cyan-400/80 uppercase tracking-widest mb-1 drop-shadow-md">Violation Detected</p>
                    <h3 className="text-3xl font-black text-white drop-shadow-lg">Triple Riding</h3>
                  </div>
                  <div className="bg-amber-500/10 border-t border-l border-amber-500/50 border-b border-r border-transparent text-amber-400 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-xl">
                    <Clock className="w-4 h-4" /> PENDING REVIEW
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-[#0f172a]/80 border-t border-l border-white/10 border-b border-r border-black/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] p-5 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Confidence</p>
                    <p className="text-3xl font-black text-emerald-400 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">88% <CheckCircle className="w-6 h-6" /></p>
                  </div>
                  <div className="bg-[#0f172a]/80 border-t border-l border-white/10 border-b border-r border-black/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] p-5 rounded-2xl">
                    <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Plate OCR</p>
                    <p className="text-3xl font-mono font-black text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] tracking-tight">MH12AB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section id="problem" className="scroll-mt-40 relative">
          <div className="max-w-4xl mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter drop-shadow-lg">
              Manual Traffic Image Review Cannot Scale
            </h2>
            <div className="space-y-5 text-xl text-slate-300 font-medium leading-relaxed">
              <p>Traffic surveillance cameras generate thousands of images every day, but manual inspection is slow, inconsistent, and difficult under poor image conditions.</p>
              <p className="text-2xl font-bold text-cyan-300 border-l-[6px] border-cyan-400 pl-6 bg-[#0f172a]/60 p-6 rounded-r-2xl backdrop-blur-2xl shadow-[5px_5px_20px_rgba(0,0,0,0.4)] border-t border-r border-b border-white/5">
                ViolationLens AI solves this by converting raw traffic photos into structured, searchable, review-ready violation evidence.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "High Manual Workload", desc: "Large volumes of traffic images require significant officer time.", icon: Users },
              { title: "Inconsistent Review", desc: "Manual decisions can vary across reviewers.", icon: AlertTriangle },
              { title: "Poor Image Quality", desc: "Low light, rain, blur, and shadows reduce violation visibility.", icon: Camera },
              { title: "Delayed Enforcement", desc: "Slow review cycles reduce monitoring effectiveness.", icon: Clock },
              { title: "Unstructured Evidence", desc: "Raw images do not contain violation type, confidence score, OCR result, metadata, or review status.", icon: Layers },
            ].map((item, i) => (
              <div key={i} className="bg-[#0f172a]/50 backdrop-blur-2xl border-t border-l border-white/10 border-b border-r border-black/50 rounded-3xl p-8 shadow-[10px_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-3 hover:border-cyan-500/50 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500 group">
                <div className="w-16 h-16 bg-blue-900/30 border-t border-l border-blue-400/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                  <item.icon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight drop-shadow-md">{item.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Proposed Solution Section */}
        <section id="solution" className="scroll-mt-40 bg-gradient-to-br from-[#0b1021] to-[#020617] rounded-[3rem] p-10 md:p-24 border-t border-l border-white/10 border-b border-r border-black/60 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="text-center max-w-4xl mx-auto mb-24 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter drop-shadow-xl">
              Proposed Solution: ViolationLens AI
            </h2>
            <div className="space-y-6 text-xl text-slate-300 font-medium leading-relaxed mb-10">
              <p>ViolationLens AI is an evidence-ready computer vision platform that automates traffic violation identification from photographic evidence.</p>
              <p>It combines image preprocessing, YOLO-based object detection, OCR-based license plate recognition, rule-based violation reasoning, annotated evidence generation, PostgreSQL metadata storage, analytics, and human-in-the-loop review.</p>
            </div>
            <div className="inline-block bg-blue-900/40 backdrop-blur-2xl border-t border-l border-blue-400/50 border-b border-r border-black text-blue-200 font-black tracking-widest uppercase text-sm md:text-base px-10 py-5 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
              Not just detection — complete evidence generation.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 relative z-10">
            {[
              { title: "Image Enhancement", desc: "Improves low-light, blurry, rainy, and shadow-affected images before detection.", icon: Zap },
              { title: "AI Object Detection", desc: "Detects vehicles, riders, drivers, pedestrians, helmets, traffic lights, and number plate regions.", icon: Crosshair },
              { title: "Violation Reasoning", desc: "Classifies violations using object detection plus traffic-rule logic.", icon: Cpu },
              { title: "Evidence Generation", desc: "Creates annotated images, OCR output, confidence scores, timestamps, and review-ready records.", icon: FileCheck },
            ].map((item, i) => (
              <div key={i} className="bg-[#0f172a]/50 backdrop-blur-2xl border-t border-l border-white/10 border-b border-r border-black/50 rounded-3xl p-10 flex gap-8 items-start hover:bg-[#1e293b]/60 hover:border-cyan-500/50 transition-all duration-500 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)] group">
                <div className="w-20 h-20 shrink-0 bg-blue-950/50 border-t border-l border-blue-500/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-900/50 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                  <item.icon className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-md">{item.title}</h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. How It Works Section (Bulletproof Alternate Timeline Layout) */}
        {/* 5. How It Works Section (Bulletproof Alternate Timeline Layout) */}
        <section id="how-it-works" className="scroll-mt-40">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-xl">How ViolationLens AI Works</h2>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-0">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-cyan-400 to-violet-600 rounded-full transform -translate-x-1/2 shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            {/* Mobile Line */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-cyan-400 to-violet-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

            {[
              { title: "1. Upload Traffic Image", desc: "The officer uploads traffic image evidence." },
              { title: "2. Image Quality Enhancement", desc: "The system checks brightness, blur, noise, and visibility, then enhances the image." },
              { title: "3. Vehicle & Road User Detection", desc: "YOLO detects vehicles, riders, drivers, pedestrians, helmets, traffic lights, and plate regions." },
              { title: "4. Violation Classification", desc: "The rule engine identifies helmet violation, triple riding, stop-line crossing, red-light violation, illegal parking, wrong-side driving, and seatbelt non-compliance." },
              { title: "5. License Plate OCR", desc: "Detected number plate regions are cropped and processed using OCR." },
              { title: "6. Annotated Evidence & Review", desc: "The system generates annotated proof and sends uncertain cases to a human review console." },
            ].map((step, index) => {
              // Alternate: even index (0,2,4) = left, odd index (1,3,5) = right
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className={`relative mb-20 md:mb-24 flex flex-col md:flex-row items-center justify-between w-full group ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Glowing Node */}
                  <div className="absolute left-[34px] md:left-1/2 w-8 h-8 bg-[#020617] border-4 border-cyan-400 rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(34,211,238,1)] group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300" />

                  {/* Card - Closer to center line */}
                  <div className={`w-full md:w-[42%] pl-16 md:pl-0 ${isLeft ? 'md:pr-2 md:text-right' : 'md:pl-2 md:text-left'}`}>
                    <div className="bg-[#0f172a]/60 backdrop-blur-2xl border-t border-l border-white/10 border-b border-r border-black/50 p-8 md:p-10 rounded-3xl shadow-[10px_10px_30px_rgba(0,0,0,0.6)] group-hover:border-cyan-500/50 group-hover:shadow-[0_15px_40px_rgba(34,211,238,0.2)] transition-all duration-500 relative overflow-hidden">
                      <div className={`absolute top-0 w-2 h-full bg-cyan-400/50 blur-sm ${isLeft ? 'right-0' : 'left-0'}`} />
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 drop-shadow-md">{step.title}</h3>
                      <p className="text-lg text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Empty space for the other side - Reduced width */}
                  <div className="hidden md:block md:w-[42%]" />
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Supported Violations Section */}
        <section id="violations" className="scroll-mt-40">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-xl">Supported Traffic Violations</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
              Designed for both direct visual detection and rule-based traffic scene understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {[
              { title: "Helmet Non-Compliance", desc: "Detects two-wheeler riders without helmets." },
              { title: "Seatbelt Non-Compliance", desc: "Flags possible seatbelt violations from driver/front-seat regions." },
              { title: "Triple Riding", desc: "Counts multiple riders on a two-wheeler and flags three-rider cases." },
              { title: "Wrong-Side Driving", desc: "Uses configured road direction and movement/orientation logic to detect suspected wrong-side movement." },
              { title: "Stop-Line Violation", desc: "Checks whether the vehicle crosses a configured stop line." },
              { title: "Red-Light Violation", desc: "Combines red signal status with stop-line crossing logic." },
              { title: "Illegal Parking", desc: "Detects vehicles inside restricted or no-parking zones." },
            ].map((violation, i) => (
              <div key={i} className="bg-[#0f172a]/70 backdrop-blur-2xl border-t border-l border-white/10 border-b border-r border-black/50 rounded-3xl p-8 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)] hover:border-violet-500/50 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,1)] group-hover:animate-pulse" />
                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">{violation.title}</h3>
                </div>
                <p className="text-base text-slate-400 font-medium leading-relaxed">{violation.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/30 backdrop-blur-2xl border-t border-l border-blue-500/40 border-b border-r border-black/50 rounded-3xl p-6 flex items-center justify-center gap-5 max-w-4xl mx-auto text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
            <ShieldAlert className="w-8 h-8 text-cyan-400 shrink-0 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <p className="text-lg font-bold text-blue-200">
              Low-confidence or unclear cases are routed for human review instead of automatic approval.
            </p>
          </div>
        </section>

        {/* 7. Why It Stands Out Section */}
        <section id="features" className="scroll-mt-40">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-20 text-center tracking-tighter drop-shadow-xl">Why ViolationLens AI Stands Out</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Evidence-Ready Output", desc: "Generates annotated images with violation labels, bounding boxes, timestamps, confidence scores, and OCR results.", icon: FileText },
              { title: "Explainable AI Reasoning", desc: "Every violation includes a clear reason such as “three riders detected on one motorcycle.”", icon: Cpu },
              { title: "Human-in-the-Loop Review", desc: "Uncertain cases are routed to officers for approval, rejection, or further review.", icon: Users },
              { title: "Multi-Violation Intelligence", desc: "Supports helmet, seatbelt, triple riding, wrong-side, stop-line, red-light, and illegal parking violations.", icon: Layers },
              { title: "Robust Image Handling", desc: "Handles low light, rain, shadows, blur, occlusion, and crowded traffic conditions.", icon: Eye },
              { title: "Analytics & Reporting", desc: "Stores structured records for dashboards, trends, review status, and performance metrics.", icon: BarChart },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-[#0f172a]/60 backdrop-blur-xl transition-all border border-transparent hover:border-white/10 hover:shadow-[10px_10px_30px_rgba(0,0,0,0.5)] group">
                <div className="w-16 h-16 rounded-2xl bg-[#0b1021] flex items-center justify-center shrink-0 border-t border-l border-white/10 border-b border-r border-black/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] group-hover:border-cyan-500/50 transition-colors">
                  <feature.icon className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white mb-3 drop-shadow-md">{feature.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Architecture Preview Section */}
        <section id="architecture" className="scroll-mt-40 bg-[#0f172a]/50 backdrop-blur-3xl border-t border-l border-white/10 border-b border-r border-black/60 rounded-[3rem] p-12 md:p-20 shadow-[15px_15px_50px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter drop-shadow-lg">Modular AI Architecture</h2>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">
                The system is modular, so new violation types, camera profiles, detection models, and analytics modules can be added without redesigning the platform.
              </p>
            </div>
            <Link href="/system-design" className="px-10 py-5 bg-[#1e293b]/80 hover:bg-[#334155] text-white rounded-2xl font-black transition-all whitespace-nowrap border-t border-l border-white/20 shadow-[10px_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[15px_15px_30px_rgba(0,0,0,0.8)]">
              View System Design
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-base font-bold text-slate-200">
            {["Traffic Image Upload", "Image Quality Assessment", "Preprocessing", "YOLO Detection", "License Plate OCR", "Violation Rule Engine", "Evidence Annotation", "PostgreSQL Storage", "Review Console", "Analytics Dashboard"].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="bg-[#030712]/80 px-6 py-4 rounded-2xl border-t border-l border-white/10 border-b border-r border-black shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] text-center tracking-wider backdrop-blur-md">
                  {step}
                </div>
                {i < arr.length - 1 && <div className="text-slate-600 text-3xl font-light">→</div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 9. Analytics Preview Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter drop-shadow-xl">Analytics for Smarter Enforcement</h2>
              <div className="space-y-6 text-xl text-slate-300 font-medium leading-relaxed">
                <p>Every analyzed case is stored with violation type, vehicle category, OCR result, confidence score, timestamp, location, image quality score, and review status.</p>
                <p>This enables dashboards for violation trends, confidence distribution, review workload, OCR success rate, and enforcement summary reports.</p>
              </div>
            </div>
            <Link href="/dashboard" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-3 whitespace-nowrap hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(37,99,235,0.8)] border-t border-white/20">
              Open Dashboard <Activity className="w-6 h-6" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Total Violations", val: "24,592" },
              { label: "Pending Review", val: "1,204" },
              { label: "Approved Cases", val: "21,840" },
              { label: "Average Confidence", val: "94.2%" },
              { label: "OCR Success Rate", val: "96.8%" },
              { label: "Avg Processing Time", val: "1.2s" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0f172a]/60 backdrop-blur-2xl border-t border-l border-white/10 border-b border-r border-black/50 rounded-2xl p-5 text-center shadow-[10px_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-500">
                <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">{stat.val}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Final CTA Section */}
        <section className="bg-gradient-to-br from-[#0b1021] via-[#0f172a] to-[#020617] rounded-[3rem] p-12 md:p-24 text-center shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border-t border-l border-white/10 border-b border-r border-black/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter drop-shadow-2xl">
              Ready to Transform Traffic Images into Actionable Evidence?
            </h2>
            <p className="text-2xl text-cyan-100/80 mb-16 leading-relaxed font-medium drop-shadow-md">
              Analyze violations, generate annotated proof, extract license plates, and review cases through one intelligent platform.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/analyze" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_rgba(37,99,235,0.9)] flex items-center gap-3 hover:-translate-y-2 border-t border-white/30 text-lg">
                Run AI Analysis <Camera className="w-6 h-6" />
              </Link>
              <Link href="/dashboard" className="px-10 py-5 bg-black/40 hover:bg-black/70 backdrop-blur-2xl text-white rounded-2xl font-black transition-all border-t border-l border-white/20 border-b border-r border-black flex items-center gap-3 hover:-translate-y-2 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] text-lg">
                Command Center <Monitor className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 bg-[#020617]/90 backdrop-blur-3xl py-14 text-center text-slate-500 text-sm transition-colors duration-500 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center gap-3 mb-5">
          <ShieldAlert className="w-7 h-7 text-slate-600" />
          <span className="font-black text-slate-400 text-xl tracking-tight">ViolationLens AI</span>
        </div>
        <p className="font-black tracking-widest uppercase text-xs">Built for efficiency. Designed for accuracy.</p>
      </footer>
    </div>
  );
}