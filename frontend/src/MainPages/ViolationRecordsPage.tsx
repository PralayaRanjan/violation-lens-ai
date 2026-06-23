"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Filter, Download, Eye, MoreVertical,
  Calendar, MapPin, ShieldAlert, Car, AlertCircle,
  CheckCircle2, Clock, XCircle, SlidersHorizontal,
  ChevronLeft, ChevronRight, FileText, Menu, Home,
  Brain, LayoutDashboard, ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon, LogOut, Camera,
  Scan, Image, AlertTriangle, Users, BarChart3,
  TrendingUp, AlertOctagon, Layers, Gauge, FileCheck
} from 'lucide-react';

// --- TYPES ---
type ReviewStatus = 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW' | 'NEEDS_MANUAL_REVIEW';
type OCRStatus = 'SUCCESS' | 'LOW_CONFIDENCE' | 'FAILED';
type ImageQuality = 'CLEAR' | 'LOW_LIGHT' | 'BLURRY' | 'RAIN_NOISE' | 'SHADOW' | 'POOR_VISIBILITY';
type EvidenceStatus = 'GENERATED' | 'MISSING' | 'NEEDS_REVIEW';

interface ViolationRecord {
  id: string;
  timestamp: string;
  location: string;
  types: string[];
  vehicleType: string;
  plate: string;
  ocrStatus: OCRStatus;
  ocrConfidence: number;
  confidence: number;
  imageQuality: ImageQuality;
  evidenceStatus: EvidenceStatus;
  status: ReviewStatus;
  processingTimeMs: number;
}

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("violations");

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

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors hidden lg:flex`}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          ) : (
            <ChevronLeftIcon className="w-3 h-3 text-slate-400" />
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

// --- MOCK DATA WITH ALL FIELDS ---
const MOCK_RECORDS: ViolationRecord[] = [
  { 
    id: 'VL-20260619-001', 
    timestamp: '2026-06-19T08:14:22Z', 
    location: 'MG Road Junction', 
    types: ['Red-Light Violation', 'Stop-Line Violation'], 
    vehicleType: 'Car', 
    plate: 'MH 12 AB 1234', 
    ocrStatus: 'SUCCESS',
    ocrConfidence: 94,
    confidence: 0.98, 
    imageQuality: 'CLEAR',
    evidenceStatus: 'GENERATED',
    status: 'APPROVED', 
    processingTimeMs: 840 
  },
  { 
    id: 'VL-20260619-002', 
    timestamp: '2026-06-19T08:16:05Z', 
    location: 'Tech Park Exit', 
    types: ['Triple Riding', 'Helmet Non-Compliance'], 
    vehicleType: 'Motorcycle', 
    plate: 'KA 01 CD 5678', 
    ocrStatus: 'SUCCESS',
    ocrConfidence: 88,
    confidence: 0.91, 
    imageQuality: 'CLEAR',
    evidenceStatus: 'GENERATED',
    status: 'PENDING_REVIEW', 
    processingTimeMs: 1120 
  },
  { 
    id: 'VL-20260619-003', 
    timestamp: '2026-06-19T08:22:11Z', 
    location: 'Central Station', 
    types: ['Wrong-Side Driving'], 
    vehicleType: 'Auto', 
    plate: 'DL 8C EF 9012', 
    ocrStatus: 'LOW_CONFIDENCE',
    ocrConfidence: 62,
    confidence: 0.85, 
    imageQuality: 'LOW_LIGHT',
    evidenceStatus: 'GENERATED',
    status: 'APPROVED', 
    processingTimeMs: 950 
  },
  { 
    id: 'VL-20260619-004', 
    timestamp: '2026-06-19T08:45:30Z', 
    location: 'Market Square', 
    types: ['Illegal Parking'], 
    vehicleType: 'Car', 
    plate: 'UNKNOWN', 
    ocrStatus: 'FAILED',
    ocrConfidence: 0,
    confidence: 0.62, 
    imageQuality: 'SHADOW',
    evidenceStatus: 'NEEDS_REVIEW',
    status: 'NEEDS_MANUAL_REVIEW', 
    processingTimeMs: 1450 
  },
  { 
    id: 'VL-20260619-005', 
    timestamp: '2026-06-19T09:02:15Z', 
    location: 'North Highway', 
    types: ['Seatbelt Non-Compliance'], 
    vehicleType: 'Truck', 
    plate: 'TN 09 GH 3456', 
    ocrStatus: 'LOW_CONFIDENCE',
    ocrConfidence: 45,
    confidence: 0.45, 
    imageQuality: 'BLURRY',
    evidenceStatus: 'MISSING',
    status: 'REJECTED', 
    processingTimeMs: 1200 
  },
  { 
    id: 'VL-20260619-006', 
    timestamp: '2026-06-19T09:15:44Z', 
    location: 'MG Road Junction', 
    types: ['Red-Light Violation'], 
    vehicleType: 'Motorcycle', 
    plate: 'TS 07 IJ 7890', 
    ocrStatus: 'SUCCESS',
    ocrConfidence: 96,
    confidence: 0.95, 
    imageQuality: 'CLEAR',
    evidenceStatus: 'GENERATED',
    status: 'APPROVED', 
    processingTimeMs: 780 
  },
  { 
    id: 'VL-20260619-007', 
    timestamp: '2026-06-19T09:30:10Z', 
    location: 'Airport Road', 
    types: ['Stop-Line Violation'], 
    vehicleType: 'Bus', 
    plate: 'MH 04 KL 1122', 
    ocrStatus: 'SUCCESS',
    ocrConfidence: 82,
    confidence: 0.88, 
    imageQuality: 'RAIN_NOISE',
    evidenceStatus: 'GENERATED',
    status: 'PENDING_REVIEW', 
    processingTimeMs: 1050 
  },
  { 
    id: 'VL-20260619-008', 
    timestamp: '2026-06-19T09:42:55Z', 
    location: 'Tech Park Exit', 
    types: ['Helmet Non-Compliance'], 
    vehicleType: 'Motorcycle', 
    plate: 'UNKNOWN', 
    ocrStatus: 'FAILED',
    ocrConfidence: 0,
    confidence: 0.71, 
    imageQuality: 'POOR_VISIBILITY',
    evidenceStatus: 'NEEDS_REVIEW',
    status: 'NEEDS_MANUAL_REVIEW', 
    processingTimeMs: 1300 
  },
];

export default function ViolationRecordsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    status: 'ALL',
    type: 'ALL',
    location: 'ALL',
    vehicle: 'ALL',
    dateRange: 'TODAY',
    confidence: 'ALL',
    ocrStatus: 'ALL',
    evidenceStatus: 'ALL',
    imageQuality: 'ALL',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusBadge = (status: ReviewStatus) => {
    const config = {
      APPROVED: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
      REJECTED: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', icon: XCircle },
      PENDING_REVIEW: { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: Clock },
      NEEDS_MANUAL_REVIEW: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: AlertCircle },
    };
    const style = config[status];
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.color}`}>
        <Icon className="w-3 h-3" />
        {status.replace(/_/g, ' ')}
      </span>
    );
  };

  const getOCRBadge = (status: OCRStatus, confidence: number) => {
    const config = {
      SUCCESS: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: `${confidence}%` },
      LOW_CONFIDENCE: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: `${confidence}%` },
      FAILED: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', label: 'Failed' },
    };
    const style = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}>
        <Scan className="w-3 h-3" />
        {style.label}
      </span>
    );
  };

  const getImageQualityBadge = (quality: ImageQuality) => {
    const config = {
      CLEAR: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Clear' },
      LOW_LIGHT: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Low Light' },
      BLURRY: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', label: 'Blurry' },
      RAIN_NOISE: { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Rain/Noise' },
      SHADOW: { color: 'text-violet-400 bg-violet-500/10 border-violet-500/20', label: 'Shadow' },
      POOR_VISIBILITY: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', label: 'Poor Visibility' },
    };
    const style = config[quality];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}>
        <Image className="w-3 h-3" />
        {style.label}
      </span>
    );
  };

  const getEvidenceBadge = (status: EvidenceStatus) => {
    const config = {
      GENERATED: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Generated', icon: FileCheck },
      MISSING: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', label: 'Missing', icon: XCircle },
      NEEDS_REVIEW: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Needs Review', icon: AlertCircle },
    };
    const style = config[status];
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}>
        <Icon className="w-3 h-3" />
        {style.label}
      </span>
    );
  };

  const violationTypes = [
    'All Violations',
    'Helmet Non-Compliance',
    'Seatbelt Non-Compliance',
    'Triple Riding',
    'Wrong-Side Driving',
    'Stop-Line Violation',
    'Red-Light Violation',
    'Illegal Parking'
  ];

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

        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 relative z-10">

          {/* --- HEADER --- */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                Violation Records Explorer
              </h1>
              <p className="text-slate-400 mt-2 max-w-3xl text-base">
                Search, filter, and inspect AI-generated traffic violation evidence with OCR, confidence scores, image quality signals, timestamps, and review status.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border ${
                  showFilters ? 'bg-blue-600/10 text-blue-400 border-blue-500/30' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </header>

          {/* --- ADVANCED FILTER PANEL --- */}
          {showFilters && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Search Bar */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search by License Plate or Violation ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-200 transition-colors"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEEDS_MANUAL_REVIEW">Needs Manual Review</option>
                    <option value="PENDING_REVIEW">Pending Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Date Range</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="TODAY">Today</option>
                      <option value="LAST_7_DAYS">Last 7 Days</option>
                      <option value="LAST_30_DAYS">Last 30 Days</option>
                      <option value="CUSTOM">Custom Range...</option>
                    </select>
                  </div>
                </div>

                {/* Violation Type - UPDATED with all 7 */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Violation Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    {violationTypes.map((type) => (
                      <option key={type} value={type === 'All Violations' ? 'ALL' : type.toUpperCase().replace(/ /g, '_')}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All Locations</option>
                    <option value="MG_ROAD">MG Road Junction</option>
                    <option value="TECH_PARK">Tech Park Exit</option>
                    <option value="CENTRAL">Central Station</option>
                    <option value="AIRPORT">Airport Road</option>
                    <option value="MARKET">Market Square</option>
                    <option value="HIGHWAY">North Highway</option>
                  </select>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><Car className="w-3 h-3"/> Vehicle Type</label>
                  <select
                    value={filters.vehicle}
                    onChange={(e) => handleFilterChange('vehicle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All Vehicles</option>
                    <option value="CAR">Car</option>
                    <option value="MOTORCYCLE">Motorcycle</option>
                    <option value="TRUCK">Truck / Heavy</option>
                    <option value="BUS">Bus</option>
                    <option value="AUTO">Auto</option>
                  </select>
                </div>

                {/* Confidence Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Confidence</label>
                  <select
                    value={filters.confidence}
                    onChange={(e) => handleFilterChange('confidence', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">Any Confidence</option>
                    <option value="HIGH">High ({'>'}90%)</option>
                    <option value="MEDIUM">Medium (70-90%)</option>
                    <option value="LOW">Low ({'<'}70%)</option>
                  </select>
                </div>

                {/* OCR Status - NEW */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><Scan className="w-3 h-3"/> OCR Status</label>
                  <select
                    value={filters.ocrStatus}
                    onChange={(e) => handleFilterChange('ocrStatus', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All</option>
                    <option value="SUCCESS">Success</option>
                    <option value="LOW_CONFIDENCE">Low Confidence</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>

                {/* Evidence Status - NEW */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><FileCheck className="w-3 h-3"/> Evidence Status</label>
                  <select
                    value={filters.evidenceStatus}
                    onChange={(e) => handleFilterChange('evidenceStatus', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All</option>
                    <option value="GENERATED">Generated</option>
                    <option value="NEEDS_REVIEW">Needs Review</option>
                    <option value="MISSING">Missing</option>
                  </select>
                </div>

                {/* Image Quality - NEW */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1"><Image className="w-3 h-3"/> Image Quality</label>
                  <select
                    value={filters.imageQuality}
                    onChange={(e) => handleFilterChange('imageQuality', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="ALL">All</option>
                    <option value="CLEAR">Clear</option>
                    <option value="LOW_LIGHT">Low Light</option>
                    <option value="BLURRY">Blurry</option>
                    <option value="RAIN_NOISE">Rain/Noise</option>
                    <option value="SHADOW">Shadow</option>
                    <option value="POOR_VISIBILITY">Poor Visibility</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* --- DATA TABLE --- */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800">
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Record ID</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Timestamp / Loc</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Violation(s)</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Vehicle / Plate</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Conf.</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Image Quality</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {MOCK_RECORDS.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-4 py-3">
                        <span className="font-mono text-slate-300 font-medium text-xs">{record.id}</span>
                        <div className="text-[10px] text-slate-500 mt-0.5">{record.processingTimeMs}ms</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-200 text-sm">{new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> {record.location}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {record.types.map((t, i) => (
                            <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-300 text-xs mb-1">{record.vehicleType}</div>
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-xs px-2 py-0.5 rounded border ${
                            record.plate === 'UNKNOWN' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-950 text-white border-slate-700'
                          }`}>
                            {record.plate}
                          </span>
                          {getOCRBadge(record.ocrStatus, record.ocrConfidence)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${record.confidence > 0.9 ? 'bg-emerald-500' : record.confidence > 0.7 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${record.confidence * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${record.confidence > 0.9 ? 'text-emerald-400' : record.confidence > 0.7 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {(record.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {getImageQualityBadge(record.imageQuality)}
                      </td>
                      <td className="px-4 py-3">
                        {getEvidenceBadge(record.evidenceStatus)}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/evidence-report`}
                            className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors"
                            title="View Evidence Report"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/human-review?violation_id=${record.id}`}
                            className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded transition-colors"
                            title="Review Case"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </Link>
                          <button className="p-1.5 hover:bg-slate-700 text-slate-400 rounded transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- PAGINATION --- */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between text-sm">
              <span className="text-slate-400">Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">8</span> of <span className="font-medium text-white">12,485</span> entries</span>
              <div className="flex gap-1">
                <button className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 border border-blue-500 text-white rounded-lg">1</button>
                <button className="px-3 py-1 border border-slate-800 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">2</button>
                <button className="px-3 py-1 border border-slate-800 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">3</button>
                <span className="px-2 text-slate-600">...</span>
                <button className="px-3 py-1 border border-slate-800 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">1560</button>
                <button className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
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