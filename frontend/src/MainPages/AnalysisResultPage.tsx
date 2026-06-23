"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, AlertTriangle, ShieldAlert, Image as ImageIcon, 
  Car, Eye, Cpu, FileText, ChevronRight, Download, 
  MapPin, Clock, Search, Zap, CheckCircle2, AlertCircle, XCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';

// --- MOCK DATA TYPES ---
interface DetectedObject {
  label: string;
  confidence: number;
  bbox: number[];
}

interface ViolationItem {
  violation_type: string;
  confidence: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  review_status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'NEEDS_MANUAL_REVIEW';
}

interface AnalysisResult {
  violation_id: string;
  original_image_url: string;
  processed_image_url: string;
  annotated_image_url: string;
  image_quality: {
    brightness_score: number;
    blur_score: number;
    quality_label: string;
    preprocessing_applied: string[];
  };
  detected_objects: DetectedObject[];
  violations: ViolationItem[];
  license_plate: {
    plate_text: string | null;
    confidence: number;
    status: string;
  };
  processing_time_ms: number;
  timestamp: string;
  location: string;
}

// --- MOCK API RESPONSE ---
const MOCK_RESULT: AnalysisResult = {
  violation_id: "VL-20260619-A1B2C3",
  original_image_url: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=800", // Placeholder
  processed_image_url: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=800&sat=1.2&con=1.2", // Simulated enhancement
  annotated_image_url: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=800&sat=1.2&con=1.2", // Simulated annotation base
  image_quality: {
    brightness_score: 0.35,
    blur_score: 142.5,
    quality_label: "LOW_LIGHT_ACCEPTABLE",
    preprocessing_applied: ["CLAHE", "DENOISE"]
  },
  detected_objects: [
    { label: "motorcycle", confidence: 0.94, bbox: [120, 210, 420, 520] },
    { label: "person", confidence: 0.91, bbox: [140, 80, 230, 360] },
    { label: "person", confidence: 0.88, bbox: [180, 70, 260, 350] },
    { label: "person", confidence: 0.85, bbox: [220, 60, 300, 340] },
    { label: "car", confidence: 0.98, bbox: [500, 150, 750, 300] }
  ],
  violations: [
    {
      violation_type: "TRIPLE_RIDING",
      confidence: 0.88,
      severity: "CRITICAL",
      reason: "Three person bounding boxes detected overlapping a single motorcycle region.",
      review_status: "PENDING_REVIEW"
    },
    {
      violation_type: "STOP_LINE_VIOLATION",
      confidence: 0.72,
      severity: "HIGH",
      reason: "Vehicle base crossed virtual stop line coordinates while signal marked RED.",
      review_status: "NEEDS_MANUAL_REVIEW"
    }
  ],
  license_plate: {
    plate_text: "MH 12 AB 1234",
    confidence: 0.82,
    status: "EXTRACTED"
  },
  processing_time_ms: 1245,
  timestamp: new Date().toISOString(),
  location: "MG Road Junction Cam-04"
};


