"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, Radar, Legend, ComposedChart
} from 'recharts';
import {
    BarChart3, TrendingUp, MapPin, Car, ShieldCheck,
    AlertCircle, Calendar, Download, Filter, FileText,
    Activity, Users, Zap, Hash, Menu, Home, Brain,
    LayoutDashboard, ChevronLeft, ChevronRight as ChevronRightIcon,
    LogOut, Camera, Eye, Scan, FileCheck, Award, Gauge,
    Image, AlertTriangle, CheckCircle, Clock, Layers,
    AlertOctagon
} from 'lucide-react';

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (v: boolean) => void;
}) => {
    const [active, setActive] = useState("analytics");

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
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[280px]'
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
                        <ChevronRightIcon className="w-3 h-3 text-slate-400" />
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
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
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

// --- MOCK DATA - UPDATED WITH ALL 7 VIOLATIONS ---
const trendData = [
    { date: 'Jun 13', total: 1120, reviewed: 210 },
    { date: 'Jun 14', total: 1350, reviewed: 280 },
    { date: 'Jun 15', total: 1250, reviewed: 240 },
    { date: 'Jun 16', total: 1580, reviewed: 320 },
    { date: 'Jun 17', total: 1890, reviewed: 410 },
    { date: 'Jun 18', total: 1420, reviewed: 250 },
    { date: 'Jun 19', total: 1680, reviewed: 310 },
];

// All 7 violation types
const violationTypeData = [
    { name: 'Helmet Non-Compliance', value: 4200, color: '#3b82f6' },
    { name: 'Red-Light Violation', value: 2800, color: '#f43f5e' },
    { name: 'Stop-Line Violation', value: 2100, color: '#f59e0b' },
    { name: 'Wrong-Side Driving', value: 1500, color: '#8b5cf6' },
    { name: 'Triple Riding', value: 950, color: '#10b981' },
    { name: 'Seatbelt Non-Compliance', value: 650, color: '#06b6d4' },
    { name: 'Illegal Parking', value: 400, color: '#f472b6' },
];

const locationData = [
    { location: 'MG Road Junction', count: 3200 },
    { location: 'Tech Park Exit', count: 2800 },
    { location: 'Central Station', count: 2100 },
    { location: 'Airport Highway', count: 1800 },
    { location: 'Market Square', count: 1200 },
];

const vehicleData = [
    { name: 'Motorcycle', value: 6800, color: '#8b5cf6' },
    { name: 'Car', value: 3400, color: '#3b82f6' },
    { name: 'Auto/Cab', value: 1200, color: '#f59e0b' },
    { name: 'Heavy/Truck', value: 800, color: '#64748b' },
];

// Updated confidence data with all 7 violations
const confidenceData = [
    { subject: 'Helmet', AI: 96, fullMark: 100 },
    { subject: 'Red Light', AI: 92, fullMark: 100 },
    { subject: 'Stop Line', AI: 88, fullMark: 100 },
    { subject: 'Wrong Side', AI: 85, fullMark: 100 },
    { subject: 'Triple Riding', AI: 94, fullMark: 100 },
    { subject: 'Seatbelt', AI: 78, fullMark: 100 },
    { subject: 'Parking', AI: 82, fullMark: 100 },
];

// OCR Analytics Data
const ocrData = [
    { metric: 'Success Rate', value: 87.6 },
    { metric: 'Avg Confidence', value: 82.4 },
    { metric: 'Unreadable', value: 326 },
    { metric: 'Partial Match', value: 184 },
];

// Image Quality Analytics
const qualityData = [
    { label: 'Good Quality', value: 78, color: '#10b981' },
    { label: 'Low Light', value: 12, color: '#f59e0b' },
    { label: 'Blurred', value: 6, color: '#f43f5e' },
    { label: 'Rain/Shadow', value: 4, color: '#8b5cf6' },
];

const repeatOffenders = [
    { plate: 'MH 12 AB 1234', count: 14, type: 'Car', lastOffense: 'Red-Light Violation', risk: 'High' },
    { plate: 'KA 01 CD 5678', count: 11, type: 'Motorcycle', lastOffense: 'Triple Riding', risk: 'High' },
    { plate: 'DL 8C EF 9012', count: 8, type: 'Auto', lastOffense: 'Wrong-Side Driving', risk: 'Medium' },
    { plate: 'TN 09 GH 3456', count: 7, type: 'Motorcycle', lastOffense: 'Helmet Non-Compliance', risk: 'Medium' },
    { plate: 'TS 07 IJ 7890', count: 6, type: 'Car', lastOffense: 'Stop-Line Violation', risk: 'Medium' },
];

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-xl" style={{ backgroundColor: '#0f172a' }}>
                <p className="text-slate-300 font-semibold mb-2 text-sm">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-slate-400">{entry.name}:</span>
                        <span className="text-white font-mono font-medium">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// --- MAIN PAGE ---
export default function AnalyticsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [timeRange, setTimeRange] = useState('7D');

    // Calculate AI Reliability Score: Avg confidence × approval rate
    const avgConfidence = 91.8;
    const approvalRate = 82.4;
    const reliabilityScore = ((avgConfidence * approvalRate) / 100).toFixed(1);

    // OCR Success Rate for KPI
    const ocrSuccessRate = 87.6;

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
                                <BarChart3 className="w-8 h-8 text-blue-500" />
                                Violation Analytics & Trends
                            </h1>
                            <p className="text-slate-400 mt-2 max-w-3xl text-base">
                                Analyze violation trends, OCR performance, AI confidence, evidence quality, review workload, and enforcement hotspots generated from traffic image analysis.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex">
                                {['24H', '7D', '30D', 'YTD'].map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeRange === range ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                            <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                <Download className="w-4 h-4" /> Export Report PDF
                            </button>
                        </div>
                    </header>

                    {/* --- KPI ROW (Updated) --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <Activity className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Violations Detected</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-white">12,200</h3>
                                    <span className="text-emerald-400 text-sm font-medium">↑ 14%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Review Approval Rate</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-white">82.4%</h3>
                                    <span className="text-emerald-400 text-sm font-medium">↑ 2.1%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                <Users className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Manual Review Ratio</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-white">14.2%</h3>
                                    <span className="text-rose-400 text-sm font-medium">↑ 0.5%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                                <Zap className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Avg AI Confidence</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-white">91.8%</h3>
                                    <span className="text-emerald-400 text-sm font-medium">↑ 1.2%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- SECOND KPI ROW: OCR, EVIDENCE, QUALITY --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                <Scan className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">OCR Success Rate</p>
                                <h3 className="text-xl font-bold text-white">{ocrSuccessRate}%</h3>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <FileCheck className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Evidence Generated</p>
                                <h3 className="text-xl font-bold text-white">11,842</h3>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                <Image className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Low-Quality Images</p>
                                <h3 className="text-xl font-bold text-white">326</h3>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                <Award className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">AI Reliability Score</p>
                                <h3 className="text-xl font-bold text-white">{reliabilityScore}%</h3>
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 1: TRENDS & BREAKDOWN --- */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Main Trend Area Chart */}
                        <div className="xl:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-400" /> Detection Volume vs. Human Review
                                    </h2>
                                    <p className="text-sm text-slate-400">Total detected violations overlaid with cases requiring manual intervention.</p>
                                </div>
                            </div>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="total" name="Total Detected" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                                        <Area type="monotone" dataKey="reviewed" name="Manual Review Needed" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorReview)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Violation Type Donut - Updated with all 7 */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col">
                            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-violet-400" /> Violations by Type
                            </h2>
                            <div className="flex-1 min-h-[300px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={violationTypeData}
                                            cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2}
                                            dataKey="value" stroke="none"
                                        >
                                            {violationTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold text-white">12.2K</span>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest">Total</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-4">
                                {violationTypeData.map(item => (
                                    <div key={item.name} className="flex items-center gap-2 text-xs">
                                        <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-300 truncate text-xs" title={item.name}>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 2: CONFIDENCE, VEHICLES, QUALITY --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Radar Chart: Confidence by Type - Updated */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-emerald-400" /> AI Confidence by Type
                            </h2>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={confidenceData}>
                                        <PolarGrid stroke="#1e293b" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Confidence %" dataKey="AI" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.2} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#10b981' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Vehicle Category Pie */}
                        {/* Vehicle Category Pie */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col">
                            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <Car className="w-5 h-5 text-cyan-400" /> Violations by Vehicle Class
                            </h2>
                            <div className="flex-1 min-h-[250px] flex items-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={vehicleData}
                                            cx="50%" cy="50%" outerRadius={100}
                                            dataKey="value" stroke="#020617" strokeWidth={2}
                                            labelLine={false}
                                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                                // Add null checks
                                                if (cx === undefined || cy === undefined || midAngle === undefined ||
                                                    innerRadius === undefined || outerRadius === undefined || percent === undefined) {
                                                    return null;
                                                }
                                                // Only show label if percent > 5%
                                                if (percent <= 0.05) return null;

                                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                                return (
                                                    <text x={x} y={y} fill="white" fontSize={12} fontWeight="bold" textAnchor="middle" dominantBaseline="central">
                                                        {`${(percent * 100).toFixed(0)}%`}
                                                    </text>
                                                );
                                            }}
                                        >
                                            {vehicleData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Image Quality / Preprocessing Analytics */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Image className="w-5 h-5 text-amber-400" /> Image Quality & Preprocessing
                            </h2>
                            <div className="space-y-4">
                                {qualityData.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-300">{item.label}</span>
                                            <span className="text-white font-mono font-medium">{item.value}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-3 pt-3 border-t border-slate-800">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Preprocessing Success Rate</span>
                                        <span className="text-emerald-400 font-bold">96.8%</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-slate-400">Needs Review Due to Poor Visibility</span>
                                        <span className="text-amber-400 font-bold">184</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 3: OCR ANALYTICS & EVIDENCE SUMMARY --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* OCR Analytics */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Scan className="w-5 h-5 text-cyan-400" /> OCR & License Plate Analytics
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {ocrData.map((item, idx) => (
                                    <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-white">
                                            {typeof item.value === 'number' && item.value > 100 ? item.value : `${item.value}%`}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">{item.metric}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                                <p className="text-sm text-slate-400 text-center">
                                    <span className="text-cyan-400 font-semibold">Unreadable Plates: 326</span> cases routed for manual review
                                </p>
                            </div>
                        </div>

                        {/* Evidence Generation Summary */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-emerald-400" /> Evidence Generation Summary
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-emerald-400">11,842</p>
                                    <p className="text-xs text-slate-400 mt-1">Annotated Evidence</p>
                                </div>
                                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-rose-400">1.2%</p>
                                    <p className="text-xs text-slate-400 mt-1">Evidence Failure Rate</p>
                                </div>
                                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-blue-400">12,200</p>
                                    <p className="text-xs text-slate-400 mt-1">Metadata Records</p>
                                </div>
                                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-violet-400">2.4s</p>
                                    <p className="text-xs text-slate-400 mt-1">Avg Generation Time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 4: PROCESSING OUTCOMES --- */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-400" /> Processing Outcomes
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-emerald-400 font-semibold">Approved After Review (82.4%)</span>
                                        <span className="text-rose-400 font-semibold">Rejected (3.8%)</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-emerald-500" style={{ width: '82.4%' }}></div>
                                        <div className="h-full bg-amber-500" style={{ width: '13.8%' }}></div>
                                        <div className="h-full bg-rose-500" style={{ width: '3.8%' }}></div>
                                    </div>
                                    <div className="flex justify-center gap-6 mt-4 text-xs text-slate-400">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Approved</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full" /> Manual Review</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Rejected</div>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Primary Rejection / Review Reasons</h4>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex justify-between items-center p-2 bg-slate-950/50 rounded-lg">
                                            <span>Unreadable Plate / Glare</span>
                                            <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">42%</span>
                                        </li>
                                        <li className="flex justify-between items-center p-2 bg-slate-950/50 rounded-lg">
                                            <span>Low Model Confidence (&lt;70%)</span>
                                            <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">35%</span>
                                        </li>
                                        <li className="flex justify-between items-center p-2 bg-slate-950/50 rounded-lg">
                                            <span>Ambulance/Emergency Exemption</span>
                                            <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">23%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 5: LOCATIONS & REPEAT OFFENDERS --- */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* Location Bar */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-rose-400" /> Hotspots by Location
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={locationData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                        <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis dataKey="location" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={120} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
                                        <Bar dataKey="count" name="Violations" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24}>
                                            {locationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : index === 1 ? '#f59e0b' : '#8b5cf6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Repeat Offenders */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-800">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-amber-400" /> Top Repeat Offenders
                                </h2>
                                <p className="text-sm text-slate-400 mt-1">Vehicles with highest violation counts in selected period.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-950 border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                                            <th className="px-6 py-3 font-medium">License Plate</th>
                                            <th className="px-6 py-3 font-medium text-center">Count</th>
                                            <th className="px-6 py-3 font-medium">Vehicle</th>
                                            <th className="px-6 py-3 font-medium">Last Offense</th>
                                            <th className="px-6 py-3 font-medium">Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-sm">
                                        {repeatOffenders.map((offender, i) => (
                                            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-3">
                                                    <span className="font-mono font-bold text-slate-200 bg-slate-950 border border-slate-700 px-2 py-1 rounded text-xs">
                                                        {offender.plate}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    <span className="font-bold text-white">{offender.count}</span>
                                                </td>
                                                <td className="px-6 py-3 text-slate-400 text-sm">{offender.type}</td>
                                                <td className="px-6 py-3 text-slate-400 text-sm">{offender.lastOffense}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${offender.risk === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        }`}>
                                                        {offender.risk}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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