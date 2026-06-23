"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, ComposedChart,
  Legend
} from 'recharts';
import {
  Activity, Target, Crosshair, Zap, Cpu, HardDrive,
  Gauge, Search, AlertTriangle, Download, Terminal,
  FileText, Network, CheckCircle2, ShieldCheck,
  TrendingUp, Menu, Home, Brain, Users, BarChart3,
  LayoutDashboard, ChevronLeft, ChevronRight, LogOut,
  Camera, AlertOctagon, Layers, Eye, Image, Scan,
  Clock, Award, AlertCircle
} from 'lucide-react';

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("evaluation");

  const navItems = [
    { id: "dashboard", label: "Command Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "analyze", label: "AI Analysis Studio", icon: Brain, href: "/analyze" },
    { id: "violations", label: "Violation Records", icon: FileText, href: "/violation_record" },
    { id: "review", label: "Human Review Console", icon: Users, href: "/human-review" },
    { id: "analytics", label: "Analytics & Trends", icon: BarChart3, href: "/analytics-page" },
    { id: "evaluation", label: "Performance Evaluation", icon: TrendingUp, href: "/evaluation" },
    { id: "calibration", label: "Camera Calibration", icon: Camera, href: "/calibration" },
    { id: "edge-cases", label: "Edge Case Handling", icon: AlertOctagon, href: "/edge-cases" },
    { id: "system-design", label: "System Design", icon: Layers, href: "/system-design" },
  ];

  return (
    <>
      {isOpen && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${
          isCollapsed ? 'w-[72px]' : 'w-[280px]'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col`}
      >
        <div className={`p-4 border-b border-slate-800 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Violation<span className="text-blue-400">Lens</span>
                </h1>
                <p className="text-xs uppercase tracking-wider text-slate-400">Command Center</p>
              </div>
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors hidden lg:flex`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-slate-400" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-slate-400" />
          )}
        </button>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActive(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : ""}`} />
                  {!isCollapsed && (
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && <div className="ml-auto w-1 h-6 rounded-full bg-blue-400" />}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className={`p-3 border-t border-slate-800 space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Back to Home' : ''}
          >
            <Home className="w-4 h-4" />
            {!isCollapsed && <span>Back to Home</span>}
          </Link>
          <button
            className={`flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Sign Out' : ''}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

// --- MOCK DATA ---
const epochData = [
  { epoch: 10, map50: 0.42, map95: 0.28, loss: 4.2 },
  { epoch: 20, map50: 0.65, map95: 0.45, loss: 3.1 },
  { epoch: 30, map50: 0.78, map95: 0.58, loss: 2.4 },
  { epoch: 40, map50: 0.85, map95: 0.66, loss: 1.8 },
  { epoch: 50, map50: 0.89, map95: 0.71, loss: 1.5 },
  { epoch: 60, map50: 0.92, map95: 0.75, loss: 1.2 },
  { epoch: 70, map50: 0.94, map95: 0.78, loss: 1.0 },
  { epoch: 80, map50: 0.95, map95: 0.81, loss: 0.9 },
];

const inferenceDistribution = [
  { ms: '0-10ms', count: 15 },
  { ms: '10-20ms', count: 120 },
  { ms: '20-30ms', count: 450 },
  { ms: '30-40ms', count: 310 },
  { ms: '40-50ms', count: 85 },
  { ms: '50ms+', count: 20 },
];

const ocrData = [
  { name: 'Perfect Match', value: 88, color: '#10b981' },
  { name: '1-Char Error', value: 8, color: '#f59e0b' },
  { name: 'Failed/Glare', value: 4, color: '#f43f5e' },
];

// Updated class metrics - Object classes
const classMetrics = [
  { cls: 'Car', precision: 0.98, recall: 0.97, map: 0.98 },
  { cls: 'Motorcycle', precision: 0.96, recall: 0.95, map: 0.96 },
  { cls: 'Person', precision: 0.92, recall: 0.89, map: 0.91 },
  { cls: 'Traffic Light', precision: 0.95, recall: 0.94, map: 0.94 },
];

// NEW: Violation-class metrics - All 7 violations
const violationMetrics = [
  { type: 'Helmet Non-Compliance', precision: 0.94, recall: 0.91, f1: 0.92, accuracy: 0.93 },
  { type: 'Seatbelt Non-Compliance', precision: 0.88, recall: 0.85, f1: 0.86, accuracy: 0.87 },
  { type: 'Triple Riding', precision: 0.92, recall: 0.89, f1: 0.90, accuracy: 0.91 },
  { type: 'Wrong-Side Driving', precision: 0.86, recall: 0.83, f1: 0.84, accuracy: 0.85 },
  { type: 'Stop-Line Violation', precision: 0.90, recall: 0.87, f1: 0.88, accuracy: 0.89 },
  { type: 'Red-Light Violation', precision: 0.93, recall: 0.90, f1: 0.91, accuracy: 0.92 },
  { type: 'Illegal Parking', precision: 0.85, recall: 0.82, f1: 0.83, accuracy: 0.84 },
];

// NEW: Image Quality Robustness
const imageQualityData = [
  { condition: 'Clear', accuracy: 0.96 },
  { condition: 'Low Light', accuracy: 0.89 },
  { condition: 'Blurred', accuracy: 0.84 },
  { condition: 'Rain/Noise', accuracy: 0.86 },
  { condition: 'Shadow', accuracy: 0.88 },
];

const qualityImprovement = [
  { condition: 'Before', value: 76 },
  { condition: 'After Preprocessing', value: 88 },
];

const failureModes = [
  { name: 'Low Light', count: 28, color: '#f59e0b' },
  { name: 'Motion Blur', count: 23, color: '#f43f5e' },
  { name: 'Rain / Noise', count: 18, color: '#3b82f6' },
  { name: 'Shadow', count: 15, color: '#8b5cf6' },
  { name: 'Occluded Helmet', count: 12, color: '#10b981' },
  { name: 'Unreadable Plate', count: 32, color: '#f472b6' },
  { name: 'Multiple Vehicles', count: 20, color: '#06b6d4' },
  { name: 'Low Confidence', count: 25, color: '#ef4444' },
];

// NEW: Human Review Safety Metrics
const reviewSafetyMetrics = [
  { label: 'Low Confidence Routed to Review', value: '4.2%', color: 'text-amber-400' },
  { label: 'Manual Review Rate', value: '18.6%', color: 'text-blue-400' },
  { label: 'False Positive Review Rate', value: '6.3%', color: 'text-rose-400' },
  { label: 'Needs More Evidence', value: '3.8%', color: 'text-orange-400' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl" style={{ backgroundColor: '#0f172a' }}>
        <p className="text-slate-300 font-semibold mb-2 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.stroke }} />
            <span className="text-slate-400">{entry.name}:</span>
            <span className="text-white font-mono font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EvaluationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="flex items-center justify-between px-6 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
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

        <div className="p-6 md:p-8 max-w-[1800px] mx-auto space-y-6 relative z-10">

          {/* --- HEADER --- */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Terminal className="w-8 h-8 text-blue-500" />
                Model Performance & Evaluation
              </h1>
              <p className="text-slate-400 mt-2 max-w-3xl text-base">
                Evaluate AI reliability, efficiency, and scalability. Review accuracy, recall, processing throughput, OCR performance, image quality robustness, and failure mode analysis.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                <Network className="w-4 h-4 text-violet-400" /> YOLO11n + PaddleOCR
              </span>
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Download className="w-4 h-4" /> Export ML Report
              </button>
            </div>
          </header>

          {/* --- PRIMARY AI METRICS --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              { label: "Accuracy", value: "96.4%", icon: Target, color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
              { label: "Precision", value: "94.8%", icon: Crosshair, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10" },
              { label: "Recall", value: "93.2%", icon: Activity, color: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/10" },
              { label: "F1-Score", value: "0.94", icon: ShieldCheck, color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10" },
              { label: "mAP (50-95)", value: "0.81", icon: Network, color: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10" },
            ].map((metric, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 hover:bg-slate-800/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg ${metric.bg} ${metric.border} border`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 mt-3">{metric.label}</p>
                <h3 className="text-2xl font-bold text-white font-mono">{metric.value}</h3>
              </div>
            ))}
          </div>

          {/* --- SYSTEM EFFICIENCY & SCALABILITY --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">YOLO Inference</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white font-mono">24ms</h3>
                  <span className="text-slate-400 text-xs">/ frame</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Full Pipeline Time</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white font-mono">850ms</h3>
                  <span className="text-slate-400 text-xs">/ image</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                <Gauge className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Batch Throughput</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white font-mono">120</h3>
                  <span className="text-slate-400 text-xs">imgs / min</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                <HardDrive className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Model Size</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white font-mono">6.2 MB</h3>
                  <span className="text-emerald-400 text-xs font-medium">ONNX</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- VALIDATION CHART --- */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" /> Validation mAP & Loss History
                  </h2>
                  <p className="text-sm text-slate-400">Tracking mean Average Precision and Box Loss across 80 training epochs.</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={epochData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="epoch" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="map50" name="mAP@0.5" stroke="#10b981" strokeWidth={3} dot={false} />
                    <Line yAxisId="left" type="monotone" dataKey="map95" name="mAP@0.5:0.95" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Area yAxisId="right" type="monotone" dataKey="loss" name="Validation Loss" fill="#f43f5e" fillOpacity={0.1} stroke="#f43f5e" strokeWidth={1} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" /> Pipeline Latency Distribution
                  </h2>
                  <p className="text-sm text-slate-400">End-to-end processing time (Detection + Rule Engine + OCR).</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inferenceDistribution} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="ms" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b'}} />
                    <Bar dataKey="count" name="Frequency" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40}>
                      {inferenceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#3b82f6' : '#64748b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* --- OBJECT-CLASS PERFORMANCE --- */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" /> Object-Class Performance Metrics
              </h2>
              <p className="text-sm text-slate-400 mt-1">Breakdown of model performance across primary traffic entity classes.</p>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Entity Class</th>
                    <th className="px-4 py-3 font-medium">Precision</th>
                    <th className="px-4 py-3 font-medium">Recall</th>
                    <th className="px-4 py-3 font-medium">mAP@50</th>
                    <th className="px-4 py-3 font-medium w-1/3">Performance Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {classMetrics.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-200">{item.cls}</td>
                      <td className="px-4 py-4 font-mono text-blue-400">{item.precision.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-violet-400">{item.recall.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-emerald-400">{item.map.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${item.map * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- VIOLATION-CLASS PERFORMANCE - NEW --- */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" /> Violation-Class Performance Metrics
              </h2>
              <p className="text-sm text-slate-400 mt-1">Breakdown of model performance across all 7 violation types.</p>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">Violation Type</th>
                    <th className="px-4 py-3 font-medium">Precision</th>
                    <th className="px-4 py-3 font-medium">Recall</th>
                    <th className="px-4 py-3 font-medium">F1-Score</th>
                    <th className="px-4 py-3 font-medium">Rule Accuracy</th>
                    <th className="px-4 py-3 font-medium w-1/4">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {violationMetrics.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-200">{item.type}</td>
                      <td className="px-4 py-4 font-mono text-blue-400">{item.precision.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-violet-400">{item.recall.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-emerald-400">{item.f1.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-amber-400">{item.accuracy.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${item.accuracy * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- OCR EVALUATION & IMAGE QUALITY --- */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* OCR Donut */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-400" /> OCR Evaluation
              </h2>
              <div className="h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ocrData}
                      cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}
                      dataKey="value" stroke="none"
                    >
                      {ocrData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                  <span className="text-2xl font-bold text-white font-mono">88%</span>
                  <span className="text-[10px] text-slate-400 uppercase">Exact Match</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2 text-xs">
                {ocrData.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Quality Robustness - NEW */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Image className="w-5 h-5 text-emerald-400" /> Image Quality Robustness
              </h2>
              <div className="space-y-4">
                {imageQualityData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{item.condition}</span>
                      <span className="text-white font-mono font-medium">{(item.accuracy * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.accuracy * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Preprocessing Improvement</span>
                    <span className="text-emerald-400 font-bold">+11.8%</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-400">Low-Light Accuracy</span>
                    <span className="text-amber-400 font-bold">89.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- HUMAN REVIEW SAFETY METRICS - NEW --- */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Human Review Safety Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reviewSafetyMetrics.map((item, idx) => (
                <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                  <p className={`text-2xl font-bold font-mono ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 text-center mt-4">
              <span className="text-amber-400 font-semibold">Responsible AI:</span> Low-confidence cases are routed to human review instead of automatic approval.
            </p>
          </div>

          {/* --- FAILURE MODE ANALYSIS --- */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" /> Robustness & Failure Mode Analysis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {failureModes.map((item, idx) => (
                <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold font-mono" style={{ color: item.color }}>{item.count}%</p>
                  <p className="text-xs text-slate-400 mt-1">{item.name}</p>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
                    <div className="h-full rounded-full" style={{ width: `${item.count}%`, backgroundColor: item.color }} />
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