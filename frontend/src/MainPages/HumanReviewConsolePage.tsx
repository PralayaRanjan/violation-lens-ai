"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  FileSearch,
  Gauge,
  MapPin,
  MessageSquareText,
  Search,
  ShieldAlert,
  ThumbsDown,
  UserCheck,
  XCircle,
  Menu,
  Home,
  Brain,
  Users,
  BarChart3,
  TrendingUp,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  LogOut,
  AlertOctagon,
  Layers,
  Scan,
  Image,
  FileCheck,
  History
} from "lucide-react";

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("review");

  const navItems = [
    { id: "dashboard", label: "Command Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "analyze", label: "AI Analysis Studio", icon: Brain, href: "/analyze" },
    { id: "violations", label: "Violation Records", icon: FileCheck, href: "/violation_record" },
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
          isCollapsed ? 'w-[72px]' : 'w-[260px]'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col`}
      >
        <div className={`p-4 border-b border-slate-800 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">
                  Violation<span className="text-blue-400">Lens</span>
                </h1>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Command Center</p>
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

type DecisionStatus = "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_MORE_EVIDENCE";
type ImageQuality = "CLEAR" | "LOW_LIGHT" | "MOTION_BLUR" | "RAIN_NOISE" | "SHADOW" | "POOR_VISIBILITY";
type OCRStatus = "SUCCESS" | "LOW_CONFIDENCE" | "FAILED";

type ReviewCase = {
  id: string;
  violationType: string;
  location: string;
  time: string;
  capturedAt: string;
  plate: string;
  confidence: number;
  ocrConfidence: number;
  ocrStatus: OCRStatus;
  imageQuality: ImageQuality;
  priority: "High" | "Medium" | "Low";
  status: DecisionStatus;
  reason: string;
  aiFindings: string[];
  image: string;
  evidenceCompleteness: number;
  reviewHistory: { time: string; action: string }[];
};

const INITIAL_CASES: ReviewCase[] = [
  {
    id: "VL-89A1",
    violationType: "Triple Riding",
    location: "Tech Park Exit, Bengaluru",
    time: "10 mins ago",
    capturedAt: "19 Jun 2026, 10:42 AM",
    plate: "KA 01 CD 5678",
    confidence: 91,
    ocrConfidence: 82,
    ocrStatus: "SUCCESS",
    imageQuality: "CLEAR",
    priority: "High",
    status: "PENDING",
    reason:
      "Three overlapping person regions were detected inside the motorcycle area. The license plate is readable and the vehicle boundary is clear.",
    aiFindings: [
      "Motorcycle detected with high confidence.",
      "Three rider regions found inside the same vehicle area.",
      "License plate OCR matched valid registration format.",
      "Violation rule triggered for rider count greater than allowed limit.",
    ],
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 92,
    reviewHistory: [
      { time: "10:42 AM", action: "AI case generated" },
      { time: "10:43 AM", action: "Routed to human review" },
      { time: "10:46 AM", action: "Officer opened evidence" },
      { time: "10:48 AM", action: "Decision pending" },
    ],
  },
  {
    id: "VL-89B2",
    violationType: "Red-Light Violation",
    location: "MG Road Junction, Pune",
    time: "15 mins ago",
    capturedAt: "19 Jun 2026, 10:35 AM",
    plate: "MH 12 AB 1234",
    confidence: 72,
    ocrConfidence: 88,
    ocrStatus: "SUCCESS",
    imageQuality: "LOW_LIGHT",
    priority: "Medium",
    status: "PENDING",
    reason:
      "Vehicle crossed the virtual stop line while the signal was classified as red. Confidence is moderate because of low-light conditions.",
    aiFindings: [
      "Vehicle detected near the signal stop line.",
      "Signal color was classified as red.",
      "Vehicle base crossed the virtual stop-line boundary.",
      "Moderate confidence due to low-light image quality.",
    ],
    image:
      "https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 85,
    reviewHistory: [
      { time: "10:35 AM", action: "AI case generated" },
      { time: "10:36 AM", action: "Routed to human review" },
      { time: "10:40 AM", action: "Officer opened evidence" },
    ],
  },
  {
    id: "VL-89C3",
    violationType: "Helmet Non-Compliance",
    location: "Central Station Road, Delhi",
    time: "22 mins ago",
    capturedAt: "19 Jun 2026, 10:26 AM",
    plate: "UNKNOWN",
    confidence: 86,
    ocrConfidence: 0,
    ocrStatus: "FAILED",
    imageQuality: "SHADOW",
    priority: "High",
    status: "PENDING",
    reason:
      "Two-wheeler rider was detected without a helmet. Plate OCR is not reliable because the plate region is partially obstructed.",
    aiFindings: [
      "Two-wheeler detected.",
      "Rider head region detected.",
      "Helmet classifier returned non-compliant result.",
      "Plate OCR requires manual confirmation.",
    ],
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 78,
    reviewHistory: [
      { time: "10:26 AM", action: "AI case generated" },
      { time: "10:27 AM", action: "Routed to human review" },
      { time: "10:31 AM", action: "Officer opened evidence" },
    ],
  },
  {
    id: "VL-89D4",
    violationType: "Illegal Parking",
    location: "Market Square, Mumbai",
    time: "30 mins ago",
    capturedAt: "19 Jun 2026, 10:15 AM",
    plate: "MH 04 XY 7890",
    confidence: 84,
    ocrConfidence: 75,
    ocrStatus: "LOW_CONFIDENCE",
    imageQuality: "RAIN_NOISE",
    priority: "Medium",
    status: "PENDING",
    reason:
      "Vehicle detected in restricted no-parking zone. Image quality affected by rain noise, reducing confidence.",
    aiFindings: [
      "Vehicle detected in no-parking zone.",
      "No-parking violation rule triggered.",
      "OCR confidence reduced due to rain on plate.",
    ],
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 80,
    reviewHistory: [
      { time: "10:15 AM", action: "AI case generated" },
      { time: "10:16 AM", action: "Routed to human review" },
    ],
  },
  {
    id: "VL-89E5",
    violationType: "Seatbelt Non-Compliance",
    location: "Airport Road, Hyderabad",
    time: "45 mins ago",
    capturedAt: "19 Jun 2026, 10:00 AM",
    plate: "TS 07 KL 3456",
    confidence: 78,
    ocrConfidence: 92,
    ocrStatus: "SUCCESS",
    imageQuality: "CLEAR",
    priority: "Low",
    status: "PENDING",
    reason:
      "Driver region detected without seatbelt. Clear visibility, high OCR confidence.",
    aiFindings: [
      "Driver region detected.",
      "Seatbelt classifier returned non-compliant.",
      "License plate clearly readable.",
    ],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 95,
    reviewHistory: [
      { time: "10:00 AM", action: "AI case generated" },
      { time: "10:01 AM", action: "Routed to human review" },
    ],
  },
  {
    id: "VL-89F6",
    violationType: "Stop-Line Violation",
    location: "North Highway, Chennai",
    time: "55 mins ago",
    capturedAt: "19 Jun 2026, 09:50 AM",
    plate: "TN 09 MN 5678",
    confidence: 90,
    ocrConfidence: 86,
    ocrStatus: "SUCCESS",
    imageQuality: "CLEAR",
    priority: "High",
    status: "PENDING",
    reason:
      "Vehicle crossed the stop line marker clearly. High confidence detection.",
    aiFindings: [
      "Vehicle detected at stop line.",
      "Stop line boundary crossed.",
      "Violation rule triggered for stop-line crossing.",
    ],
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 93,
    reviewHistory: [
      { time: "09:50 AM", action: "AI case generated" },
      { time: "09:51 AM", action: "Routed to human review" },
    ],
  },
  {
    id: "VL-89G7",
    violationType: "Wrong-Side Driving",
    location: "Central Road, Bangalore",
    time: "1 hour ago",
    capturedAt: "19 Jun 2026, 09:30 AM",
    plate: "KA 05 OP 7890",
    confidence: 82,
    ocrConfidence: 78,
    ocrStatus: "LOW_CONFIDENCE",
    imageQuality: "MOTION_BLUR",
    priority: "High",
    status: "PENDING",
    reason:
      "Vehicle detected moving against configured road direction. Motion blur reduces confidence.",
    aiFindings: [
      "Vehicle detected with movement pattern.",
      "Road direction rule triggered.",
      "Motion blur affects plate clarity.",
    ],
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1400",
    evidenceCompleteness: 76,
    reviewHistory: [
      { time: "09:30 AM", action: "AI case generated" },
      { time: "09:31 AM", action: "Routed to human review" },
    ],
  },
];

function getPriorityClass(priority: ReviewCase["priority"]) {
  if (priority === "High") {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }
  if (priority === "Medium") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }
  return "border-slate-600 bg-slate-800 text-slate-300";
}

function getConfidenceClass(confidence: number) {
  if (confidence >= 90) return "text-emerald-400";
  if (confidence >= 80) return "text-blue-400";
  if (confidence >= 70) return "text-amber-400";
  return "text-red-400";
}

function getConfidenceBarClass(confidence: number) {
  if (confidence >= 90) return "bg-emerald-500";
  if (confidence >= 80) return "bg-blue-500";
  if (confidence >= 70) return "bg-amber-500";
  return "bg-red-500";
}

function getImageQualityBadge(quality: ImageQuality) {
  const config = {
    CLEAR: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: "Clear" },
    LOW_LIGHT: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", label: "Low Light" },
    MOTION_BLUR: { color: "text-rose-400 bg-rose-500/10 border-rose-500/20", label: "Motion Blur" },
    RAIN_NOISE: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", label: "Rain/Noise" },
    SHADOW: { color: "text-violet-400 bg-violet-500/10 border-violet-500/20", label: "Shadow" },
    POOR_VISIBILITY: { color: "text-rose-400 bg-rose-500/10 border-rose-500/20", label: "Poor Visibility" },
  };
  const style = config[quality];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}>
      <Image className="w-3 h-3" />
      {style.label}
    </span>
  );
}

