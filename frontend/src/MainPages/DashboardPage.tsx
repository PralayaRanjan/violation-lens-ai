"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  Legend
} from 'recharts';
import {
  AlertTriangle, CheckCircle, Clock, XCircle,
  Activity, MapPin, ShieldAlert, Zap, Search,
  Filter, Download, Home, Brain, FileText, Users,
  Settings, HelpCircle, LogOut, Menu, LayoutDashboard,
  Eye, Cpu, Server, Database, Layers, GitBranch,
  ChevronRight, Sun, Moon, Grid, List, BarChart3,
  TrendingUp, AlertOctagon, Car, Camera, Scan,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Image, FileCheck, Award, Gauge, HardDrive,
  Cloud, RefreshCw, Target, PieChart as PieChartIcon
} from 'lucide-react';

// --- MOCK DATA ---

const kpiData = [
  { title: "Total Violations", value: "12,485", change: "+14%", icon: ShieldAlert, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { title: "Pending Review", value: "342", change: "-5%", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { title: "Approved Cases", value: "11,890", change: "+18%", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { title: "Rejected Cases", value: "253", change: "-2%", icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { title: "Avg. Confidence", value: "94.2%", change: "+1.2%", icon: Activity, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { title: "OCR Success Rate", value: "87.4%", change: "+3.1%", icon: Scan, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { title: "Avg Processing Time", value: "1.2s", change: "-0.3s", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { title: "AI Reliability Score", value: "91.6%", change: "+2.4%", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
];

const qualityKPIData = [
  { title: "Low-Light Cases", value: "1,284", icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Unreadable Plates", value: "126", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  { title: "Evidence Generated", value: "11,542", icon: FileCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { title: "Images Processed", value: "24,592", icon: Image, color: "text-violet-400", bg: "bg-violet-500/10" },
];

const violationTypesData = [
  { name: 'Helmet', value: 4500, color: '#3b82f6', desc: 'No helmet detected' },
  { name: 'Red Light', value: 2100, color: '#f43f5e', desc: 'Ran red signal' },
  { name: 'Stop Line', value: 1800, color: '#f59e0b', desc: 'Crossed stop line' },
  { name: 'Wrong Side', value: 1500, color: '#8b5cf6', desc: 'Wrong direction' },
  { name: 'Triple Riding', value: 1200, color: '#10b981', desc: '3+ riders' },
  { name: 'Seatbelt', value: 885, color: '#06b6d4', desc: 'No seatbelt' },
  { name: 'Illegal Parking', value: 500, color: '#f472b6', desc: 'Parking violation' },
];

const trendData = [
  { time: '00:00', count: 120, label: 'Midnight' },
  { time: '04:00', count: 85, label: 'Dawn' },
  { time: '08:00', count: 450, label: 'Morning' },
  { time: '12:00', count: 380, label: 'Noon' },
  { time: '16:00', count: 520, label: 'Evening' },
  { time: '20:00', count: 290, label: 'Night' },
  { time: '23:59', count: 150, label: 'Late Night' },
];

const locationData = [
  { location: 'MG Road Junction', count: 850, risk: 'High' },
  { location: 'Tech Park Exit', count: 620, risk: 'High' },
  { location: 'Central Station', count: 490, risk: 'Medium' },
  { location: 'North Highway', count: 310, risk: 'Medium' },
  { location: 'Market Square', count: 280, risk: 'Low' },
];

const recentRecords = [
  { 
    id: 'VL-8921-A', 
    type: 'Red-Light Violation', 
    plate: 'KA 01 AB 1234', 
    conf: 98, 
    status: 'Pending Review', 
    time: '2 mins ago', 
    loc: 'MG Road Junction',
    vehicle_type: 'Car',
    image_quality: 'Good',
    ocr_status: 'Success',
    evidence_status: 'Generated'
  },
  { 
    id: 'VL-8922-B', 
    type: 'Triple Riding', 
    plate: 'MH 12 CD 5678', 
    conf: 76, 
    status: 'Pending Review', 
    time: '5 mins ago', 
    loc: 'Market Square',
    vehicle_type: 'Motorcycle',
    image_quality: 'Medium',
    ocr_status: 'Success',
    evidence_status: 'Generated'
  },
  { 
    id: 'VL-8923-C', 
    type: 'Helmet Non-Compliance', 
    plate: 'DL 8C EF 9012', 
    conf: 92, 
    status: 'Approved', 
    time: '12 mins ago', 
    loc: 'Tech Park Exit',
    vehicle_type: 'Motorcycle',
    image_quality: 'Good',
    ocr_status: 'Success',
    evidence_status: 'Generated'
  },
  { 
    id: 'VL-8924-D', 
    type: 'Wrong-Side Driving', 
    plate: 'TN 09 GH 3456', 
    conf: 85, 
    status: 'Approved', 
    time: '18 mins ago', 
    loc: 'Central Station',
    vehicle_type: 'Car',
    image_quality: 'Low',
    ocr_status: 'Partial',
    evidence_status: 'Generated'
  },
  { 
    id: 'VL-8925-E', 
    type: 'Stop-Line Violation', 
    plate: 'UNKNOWN', 
    conf: 42, 
    status: 'Rejected', 
    time: '25 mins ago', 
    loc: 'North Highway',
    vehicle_type: 'Car',
    image_quality: 'Poor',
    ocr_status: 'Failed',
    evidence_status: 'Missing'
  },
  { 
    id: 'VL-8926-F', 
    type: 'Illegal Parking', 
    plate: 'KA 05 XY 7890', 
    conf: 88, 
    status: 'Pending Review', 
    time: '32 mins ago', 
    loc: 'Market Square',
    vehicle_type: 'SUV',
    image_quality: 'Good',
    ocr_status: 'Success',
    evidence_status: 'Generated'
  },
];

const performanceData = [
  { metric: 'Accuracy', value: 94.2, color: '#3b82f6' },
  { metric: 'Precision', value: 91.7, color: '#8b5cf6' },
  { metric: 'Recall', value: 89.3, color: '#10b981' },
  { metric: 'F1-Score', value: 90.5, color: '#f59e0b' },
  { metric: 'mAP@50', value: 87.8, color: '#f43f5e' },
];

const reviewQueueData = [
  { status: 'Needs Manual Review', count: 342, color: '#f59e0b' },
  { status: 'Low Confidence', count: 156, color: '#f43f5e' },
  { status: 'Rejected Cases', count: 253, color: '#ef4444' },
  { status: 'Officer Queue', count: 89, color: '#8b5cf6' },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl" style={{ backgroundColor: '#0f172a' }}>
        <p className="text-sm text-slate-400 font-medium mb-1">{label}</p>
        {type === 'trend' && (
          <p className="text-xl font-bold text-blue-400">{payload[0].value} violations</p>
        )}
        {type === 'pie' && (
          <>
            <p className="text-xl font-bold text-white">{payload[0].name}</p>
            <p className="text-base text-slate-400">{payload[0].payload.desc}</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{payload[0].value.toLocaleString()}</p>
          </>
        )}
        {type === 'location' && (
          <>
            <p className="text-xl font-bold text-white">{payload[0].payload.location}</p>
            <p className="text-3xl font-bold text-violet-400">{payload[0].value} violations</p>
            <p className="text-base text-slate-400">Risk Level: <span className="font-bold text-amber-400">{payload[0].payload.risk}</span></p>
          </>
        )}
        {type === 'performance' && (
          <>
            <p className="text-xl font-bold text-white">{payload[0].payload.metric}</p>
            <p className="text-3xl font-bold text-blue-400">{payload[0].value}%</p>
          </>
        )}
        {type === 'review' && (
          <>
            <p className="text-xl font-bold text-white">{payload[0].payload.status}</p>
            <p className="text-3xl font-bold text-blue-400">{payload[0].value}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

// Sidebar Component - Collapsible
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Command Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "analyze", label: "AI Analysis Studio", icon: Brain, href: "/analyze" },
    { id: "violations", label: "Violation Records", icon: FileText, href: "/violation_record" },
    { id: "review", label: "Human Review Console", icon: Users, href: "/human-review" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics-page" },
    { id: "evaluation", label: "Performance Evaluation", icon: TrendingUp, href: "/evaluation" },
    { id: "calibration", label: "Camera Calibration", icon: Camera, href: "/calibration" },
    { id: "edge-cases", label: "Edge Case Handling", icon: AlertOctagon, href: "/edge-cases" },
    { id: "system-design", label: "System Design", icon: GitBranch, href: "/system-design" },
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
        {/* Brand */}
        <div className={`p-4 border-b border-slate-800 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <ShieldAlert className="w-5 h-5 text-white" />
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
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors hidden lg:flex`}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-slate-400" />
          )}
        </button>

        {/* Navigation */}
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

        {/* Footer */}
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

export default function DashboardPage() {
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

        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">AI Traffic Evidence Command Center</h1>
              <p className="text-lg text-slate-400 mt-1">
                Monitor violation detection, evidence generation, OCR performance, review workload, and model reliability in one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-slate-300">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Live Updates Active</span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </header>

          {/* Top KPI Cards - Row 1 - INCREASED FONT SIZE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.border} border`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    kpi.change?.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 
                    kpi.change?.startsWith('-') ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-medium truncate">{kpi.title}</p>
                <h3 className="text-xl font-bold text-white mt-1">{kpi.value}</h3>
              </div>
            ))}
          </div>

          {/* Top KPI Cards - Row 2 - INCREASED FONT SIZE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {qualityKPIData.map((kpi, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${kpi.bg} border border-slate-800`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <p className="text-sm text-slate-400 font-medium truncate">{kpi.title}</p>
                <h3 className="text-xl font-bold text-white mt-1">{kpi.value}</h3>
              </div>
            ))}
          </div>

          {/* Violation Type Cards - All 7 - INCREASED FONT SIZE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {violationTypesData.map((type, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-4 text-center hover:bg-slate-800/40 transition-colors">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 truncate" title={type.name}>
                  {type.name}
                </div>
                <div className="text-lg font-bold" style={{ color: type.color }}>
                  {type.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 24hr Trend - Full Box */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">24-Hour Violation Trend</h3>
                  <p className="text-base text-slate-400">Total detected incidents over time with peak analysis</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <div className="flex items-center gap-2 text-base">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-slate-400">Violations</span>
                    </span>
                  </div>
                  <div className="text-base text-slate-400">
                    Peak: <span className="font-bold text-amber-400 text-lg">520</span> @ 16:00
                  </div>
                </div>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#94a3b8" 
                      fontSize={14} 
                      tickLine={false} 
                      axisLine={false}
                      interval={0}
                      fontWeight={500}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={14} 
                      tickLine={false} 
                      axisLine={false}
                      fontWeight={500}
                    />
                    <Tooltip content={<CustomTooltip type="trend" />} />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorCount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Trend Insights - INCREASED FONT SIZE */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Total Today</p>
                  <p className="text-xl font-bold text-white">1,995</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Peak Hour</p>
                  <p className="text-xl font-bold text-amber-400">16:00</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Avg per Hour</p>
                  <p className="text-xl font-bold text-blue-400">83</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Trend</p>
                  <p className="text-xl font-bold text-emerald-400">↑ 12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Violation Breakdown & High-Risk Locations - INCREASED FONT SIZE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">Violation Breakdown</h3>
                <p className="text-base text-slate-400">Distribution by violation type with details</p>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationTypesData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {violationTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip type="pie" />} />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      wrapperStyle={{ fontSize: '14px', color: '#94a3b8', paddingTop: '10px' }}
                      formatter={(value) => <span className="text-slate-300 text-base">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Most Common</p>
                  <p className="text-base font-bold text-blue-400">Helmet</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Total Types</p>
                  <p className="text-base font-bold text-white">7</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Variety</p>
                  <p className="text-base font-bold text-emerald-400">Diverse</p>
                </div>
              </div>
            </div>

            {/* Location Chart */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">High-Risk Locations</h3>
                <p className="text-base text-slate-400">Violation hotspots by area with risk assessment</p>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={14} tickLine={false} axisLine={false} fontWeight={500} />
                    <YAxis 
                      dataKey="location" 
                      type="category" 
                      width={120} 
                      stroke="#94a3b8" 
                      fontSize={14} 
                      tickLine={false} 
                      axisLine={false}
                      fontWeight={500}
                    />
                    <Tooltip 
                      content={<CustomTooltip type="location" />}
                      cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#8b5cf6" 
                      radius={[0, 6, 6, 0]} 
                      barSize={28}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Highest Risk</p>
                  <p className="text-base font-bold text-rose-400">MG Road</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Total Hotspots</p>
                  <p className="text-base font-bold text-white">5</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Action Needed</p>
                  <p className="text-base font-bold text-amber-400">2 High</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Review Queue - INCREASED FONT SIZE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">Performance Snapshot</h3>
                <p className="text-base text-slate-400">Model accuracy, precision, recall, and F1-score</p>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="metric" 
                      stroke="#94a3b8" 
                      fontSize={15} 
                      tickLine={false} 
                      axisLine={false}
                      fontWeight={600}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={15} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 100]}
                      fontWeight={600}
                    />
                    <Tooltip 
                      content={<CustomTooltip type="performance" />}
                      cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-3 pt-3 border-t border-slate-800">
                {performanceData.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-base font-bold" style={{ color: item.color }}>{item.value}%</p>
                    <p className="text-xs text-slate-400 truncate font-medium">{item.metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Queue */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">Review Workload Intelligence</h3>
                <p className="text-base text-slate-400">Needs manual review, low confidence, and rejected cases</p>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reviewQueueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="status" 
                      stroke="#94a3b8" 
                      fontSize={13} 
                      tickLine={false} 
                      axisLine={false}
                      fontWeight={600}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={15} 
                      tickLine={false} 
                      axisLine={false}
                      fontWeight={600}
                    />
                    <Tooltip 
                      content={<CustomTooltip type="review" />}
                      cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                      {reviewQueueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800">
                {reviewQueueData.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-base font-bold" style={{ color: item.color }}>{item.count}</p>
                    <p className="text-xs text-slate-400 truncate font-medium">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Records Table - INCREASED FONT SIZE */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Recent Evidence Records</h3>
                <p className="text-base text-slate-400">Latest pipeline outputs with evidence generation status</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search plate or ID..."
                    className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-200 w-full sm:w-64"
                  />
                </div>
                <button className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-950/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                    <th className="px-4 py-3 font-medium text-sm">Record ID</th>
                    <th className="px-4 py-3 font-medium text-sm">Violation Type</th>
                    <th className="px-4 py-3 font-medium text-sm">License Plate</th>
                    <th className="px-4 py-3 font-medium text-sm">Vehicle</th>
                    <th className="px-4 py-3 font-medium text-sm">Confidence</th>
                    <th className="px-4 py-3 font-medium text-sm">Image Quality</th>
                    <th className="px-4 py-3 font-medium text-sm">OCR</th>
                    <th className="px-4 py-3 font-medium text-sm">Evidence</th>
                    <th className="px-4 py-3 font-medium text-sm">Status</th>
                    <th className="px-4 py-3 font-medium text-sm text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
                  {recentRecords.map((record, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 py-3 font-mono text-sm text-slate-400">{record.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-200 text-sm">{record.type}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded font-mono text-sm ${
                          record.plate === 'UNKNOWN' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 border border-slate-700 text-white'
                        }`}>
                          {record.plate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{record.vehicle_type}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${record.conf > 90 ? 'bg-emerald-500' : record.conf > 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${record.conf}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-400">{record.conf}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                          record.image_quality === 'Good' ? 'bg-emerald-500/10 text-emerald-400' :
                          record.image_quality === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-rose-500/10 text-rose-400'
                        }`}>
                          {record.image_quality}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                          record.ocr_status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' :
                          record.ocr_status === 'Partial' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-rose-500/10 text-rose-400'
                        }`}>
                          {record.ocr_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                          record.evidence_status === 'Generated' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-rose-500/10 text-rose-400'
                        }`}>
                          {record.evidence_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium border ${
                          record.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          record.status === 'Pending Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {record.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                          {record.status === 'Pending Review' && <Clock className="w-3 h-3" />}
                          {record.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500 text-sm">{record.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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