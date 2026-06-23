"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert, CloudRain, Moon, Zap,
  Search, EyeOff, AlertTriangle, Layers,
  CameraOff, TrafficCone, FileQuestion, ArrowRight,
  CheckCircle2, AlertCircle, XCircle,
  ChevronRight, Menu, Home, Brain, Users, BarChart3,
  TrendingUp, LayoutDashboard, ChevronLeft, ChevronRight as ChevronRightIcon,
  LogOut, AlertOctagon, Camera, FileCheck, Gauge,
  Sun, Cloud, Car, MapPin, Navigation, Image, Scan
} from 'lucide-react';

// --- SIDEBAR ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean; setIsOpen: (v: boolean) => void;
  isCollapsed: boolean; setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("edge-cases");
  const navItems = [
    { id: "dashboard", label: "Command Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "analyze", label: "AI Analysis Studio", icon: Brain, href: "/analyze" },
    { id: "violations", label: "Violation Records", icon: FileCheck, href: "/violation_record" },
    { id: "review", label: "Human Review Console", icon: Users, href: "/human-review" },
    { id: "analytics", label: "Analytics & Trends", icon: BarChart3, href: "/analytic-page" },
    { id: "evaluation", label: "Performance Evaluation", icon: TrendingUp, href: "/evaluation" },
    { id: "calibration", label: "Camera Calibration", icon: Camera, href: "/calibration" },
    { id: "edge-cases", label: "Edge Case Handling", icon: AlertOctagon, href: "/edge-cases" },
    { id: "system-design", label: "System Design", icon: Layers, href: "/system-design" },
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

// --- MOCK EDGE CASE DATA ---
const EDGE_CASES = [
  {
    category: 'Environmental & Image Quality',
    icon: CloudRain,
    cases: [
      { id: 'env-1', name: 'Low Light / Night Time', issue: 'Insufficient illumination for accurate feature extraction.', handling: 'CLAHE applied. Warning logged if brightness score is critical.', fallback: 'Route to Human Review if confidence < 60%', status: 'auto_handled' },
      { id: 'env-2', name: 'Motion Blur', issue: 'Fast-moving vehicles causing blurry license plates.', handling: 'Laplacian variance blur score calculated.', fallback: 'Route to Human Review if score < threshold', status: 'manual_review' },
      { id: 'env-3', name: 'Rain / Sensor Noise', issue: 'Artifacts obstructing vehicle or rider details.', handling: 'Denoising filters applied. Confidence thresholds increased.', fallback: 'Route to Human Review if confidence drops', status: 'auto_handled' },
      { id: 'env-4', name: 'Extreme Shadows', issue: 'High contrast causing false bounding boxes.', handling: 'Illumination normalization during preprocessing.', fallback: 'Route to Human Review if detection fails', status: 'auto_handled' }
    ]
  },
  {
    category: 'Detection & Classification',
    icon: Layers,
    cases: [
      { id: 'det-1', name: 'High Traffic Density', issue: 'Overlapping bounding boxes in crowded scenes.', handling: 'Object-level violation grouping using IoU.', fallback: 'Route to Human Review for complex scenes', status: 'auto_handled' },
      { id: 'det-2', name: 'Multiple Violations (Same Vehicle)', issue: 'Vehicle committing red light and no helmet simultaneously.', handling: 'Multi-label violation output array generated per vehicle ID.', fallback: 'All violations logged', status: 'auto_handled' },
      { id: 'det-3', name: 'Partial Vehicle Visible', issue: 'Vehicle at edge of frame.', handling: 'Confidence penalty applied. Requires minimum bounding box area.', fallback: 'Route to Human Review if below threshold', status: 'needs_data' },
      { id: 'det-4', name: 'Helmet Occluded', issue: 'Rider head not fully visible.', handling: 'Helmet classifier confidence drops.', fallback: 'Route to Human Review Console', status: 'manual_review' }
    ]
  },
  {
    category: 'Geometric Logic & Scene Context',
    icon: TrafficCone,
    cases: [
      { id: 'geo-1', name: 'Traffic Light Not Visible', issue: 'Unable to confirm red light state.', handling: 'Violation marked as "Not Verifiable".', fallback: 'Route to Human Review', status: 'manual_review' },
      { id: 'geo-2', name: 'Stop Line Paint Missing', issue: 'Physical line degraded.', handling: 'Utilizes calibrated virtual stop-line per camera profile.', fallback: 'Route to Human Review if missing', status: 'auto_handled' },
      { id: 'geo-3', name: 'Wrong Camera Angle', issue: 'Camera bumped or misaligned.', handling: 'Calibration mismatch detected based on background reference frame.', fallback: 'Alert Admin - Calibration Required', status: 'needs_data' }
    ]
  },
  {
    category: 'OCR & Data Integrity',
    icon: Search,
    cases: [
      { id: 'ocr-1', name: 'Plate Completely Unreadable', issue: 'No text extracted due to glare or dirt.', handling: 'Violation record saved with plate marked as "FAILED_OCR".', fallback: 'Route to Human Review for manual entry', status: 'manual_review' },
      { id: 'ocr-2', name: 'Duplicate Detection', issue: 'Same vehicle flagged multiple times in seconds.', handling: 'Debouncing logic via plate + time + location hash.', fallback: 'Auto-deduplicate', status: 'auto_handled' }
    ]
  },
  {
    category: 'Violation-Specific Edge Cases',
    icon: Car,
    cases: [
      { id: 'viol-1', name: 'Helmet Non-Compliance', issue: 'Helmet partially hidden or cap mistaken as helmet.', handling: 'Multi-angle helmet detection with confidence scoring.', fallback: 'Route to Human Review if confidence < 75%', status: 'manual_review' },
      { id: 'viol-2', name: 'Seatbelt Non-Compliance', issue: 'Seatbelt blocked by steering wheel or dark clothing.', handling: 'Driver region analysis with seatbelt detection model.', fallback: 'Route to Human Review if detection unclear', status: 'manual_review' },
      { id: 'viol-3', name: 'Triple Riding', issue: 'Overlapping riders in crowded two-wheeler scene.', handling: 'Person detection with spatial grouping logic.', fallback: 'Route to Human Review for ambiguous cases', status: 'manual_review' },
      { id: 'viol-4', name: 'Wrong-Side Driving', issue: 'Static image cannot confirm movement direction.', handling: 'Vehicle orientation analysis with direction vector.', fallback: 'Requires video or multiple frames', status: 'needs_data' },
      { id: 'viol-5', name: 'Stop-Line Violation', issue: 'Virtual stop line missing or wrong calibration.', handling: 'Camera calibration profile validation.', fallback: 'Alert Admin - Calibration Required', status: 'needs_data' },
      { id: 'viol-6', name: 'Red-Light Violation', issue: 'Signal light not visible or wrong signal state.', handling: 'Signal ROI analysis with temporal validation.', fallback: 'Route to Human Review if signal unclear', status: 'manual_review' },
      { id: 'viol-7', name: 'Illegal Parking', issue: 'Vehicle stopped temporarily vs actually parked.', handling: 'Duration analysis with temporal context.', fallback: 'Route to Human Review for confirmation', status: 'manual_review' }
    ]
  }
];

const BEFORE_AFTER = [
  { before: 'Low Light', after: 'Enhanced Image', icon: Moon },
  { before: 'Blurred Plate', after: 'OCR Failed → Review', icon: Scan },
  { before: 'Shadow Case', after: 'Preprocessed → Detection', icon: Sun },
  { before: 'Crowded Scene', after: 'Multi-object Grouping', icon: Users },
];

export default function EdgeCasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(EDGE_CASES[0].category);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'auto_handled':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3.5 h-3.5" /> Auto-Handled</span>;
      case 'manual_review':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit"><AlertCircle className="w-3.5 h-3.5" /> Routed to Human</span>;
      case 'needs_data':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit"><XCircle className="w-3.5 h-3.5" /> Calibration Required</span>;
      default:
        return null;
    }
  };

  // Statistics
  const totalCases = EDGE_CASES.reduce((acc, cat) => acc + cat.cases.length, 0);
  const autoHandled = EDGE_CASES.reduce((acc, cat) => acc + cat.cases.filter(c => c.status === 'auto_handled').length, 0);
  const manualReview = EDGE_CASES.reduce((acc, cat) => acc + cat.cases.filter(c => c.status === 'manual_review').length, 0);
  const needsData = EDGE_CASES.reduce((acc, cat) => acc + cat.cases.filter(c => c.status === 'needs_data').length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />
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

        <div className="p-6 max-w-[1600px] mx-auto space-y-6 relative z-10">
          
          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <AlertOctagon className="w-8 h-8 text-blue-500" />
                Robustness & Edge Case Handling
              </h1>
              <p className="text-slate-400 mt-2 max-w-3xl text-base">
                Real-world enforcement requires handling messy, unpredictable data. This page documents how ViolationLens AI systematically addresses environmental anomalies, hardware failures, and ambiguous logic.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/evaluation" className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-slate-700">
                <TrendingUp className="w-4 h-4" /> View Performance Impact
              </Link>
              <Link href="/review" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                <Users className="w-4 h-4" /> Open Review Queue
              </Link>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Edge Cases Detected</p>
              <p className="text-2xl font-bold text-white">{totalCases}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Auto-Handled</p>
              <p className="text-2xl font-bold text-emerald-400">{Math.round((autoHandled / totalCases) * 100)}%</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Routed to Review</p>
              <p className="text-2xl font-bold text-amber-400">{Math.round((manualReview / totalCases) * 100)}%</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Calibration Alerts</p>
              <p className="text-2xl font-bold text-rose-400">{Math.round((needsData / totalCases) * 100)}%</p>
            </div>
          </div>

          {/* Before / After Examples */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-blue-400" /> Before / After Examples
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {BEFORE_AFTER.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-sm text-rose-400 font-medium">{item.before}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-emerald-400 font-medium">{item.after}</span>
                    </div>
                    <Icon className="w-6 h-6 mx-auto text-slate-500" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: Category Navigation */}
            <div className="lg:col-span-3 space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 px-2">Vulnerability Vectors</h3>
              {EDGE_CASES.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                    activeCategory === category.category 
                    ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5" />
                    <span className="font-semibold text-sm text-left">{category.category}</span>
                  </div>
                  {activeCategory === category.category && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}

              {/* Responsible AI Panel */}
              <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <FileQuestion className="w-4 h-4 text-violet-400" /> Responsible AI
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If image quality, OCR confidence, or rule confidence falls below threshold, ViolationLens AI routes the case to human review instead of approving uncertain evidence automatically.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quick Stats</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Edge Cases</span>
                    <span className="font-bold text-white">{totalCases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Categories</span>
                    <span className="font-bold text-white">{EDGE_CASES.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Auto-Handled</span>
                    <span className="font-bold text-emerald-400">{autoHandled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Needs Review</span>
                    <span className="font-bold text-amber-400">{manualReview}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Detail View */}
            <div className="lg:col-span-9">
              {EDGE_CASES.map((cat) => (
                <div 
                  key={cat.category} 
                  className={`${activeCategory === cat.category ? 'block' : 'hidden'} animate-in slide-in-from-right-4 duration-300`}
                >
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    
                    <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <cat.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{cat.category}</h2>
                        <p className="text-sm text-slate-400">Systemic handling strategies for known failure modes.</p>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="space-y-4">
                        {cat.cases.map((c) => (
                          <div key={c.id} className="group bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                              
                              {/* Issue Definition */}
                              <div className="lg:col-span-3 space-y-1.5">
                                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                                  {c.name}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {c.issue}
                                </p>
                              </div>

                              {/* Arrow */}
                              <div className="hidden lg:flex lg:col-span-1 justify-center items-center h-full text-slate-700 group-hover:text-blue-500/50 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                              </div>

                              {/* System Response */}
                              <div className="lg:col-span-5 space-y-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                                <div>
                                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Handling Strategy</span>
                                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{c.handling}</p>
                                </div>
                                <div className="pt-2 border-t border-slate-800/50">
                                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Fallback</span>
                                  <p className="text-xs text-amber-400 mt-0.5">{c.fallback}</p>
                                </div>
                              </div>

                              {/* Status */}
                              <div className="lg:col-span-3 flex flex-col items-start gap-1.5">
                                {getStatusBadge(c.status)}
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
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