function getOCRBadge(status: OCRStatus, confidence: number) {
  const config = {
    SUCCESS: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: `${confidence}%` },
    LOW_CONFIDENCE: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", label: `${confidence}%` },
    FAILED: { color: "text-rose-400 bg-rose-500/10 border-rose-500/20", label: "Failed" },
  };
  const style = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${style.color}`}>
      <Scan className="w-3 h-3" />
      {style.label}
    </span>
  );
}

export default function ReviewConsolePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cases, setCases] = useState<ReviewCase[]>(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState(INITIAL_CASES[0].id);
  const [search, setSearch] = useState("");
  const [remarks, setRemarks] = useState("");
  const [viewMode, setViewMode] = useState<"ANNOTATED" | "ORIGINAL" | "PROCESSED" | "PLATE_CROP">("ANNOTATED");

  const pendingCases = useMemo(() => {
    return cases.filter((item) => item.status === "PENDING");
  }, [cases]);

  const filteredCases = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return pendingCases;
    return pendingCases.filter((item) => {
      return (
        item.id.toLowerCase().includes(keyword) ||
        item.violationType.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword) ||
        item.plate.toLowerCase().includes(keyword)
      );
    });
  }, [pendingCases, search]);

  const selectedCase =
    pendingCases.find((item) => item.id === selectedCaseId) || filteredCases[0];

  const reviewedCount = cases.filter((item) => item.status !== "PENDING").length;

  const handleDecision = (decision: Exclude<DecisionStatus, "PENDING">) => {
    if (!selectedCase) return;

    const updatedCases = cases.map((item) =>
      item.id === selectedCase.id
        ? {
            ...item,
            status: decision,
            reviewHistory: [
              ...item.reviewHistory,
              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: `Case ${decision.toLowerCase().replace('_', ' ')}` }
            ]
          }
        : item
    );

    setCases(updatedCases);
    setRemarks("");

    const nextCase = updatedCases.find(
      (item) => item.status === "PENDING" && item.id !== selectedCase.id
    );

    setSelectedCaseId(nextCase?.id || "");
  };

  const evidenceItems = [
    { label: "Annotated Image", available: true },
    { label: "Plate OCR", available: selectedCase?.ocrStatus !== "FAILED" },
    { label: "Timestamp", available: true },
    { label: "Location", available: true },
    { label: "AI Reasoning", available: true },
    { label: "Confidence Score", available: true },
    { label: "Reviewer Remarks", available: remarks.length > 0 },
  ];

  const viewTabs = [
    { id: "ORIGINAL", label: "Original", icon: Eye },
    { id: "PROCESSED", label: "Processed", icon: Image },
    { id: "ANNOTATED", label: "AI Annotated", icon: ShieldAlert },
    { id: "PLATE_CROP", label: "Plate Crop", icon: Scan },
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
      <main className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
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

        {pendingCases.length === 0 ? (
          <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
            <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Queue Cleared</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                All pending AI-detected cases have been reviewed. New flagged
                evidence will appear here automatically.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Back to Dashboard
              </Link>
            </div>
          </section>
        ) : (
          <div className="p-6">
            {/* HEADER ROW */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">Human Review Console</h1>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400">
                  {pendingCases.length} Pending
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search cases..."
                    className="h-10 w-64 rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">Reviewed:</span>
                  <span className="font-bold text-emerald-400">{reviewedCount}</span>
                </div>
              </div>
            </div>

            {/* HORIZONTAL QUEUE - Large visible cards */}
            <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
              {filteredCases.map((item) => {
                const isActive = selectedCase?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCaseId(item.id)}
                    className={`shrink-0 rounded-xl border p-4 text-left transition-all min-w-[220px] ${
                      isActive
                        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-slate-500">{item.id}</span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getPriorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="font-bold text-white text-base mb-1">{item.violationType}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Camera className="h-3 w-3" />
                      <span className="font-mono text-slate-300">{item.plate}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-sm font-bold ${getConfidenceClass(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getConfidenceBarClass(item.confidence)}`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
              {filteredCases.length === 0 && (
                <div className="text-sm text-slate-400 py-4">No matching cases</div>
              )}
            </div>

            {/* MAIN CONTENT - Selected Case */}
            {selectedCase && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* LEFT + MIDDLE: Case Details (2 columns) */}
                <div className="xl:col-span-2 space-y-5">
                  {/* Case Header */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 font-mono text-sm text-slate-400">
                          {selectedCase.id}
                        </span>
                        <h2 className="text-2xl font-bold text-white">
                          {selectedCase.violationType}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getImageQualityBadge(selectedCase.imageQuality)}
                        {getOCRBadge(selectedCase.ocrStatus, selectedCase.ocrConfidence)}
                        <span
                          className={`rounded-lg border px-3 py-1 text-sm font-semibold ${getPriorityClass(
                            selectedCase.priority
                          )}`}
                        >
                          {selectedCase.priority} Priority
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        {selectedCase.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-500" />
                        {selectedCase.capturedAt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Camera className="h-4 w-4 text-slate-500" />
                        Plate: <span className={`font-mono font-bold ${selectedCase.plate === "UNKNOWN" ? "text-red-400" : "text-amber-300"}`}>{selectedCase.plate}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Gauge className="h-4 w-4 text-slate-500" />
                        AI: <span className={`font-bold ${getConfidenceClass(selectedCase.confidence)}`}>{selectedCase.confidence}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Evidence Preview */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-white">Evidence Preview</h3>
                      <div className="flex rounded-lg border border-slate-700 bg-slate-950 p-1">
                        {viewTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setViewMode(tab.id as any)}
                            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${
                              viewMode === tab.id
                                ? "bg-blue-600 text-white"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-700 bg-black">
                      <img
                        src={selectedCase.image}
                        alt="Traffic evidence"
                        className="h-full w-full object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                      {viewMode === "ANNOTATED" && (
                        <>
                          <div className="absolute left-[26%] top-[32%] h-[36%] w-[42%] rounded-lg border-2 border-blue-400 bg-blue-500/10 shadow-[0_0_25px_rgba(96,165,250,0.4)]">
                            <span className="absolute -top-7 left-0 rounded-md bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                              Vehicle
                            </span>
                          </div>
                          <div className="absolute left-[38%] top-[25%] h-[20%] w-[9%] rounded-md border-2 border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.35)]">
                            <span className="absolute -top-7 left-0 rounded-md bg-amber-400 px-2 py-1 text-xs font-bold text-slate-950">
                              Rider
                            </span>
                          </div>
                          <div className="absolute left-[49%] top-[25%] h-[20%] w-[9%] rounded-md border-2 border-amber-400 bg-amber-500/10" />
                          <div className="absolute left-[59%] top-[25%] h-[20%] w-[9%] rounded-md border-2 border-amber-400 bg-amber-500/10" />
                          <div className="absolute left-[42%] top-[67%] h-[8%] w-[22%] rounded-md border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.35)]">
                            <span className="absolute top-8 left-0 rounded-md bg-emerald-400 px-2 py-1 text-xs font-bold text-slate-950">
                              Plate
                            </span>
                          </div>
                          <div className="absolute right-[12%] top-[28%] rounded-lg border-2 border-rose-400 bg-rose-500/10 px-3 py-1 text-sm font-bold text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
                            ⚠️ {selectedCase.violationType}
                          </div>
                        </>
                      )}

                      {viewMode === "PLATE_CROP" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                          <div className="rounded-xl border-2 border-emerald-400 bg-slate-900 p-8 text-center shadow-[0_0_50px_rgba(52,211,153,0.25)]">
                            <Scan className="mx-auto h-16 w-16 text-emerald-400" />
                            <p className="mt-3 font-mono text-3xl font-bold text-white">
                              {selectedCase.plate === "UNKNOWN" ? "UNREADABLE" : selectedCase.plate}
                            </p>
                            <p className="mt-2 text-lg text-emerald-400">
                              OCR: {selectedCase.ocrConfidence}%
                            </p>
                            <p className="text-sm text-slate-500">
                              {selectedCase.ocrStatus}
                            </p>
                          </div>
                        </div>
                      )}

                      {viewMode === "PROCESSED" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <div className="text-center">
                            <Image className="mx-auto h-16 w-16 text-blue-400" />
                            <p className="mt-3 text-xl font-bold text-white">Enhanced Image</p>
                            <p className="text-sm text-slate-400">CLAHE, Denoising, Sharpening</p>
                            <p className="mt-2 text-sm text-emerald-400">✓ Quality improved</p>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-black/70 p-3 backdrop-blur">
                        <p className="text-xs text-slate-400">
                          AI supports, not replaces officer decision
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning & Review History */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                      <h3 className="text-lg font-bold text-white mb-3">AI Reasoning</h3>
                      <div className="rounded-xl border border-slate-700 bg-slate-950 p-3">
                        <p className="text-sm leading-6 text-slate-300">{selectedCase.reason}</p>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {selectedCase.aiFindings.map((finding, index) => (
                          <div key={finding} className="flex gap-2 rounded-lg border border-slate-800 bg-slate-900/30 p-2.5">
                            <span className="text-sm font-bold text-blue-400">{index + 1}.</span>
                            <span className="text-sm text-slate-300">{finding}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
                        <History className="h-5 w-5 text-blue-400" />
                        Review History
                      </h3>
                      <div className="space-y-1.5">
                        {selectedCase.reviewHistory.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/50 p-2.5">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-400">{entry.time}</span>
                            <span className="text-sm text-slate-500">—</span>
                            <span className="text-sm font-medium text-white">{entry.action}</span>
                            {index === 0 && (
                              <span className="ml-auto rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-400">
                                Latest
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Decision Panel */}
                <div className="xl:col-span-1 space-y-5">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10">
                        <UserCheck className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Reviewer Decision</h3>
                        <p className="text-sm text-slate-400">Human-controlled final approval</p>
                      </div>
                    </div>

                    {/* Evidence Completeness */}
                    <div className="mb-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">Evidence Completeness</span>
                        <span className="text-2xl font-bold text-emerald-400">{selectedCase.evidenceCompleteness}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                          style={{ width: `${selectedCase.evidenceCompleteness}%` }}
                        />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-1">
                        {evidenceItems.map((item) => (
                          <div key={item.label} className="flex items-center gap-1 text-xs">
                            {item.available ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-slate-600" />
                            )}
                            <span className={item.available ? "text-slate-300" : "text-slate-500"}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Confidence */}
                    <div className="mb-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">AI Confidence</span>
                        <Gauge className="h-4 w-4 text-slate-500" />
                      </div>
                      <p className={`text-3xl font-black ${getConfidenceClass(selectedCase.confidence)}`}>
                        {selectedCase.confidence}%
                      </p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${getConfidenceBarClass(selectedCase.confidence)}`}
                          style={{ width: `${selectedCase.confidence}%` }}
                        />
                      </div>
                    </div>

                    {/* Remarks */}
                    <div className="mb-4">
                      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-white">
                        <MessageSquareText className="h-4 w-4 text-amber-400" />
                        Officer Remarks
                      </label>
                      <textarea
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        rows={3}
                        placeholder="Enter officer remarks or clarification..."
                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm leading-5 text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Decision Buttons */}
                    <div className="space-y-2.5">
                      <button
                        onClick={() => handleDecision("APPROVED")}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-base font-bold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-500"
                      >
                        <BadgeCheck className="h-5 w-5" />
                        Approve Violation
                      </button>
                      <button
                        onClick={() => handleDecision("NEEDS_MORE_EVIDENCE")}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 text-base font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-400"
                      >
                        <AlertTriangle className="h-5 w-5" />
                        Needs More Evidence
                      </button>
                      <button
                        onClick={() => handleDecision("REJECTED")}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-base font-bold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
                      >
                        <ThumbsDown className="h-5 w-5" />
                        Reject Case
                      </button>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                    <h4 className="mb-1.5 flex items-center gap-2 text-sm font-bold text-red-300">
                      <XCircle className="h-5 w-5" />
                      Important
                    </h4>
                    <p className="text-sm leading-5 text-red-100/80">
                      Do not approve a violation if the plate, vehicle, rider, signal,
                      or stop-line evidence is not clearly visible.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
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