// --- UI HELPER COMPONENTS ---
const SeverityBadge = ({ severity }: { severity: string }) => {
  const colors = {
    CRITICAL: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    LOW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${colors[severity as keyof typeof colors] || colors.MEDIUM}`}>
      {severity}
    </span>
  );
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'APPROVED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'REJECTED': return <XCircle className="w-4 h-4 text-rose-500" />;
    case 'NEEDS_MANUAL_REVIEW': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    default: return <Clock className="w-4 h-4 text-blue-500" />;
  }
};

export default function AnalysisResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'ANNOTATED' | 'PROCESSED' | 'ORIGINAL'>('ANNOTATED');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setResult(MOCK_RESULT);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !result) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-400">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg animate-pulse">Loading Analysis Report...</p>
      </div>
    );
  }

  // Prepare chart data for detected objects
  const objectCounts = result.detected_objects.reduce((acc, obj) => {
    acc[obj.label] = (acc[obj.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(objectCounts).map(([name, count]) => ({ name, count }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- PAGE HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">Analysis Result</h1>
              <span className="font-mono text-sm bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                {result.violation_id}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {result.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(result.timestamp).toLocaleString()}</span>
              <span className="flex items-center gap-1 text-emerald-400"><Zap className="w-3.5 h-3.5" /> {result.processing_time_ms}ms</span>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              Submit to Review Queue
            </button>
          </div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: EVIDENCE VIEWER */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950 p-2 gap-2">
                {(['ANNOTATED', 'PROCESSED', 'ORIGINAL'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                      activeTab === tab 
                      ? 'bg-slate-800 text-white border border-slate-700' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {tab === 'ANNOTATED' && <ShieldAlert className="w-4 h-4" />}
                    {tab === 'PROCESSED' && <Eye className="w-4 h-4" />}
                    {tab === 'ORIGINAL' && <ImageIcon className="w-4 h-4" />}
                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Image View */}
              <div className="relative bg-slate-950 min-h-[450px] flex items-center justify-center p-4">
                <img 
                  src={
                    activeTab === 'ANNOTATED' ? result.annotated_image_url : 
                    activeTab === 'PROCESSED' ? result.processed_image_url : 
                    result.original_image_url
                  } 
                  alt={`${activeTab} Evidence`}
                  className="max-w-full max-h-[500px] object-contain rounded border border-slate-800"
                />
                
                {/* Simulated Annotations for ANNOTATED tab (if using placeholder image) */}
                {activeTab === 'ANNOTATED' && (
                  <>
                     <div className="absolute top-1/2 left-1/3 w-32 h-40 border-2 border-rose-500 bg-rose-500/10 rounded pointer-events-none">
                       <div className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] px-1 font-mono">TRIPLE_RIDING (0.88)</div>
                     </div>
                     <div className="absolute top-[60%] right-1/4 w-48 h-24 border-2 border-emerald-500 bg-emerald-500/10 rounded pointer-events-none">
                       <div className="absolute -top-6 left-0 bg-emerald-500 text-white text-[10px] px-1 font-mono">CAR (0.98)</div>
                     </div>
                     <div className="absolute top-[75%] left-0 w-full h-0.5 bg-rose-500/80 pointer-events-none">
                       <div className="absolute top-1 right-10 text-rose-500 font-mono text-[10px] bg-slate-950/50 px-1">VIRTUAL STOP LINE</div>
                     </div>
                  </>
                )}
              </div>

              {/* Quality & Preprocessing Bar */}
              <div className="bg-slate-950 p-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-800/50 text-center">
                <div className="px-2">
                  <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Quality Label</p>
                  <p className={`text-xs font-bold ${result.image_quality.quality_label.includes('LOW') ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {result.image_quality.quality_label.replace(/_/g, ' ')}
                  </p>
                </div>
                <div className="px-2">
                  <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Blur Score (Var.)</p>
                  <p className="text-xs text-white font-mono">{result.image_quality.blur_score}</p>
                </div>
                <div className="px-2">
                  <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Brightness</p>
                  <p className="text-xs text-white font-mono">{result.image_quality.brightness_score}</p>
                </div>
                <div className="px-2">
                  <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Filters Applied</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {result.image_quality.preprocessing_applied.length > 0 ? 
                      result.image_quality.preprocessing_applied.map(f => (
                        <span key={f} className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">{f}</span>
                      )) : <span className="text-[10px] text-slate-500">NONE</span>
                    }
                  </div>
                </div>
              </div>
            </div>

             {/* Detected Objects Overview */}
             <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-violet-400" /> YOLO11 Detections Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px', fontSize: '12px' }}/>
                      <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === 'person' ? '#8b5cf6' : entry.name === 'motorcycle' ? '#f59e0b' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                 </div>
                 <div className="flex flex-col justify-center gap-2 text-sm">
                   <div className="flex justify-between items-center p-2 bg-slate-950 border border-slate-800 rounded">
                     <span className="text-slate-400">Total Objects</span>
                     <span className="font-mono text-white">{result.detected_objects.length}</span>
                   </div>
                   <div className="flex justify-between items-center p-2 bg-slate-950 border border-slate-800 rounded">
                     <span className="text-slate-400">Avg Confidence</span>
                     <span className="font-mono text-emerald-400">
                       {(result.detected_objects.reduce((a,b) => a+b.confidence, 0) / result.detected_objects.length * 100).toFixed(1)}%
                     </span>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VIOLATIONS & METADATA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* OCR Panel */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5">
              <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-4 flex items-center gap-2">
                <Search className="w-3 h-3" /> License Plate Extraction
              </h3>
              {result.license_plate.plate_text ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="bg-yellow-500 border-2 border-yellow-600 rounded-md px-4 py-2 shadow-inner">
                    <span className="font-mono text-xl font-bold text-slate-900 tracking-widest">{result.license_plate.plate_text}</span>
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">OCR Confidence</span>
                      <span className={`font-mono ${result.license_plate.confidence > 0.8 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {(result.license_plate.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${result.license_plate.confidence * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Extracted via PaddleOCR pipeline.</p>
                  </div>
                </div>
              ) : (
                 <div className="bg-slate-950 border border-slate-800 p-4 rounded text-center text-slate-500 text-sm">
                   Plate unreadable or not present in scene.
                 </div>
              )}
            </div>

            {/* Violations List */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                Detected Violations
                <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{result.violations.length}</span>
              </h3>
              
              {result.violations.length === 0 ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center flex flex-col items-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mb-3" />
                  <p className="text-emerald-400 font-medium">No Violations Detected</p>
                  <p className="text-sm text-slate-400 mt-1">The AI rule engine found no infractions in this frame.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.violations.map((violation, idx) => (
                    <div key={idx} className={`bg-slate-900/80 border rounded-xl p-5 relative overflow-hidden ${
                      violation.review_status === 'NEEDS_MANUAL_REVIEW' ? 'border-amber-500/50' : 'border-rose-500/30'
                    }`}>
                      {/* Status indicator bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        violation.review_status === 'NEEDS_MANUAL_REVIEW' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      
                      <div className="pl-2">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-white text-base">
                                {violation.violation_type.replace(/_/g, ' ')}
                              </h4>
                              <SeverityBadge severity={violation.severity} />
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-400">Confidence:</span>
                              <span className={`font-mono font-medium ${violation.confidence > 0.85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {(violation.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 rounded p-3 mb-4">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <span className="text-slate-500 font-semibold block mb-1">Rule Engine Reason:</span>
                            {violation.reason}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/50 pt-3">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <StatusIcon status={violation.review_status} />
                            <span className={
                              violation.review_status === 'NEEDS_MANUAL_REVIEW' ? 'text-amber-400' :
                              violation.review_status === 'APPROVED' ? 'text-emerald-400' :
                              'text-blue-400'
                            }>
                              {violation.review_status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          
                          {/* Quick Action buttons for review console integration */}
                           <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded transition-colors" title="Approve">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition-colors" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Edge Case Disclaimer if needed */}
            {result.violations.some(v => v.review_status === 'NEEDS_MANUAL_REVIEW') && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-400/90 leading-relaxed">
                  <strong className="block text-amber-400 mb-1">Low Confidence / Missing Context</strong>
                  One or more violations require manual review due to low AI confidence or unknown scene parameters (e.g., missing signal status).
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}