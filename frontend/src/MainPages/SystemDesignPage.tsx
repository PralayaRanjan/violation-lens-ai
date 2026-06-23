"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert, Camera, UploadCloud, Eye, Cpu, Scan,
  Brain, FileCheck, Database, Users, BarChart3,
  Menu, Home, LayoutDashboard, ChevronLeft, ChevronRight as ChevronRightIcon,
  LogOut, AlertOctagon, Layers, FileText, TrendingUp,
  ArrowRight, CheckCircle2, Server, Cloud, GitBranch,
  Workflow, HardDrive, Gauge, Zap, Clock, MapPin,
  Activity, Box, Fingerprint, FileJson, Network,
  Sparkles, Rocket, Target
} from 'lucide-react';

// --- SIDEBAR (same as before) ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean; setIsOpen: (v: boolean) => void;
  isCollapsed: boolean; setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("system-design");
  const navItems = [
    { id: "dashboard", label: "Command Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "analyze", label: "AI Analysis Studio", icon: Brain, href: "/analyze" },
    { id: "violations", label: "Violation Records", icon: FileText, href: "/violation_record" },
    { id: "review", label: "Human Review Console", icon: Users, href: "/human-review" },
    { id: "analytics", label: "Analytics & Trends", icon: BarChart3, href: "/analytics-page" },
    { id: "evaluation", label: "Performance Evaluation", icon: TrendingUp, href: "/evaluation" },
    { id: "calibration", label: "Camera Calibration", icon: Camera, href: "/calibration" },
    { id: "edge-cases", label: "Edge Case Handling", icon: AlertOctagon, href: "/edge-cases" },
    { id: "system-design", label: "System Design", icon: GitBranch, href: "/system-design" },
  ];

  return (
    <>
      {isOpen && !isCollapsed && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[260px]'} ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col`}>
        <div className={`p-4 border-b border-slate-800 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Violation<span className="text-blue-400">Lens</span></h1>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Command Center</p>
              </div>
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors hidden lg:flex`}>
          {isCollapsed ? <ChevronRightIcon className="w-3 h-3 text-slate-400" /> : <ChevronLeft className="w-3 h-3 text-slate-400" />}
        </button>
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <Link key={item.id} href={item.href} onClick={() => { setActive(item.id); setIsOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/50"} ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : ''}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : ""}`} />
                  {!isCollapsed && <><span className="text-sm font-medium">{item.label}</span>{isActive && <div className="ml-auto w-1 h-6 rounded-full bg-blue-400" />}</>}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className={`p-3 border-t border-slate-800 space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <Link href="/" className={`flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <Home className="w-4 h-4" />{!isCollapsed && <span>Back to Home</span>}
          </Link>
          <button className={`flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-4 h-4" />{!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

// --- COMPONENTS ---
const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 rounded-xl">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const FlowStep = ({ number, title, desc, icon: Icon }: { number: number; title: string; desc: string; icon: any }) => (
  <div className="flex items-start gap-4 group">
    <div className="relative">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
        {number}
      </div>
      {number < 10 && <div className="absolute left-1/2 -translate-x-1/2 top-11 w-0.5 h-6 bg-gradient-to-b from-blue-500/50 to-transparent" />}
    </div>
    <div className="flex-1 pb-6">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400" />
        <h4 className="font-semibold text-white text-base">{title}</h4>
      </div>
      <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ModuleCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-blue-500/30 hover:bg-slate-800/40 transition-all group shadow-lg shadow-black/20">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg group-hover:scale-110 transition-transform">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <h4 className="font-semibold text-white text-sm">{title}</h4>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const ViolationRow = ({ type, logic, dependency }: { type: string; logic: string; dependency: string }) => (
  <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
    <td className="px-4 py-3.5 text-sm font-semibold text-white">{type}</td>
    <td className="px-4 py-3.5 text-sm text-slate-300">{logic}</td>
    <td className="px-4 py-3.5 text-sm text-slate-400"><span className="px-2 py-0.5 bg-blue-500/10 rounded-full text-blue-400 text-xs">{dependency}</span></td>
  </tr>
);

export default function SystemDesignPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const flowSteps = [
    { number: 1, title: 'Traffic Image Upload', desc: 'Officer uploads traffic image evidence from AI Analysis Studio', icon: UploadCloud },
    { number: 2, title: 'Image Quality Assessment', desc: 'System checks brightness, blur, noise, and visibility conditions', icon: Eye },
    { number: 3, title: 'Image Preprocessing', desc: 'Enhances low light, rain/noise, shadows, and motion blur using CLAHE', icon: Camera },
    { number: 4, title: 'YOLO Detection', desc: 'Detects vehicles, riders, drivers, pedestrians, helmets, seatbelts, plates, and traffic objects', icon: Cpu },
    { number: 5, title: 'License Plate OCR', desc: 'Extracts plate registration details using PaddleOCR', icon: Scan },
    { number: 6, title: 'Rule Engine', desc: 'Classifies violations using object detection + traffic-rule logic', icon: Brain },
    { number: 7, title: 'Evidence Annotation', desc: 'Generates annotated images with violation labels, bounding boxes, and metadata', icon: FileCheck },
    { number: 8, title: 'PostgreSQL Storage', desc: 'Stores violation records, metadata, and evidence references', icon: Database },
    { number: 9, title: 'Human Review', desc: 'Uncertain cases routed to officers for approval, rejection, or further review', icon: Users },
    { number: 10, title: 'Analytics & Evaluation', desc: 'Generates dashboards for trends, review status, and performance metrics', icon: BarChart3 },
  ];

  const modules = [
    { icon: LayoutDashboard, title: 'Frontend Command Center', desc: 'Next.js dashboard for review, analytics, and calibration management' },
    { icon: Server, title: 'FastAPI Backend', desc: 'Async API gateway for image processing, rule engine, and evidence generation' },
    { icon: Eye, title: 'Image Preprocessing Service', desc: 'CLAHE, denoising, sharpening for low-light, rain, and blur' },
    { icon: Cpu, title: 'Detection Service', desc: 'YOLO-based object detection for vehicles, riders, and traffic objects' },
    { icon: Scan, title: 'OCR Service', desc: 'PaddleOCR for license plate recognition and validation' },
    { icon: Brain, title: 'Violation Rule Engine', desc: 'Geometric and logic-based rules for traffic violation classification' },
    { icon: FileCheck, title: 'Evidence Generation Service', desc: 'Creates annotated images and structured violation evidence' },
    { icon: Database, title: 'PostgreSQL Metadata Store', desc: 'Structured storage for violations, evidence, and camera profiles' },
    { icon: Users, title: 'Human Review Workflow', desc: 'Review console for officer approval, rejection, and remarks' },
    { icon: BarChart3, title: 'Analytics & Evaluation Layer', desc: 'Performance metrics, trends, and enforcement summary reports' },
  ];

  const violationMatrix = [
    { type: 'Helmet Non-Compliance', logic: 'rider + no helmet / missing helmet', dependency: 'YOLO detection' },
    { type: 'Seatbelt Non-Compliance', logic: 'driver region + missing seatbelt', dependency: 'YOLO detection' },
    { type: 'Triple Riding', logic: 'motorcycle + 3 riders overlap', dependency: 'object grouping rule' },
    { type: 'Wrong-Side Driving', logic: 'vehicle direction conflicts with allowed camera direction', dependency: 'camera calibration' },
    { type: 'Stop-Line Violation', logic: 'vehicle crosses virtual stop line', dependency: 'stop-line calibration' },
    { type: 'Red-Light Violation', logic: 'red signal + stop-line crossing', dependency: 'signal ROI + stop line' },
    { type: 'Illegal Parking', logic: 'vehicle inside no-parking polygon', dependency: 'parking zone calibration' },
  ];

  const dataEntities = [
    { name: 'Violation Record', desc: 'Main entity with ID, timestamp, location, camera ID, and status' },
    { name: 'Detected Objects', desc: 'Bounding boxes, labels, and confidence scores from YOLO' },
    { name: 'Violation Items', desc: 'Violation types, confidence scores, and reasoning logic' },
    { name: 'OCR Result', desc: 'License plate text, OCR confidence, and extraction status' },
    { name: 'Evidence Images', desc: 'Original, processed, annotated, and plate crop images' },
    { name: 'Review Actions', desc: 'Officer decisions, remarks, timestamps, and reviewer ID' },
    { name: 'Analytics Metrics', desc: 'Aggregated stats for trends, performance, and review workload' },
    { name: 'Camera Profile', desc: 'Calibration data for stop lines, signal ROI, and parking zones' },
  ];

  const scalabilityItems = [
    { icon: Zap, title: 'Async FastAPI Backend', desc: 'Non-blocking request handling for high throughput' },
    { icon: Cpu, title: 'Modular AI Services', desc: 'Independent services for detection, OCR, and rule engine' },
    { icon: Box, title: 'Separate Model Files', desc: 'Per-violation type models for targeted optimization' },
    { icon: Database, title: 'PostgreSQL Storage', desc: 'Structured records with indexing for fast queries' },
    { icon: HardDrive, title: 'File Storage', desc: 'S3-compatible storage for original, processed, and annotated evidence' },
    { icon: Cloud, title: 'Queue-Ready Design', desc: 'Message queue support for batch processing and scaling' },
    { icon: Gauge, title: 'GPU-Ready Inference', desc: 'Optimized inference layer for GPU acceleration' },
    { icon: MapPin, title: 'Camera-Profile Rules', desc: 'Per-camera configuration for adaptive rule enforcement' },
    { icon: Users, title: 'Human Review Workflow', desc: 'Escalation path for uncertain cases and edge conditions' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="flex items-center justify-between px-6 py-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-slate-400 hidden sm:block">Live</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors relative">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-[1400px] mx-auto space-y-12 relative z-10">
          
          {/* HEADER - Enhanced */}
          <header className="border-b border-slate-800 pb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10">
                <GitBranch className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">System Design & Scalability</h1>
                <p className="text-slate-400 mt-2 max-w-3xl text-base leading-relaxed">
                  Understand how <span className="text-blue-400 font-semibold">ViolationLens AI</span> processes traffic images, detects violations, 
                  generates evidence, stores metadata, supports human review, and scales for future camera networks.
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 font-medium">10-Step Pipeline</span>
                  <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-400 font-medium">10 Modular Services</span>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium">7 Violation Types</span>
                </div>
              </div>
            </div>
          </header>

          {/* 1. Architecture Flow - Enhanced */}
          <section>
            <SectionTitle icon={Workflow} title="Architecture Flow" subtitle="End-to-end pipeline from image upload to evidence generation" />
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {flowSteps.map((step) => (
                  <FlowStep key={step.number} {...step} />
                ))}
              </div>
            </div>
          </section>

          {/* 2. Core System Modules - Enhanced */}
          <section>
            <SectionTitle icon={Network} title="Core System Modules" subtitle="Modular services powering the ViolationLens AI platform" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module, i) => (
                <ModuleCard key={i} {...module} />
              ))}
            </div>
          </section>

          {/* 3. AI Pipeline Explanation - Enhanced */}
          <section>
            <SectionTitle icon={Brain} title="AI Pipeline Explanation" subtitle="Step-by-step processing of traffic image evidence" />
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { step: '1', text: 'Image uploaded from AI Analysis Studio' },
                  { step: '2', text: 'System checks brightness, blur, noise, and visibility' },
                  { step: '3', text: 'Preprocessing enhances low light, rain/noise, shadows, and motion blur' },
                  { step: '4', text: 'YOLO detects vehicles, riders, drivers, pedestrians, helmets, seatbelts, plates, and traffic objects' },
                  { step: '5', text: 'OCR extracts plate registration details' },
                  { step: '6', text: 'Rule engine classifies violations using object detection + traffic-rule logic' },
                  { step: '7', text: 'Annotated evidence image is generated with violation labels and bounding boxes' },
                  { step: '8', text: 'Low-confidence cases are routed to human review console' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 bg-slate-950/50 border border-slate-800 rounded-lg p-3 hover:border-blue-500/20 transition-colors shadow-lg shadow-black/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 shadow-lg shadow-blue-500/10">
                      {item.step}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Violation Logic Matrix - Enhanced */}
          <section>
            <SectionTitle icon={ShieldAlert} title="Violation Logic Matrix" subtitle="How each violation type is detected and classified" />
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800">
                      <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Violation Type</th>
                      <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Detection Logic</th>
                      <th className="px-4 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Dependency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violationMatrix.map((row, i) => (
                      <ViolationRow key={i} {...row} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. Data Storage Design - Enhanced */}
          <section>
            <SectionTitle icon={Database} title="Data Storage Design" subtitle="Core entities powering the ViolationLens AI platform" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataEntities.map((entity, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-blue-500/20 hover:bg-slate-800/30 transition-all shadow-lg shadow-black/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-blue-400" />
                    <h4 className="font-semibold text-white text-sm">{entity.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{entity.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Scalability Plan - Enhanced */}
          <section>
            <SectionTitle icon={Rocket} title="Scalability Plan" subtitle="Built to scale from single camera to city-wide deployment" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scalabilityItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-blue-500/20 hover:bg-slate-800/30 transition-all group shadow-lg shadow-black/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer - Enhanced */}
          <footer className="border-t border-slate-800 pt-8 mt-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white text-lg">Violation<span className="text-blue-400">Lens</span> AI</span>
              <span className="text-slate-600 text-sm">|</span>
              <span className="text-sm text-slate-500">System Design v1.0</span>
            </div>
            <p className="text-sm text-slate-500">Built for efficiency. Designed for accuracy. Ready for scale.</p>
            <div className="flex justify-center gap-4 mt-3 text-xs text-slate-600">
              <span>⚡ 10-Step Pipeline</span>
              <span>🔧 10 Modular Services</span>
              <span>🚦 7 Violation Types</span>
              <span>📊 Real-time Analytics</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

// Additional icons
const Bell = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const User = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);