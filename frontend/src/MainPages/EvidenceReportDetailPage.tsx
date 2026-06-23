"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldAlert, Camera, MapPin, Clock, Download,
  CheckCircle2, AlertTriangle, Fingerprint, FileJson,
  History, Eye, Scale, Server, Cpu, Car, Hash,
  ChevronLeft, FileText, CheckCircle, Maximize, ZoomIn, Printer,
  Search, Scan, Image, Gauge, Award, Users, Calendar,
  AlertOctagon, Layers, FileCheck
} from 'lucide-react';

// --- MOCK DATA ---
const RECORD_DATA = {
  id: 'VL-20260619-001',
  timestamp: '2026-06-19T08:14:22Z',
  location: 'MG Road Junction',
  cameraId: 'CAM-MG-04-NORTH',
  status: 'APPROVED',
  processingTimeMs: 840,
  evidence: {
    original: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=1600',
    annotated: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=1600&sat=1.5&con=1.2',
    processed: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=1600&sat=0.8&con=1.5',
    plateCrop: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=400&h=200&sat=1.5&con=1.2',
  },
  violations: [
    { type: 'Red-Light Violation', confidence: 0.98, severity: 'CRITICAL', reason: 'Vehicle center crossed active virtual stop-line while signal state was confirmed RED.' },
    { type: 'Stop-Line Violation', confidence: 0.95, severity: 'HIGH', reason: 'Vehicle base coordinates exceeded permitted stop-line boundaries prior to signal change.' }
  ],
  plate: { text: 'MH 12 AB 1234', confidence: 0.96, state: 'Maharashtra' },
  objects: [
    { label: 'car', confidence: 0.98, bbox: '[450, 220, 850, 480]' },
    { label: 'traffic_light', confidence: 0.99, bbox: '[120, 50, 160, 180]' },
    { label: 'stop_line', confidence: 1.00, bbox: 'Virtual Polygon' },
  ],
  imageQuality: {
    brightnessScore: 0.42,
    blurScore: 118.5,
    visibilityCondition: 'LOW_LIGHT',
    qualityLabel: 'Acceptable',
    preprocessingApplied: 'CLAHE, Denoise, Sharpen'
  },
  integrity: {
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    signatureAlgo: 'SHA-256 / RSA-2048',
    sealedAt: '2026-06-19T08:14:23Z',
  },
  reviewHistory: [
    { action: 'Evidence Captured', actor: 'System (CAM-MG-04)', time: '08:14:22Z', icon: 'Camera' },
    { action: 'AI Inference Completed', actor: 'ViolationLens Core', time: '08:14:23Z', icon: 'Cpu' },
    { action: 'Routed to Human Review', actor: 'System', time: '08:15:00Z', icon: 'Users' },
    { action: 'Officer Approved', actor: 'Inspector R. Sharma', time: '08:25:11Z', icon: 'CheckCircle' },
    { action: 'Evidence Report Generated', actor: 'System', time: '08:25:15Z', icon: 'FileText' },
  ],
  reviewer: {
    name: 'Inspector R. Sharma',
    decision: 'APPROVED',
    remarks: 'Vehicle crossed stop line during red signal. Plate OCR verified. Clear violation.',
    timestamp: '2026-06-19T08:25:11Z',
    badgeId: 'INSP-0721'
  },
  supportedViolations: [
    'Helmet Non-Compliance', 'Seatbelt Non-Compliance', 'Triple Riding',
    'Wrong-Side Driving', 'Stop-Line Violation', 'Red-Light Violation', 'Illegal Parking'
  ]
};

export default function EvidenceReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const violationId = params?.id || RECORD_DATA.id;
  
  const [activeMediaTab, setActiveMediaTab] = useState<'ANNOTATED' | 'ORIGINAL' | 'PROCESSED' | 'PLATE_CROP'>('ANNOTATED');

  // Calculate Evidence Completeness
  const evidenceItems = [
    { label: 'Original Image', available: true },
    { label: 'Processed Image', available: true },
    { label: 'Annotated Image', available: true },
    { label: 'Plate OCR', available: RECORD_DATA.plate.text !== 'UNKNOWN' },
    { label: 'Timestamp', available: true },
    { label: 'Camera ID', available: true },
    { label: 'Location', available: true },
    { label: 'AI Reasoning', available: true },
    { label: 'Integrity Hash', available: true },
    { label: 'Reviewer Decision', available: RECORD_DATA.status !== 'PENDING' },
  ];
  const completenessScore = Math.round((evidenceItems.filter(item => item.available).length / evidenceItems.length) * 100);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'REJECTED': return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      case 'PENDING_REVIEW': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default: return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  const getHistoryIcon = (action: string) => {
    switch(action) {
      case 'Evidence Captured': return <Camera className="w-4 h-4 text-blue-400" />;
      case 'AI Inference Completed': return <Cpu className="w-4 h-4 text-violet-400" />;
      case 'Routed to Human Review': return <Users className="w-4 h-4 text-amber-400" />;
      case 'Officer Approved': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'Evidence Report Generated': return <FileText className="w-4 h-4 text-cyan-400" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const mediaTabs = [
    { id: 'ORIGINAL', label: 'Original', icon: Eye },
    { id: 'PROCESSED', label: 'Processed', icon: Image },
    { id: 'ANNOTATED', label: 'AI Annotated', icon: ShieldAlert },
    { id: 'PLATE_CROP', label: 'Plate Crop', icon: Scan },
  ];

  const getMediaSrc = () => {
    switch(activeMediaTab) {
      case 'ANNOTATED': return RECORD_DATA.evidence.annotated;
      case 'PROCESSED': return RECORD_DATA.evidence.processed;
      case 'PLATE_CROP': return RECORD_DATA.evidence.plateCrop;
      default: return RECORD_DATA.evidence.original;
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden flex flex-col">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="h-20 shrink-0 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()} 
            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors font-medium border-r border-slate-800 pr-6"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20">
              <Scale className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white tracking-tight">Evidence Report</h1>
                <span className="font-mono bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-sm">
                  {violationId}
                </span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wider border ${getStatusColor(RECORD_DATA.status)}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> {RECORD_DATA.status}
                </span>
              </div>
              <div className="flex items-center gap-5 text-sm text-slate-400 mt-1">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {RECORD_DATA.location}</span>
                <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-slate-500" /> {RECORD_DATA.cameraId}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-500" /> {new Date(RECORD_DATA.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-slate-700">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <Download className="w-4 h-4" /> Export Evidence PDF
          </button>
        </div>
      </header>

      {/* --- SPLIT PANE MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANE: Evidence Viewer */}
        <div className="lg:w-[58%] xl:w-[62%] flex flex-col border-r border-slate-800 bg-slate-950/50">
          
          {/* Media Tabs - Updated with Plate Crop */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 flex-wrap">
              {mediaTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMediaTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                    activeMediaTab === tab.id 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Large Image Container */}
          <div className="flex-1 relative bg-[#0a0f18] flex items-center justify-center p-6 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={getMediaSrc()} 
                alt={`${activeMediaTab} Evidence`}
                className="max-w-full max-h-full object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
              
              {/* Plate Crop specific overlay */}
              {activeMediaTab === 'PLATE_CROP' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="bg-emerald-500/10 border-2 border-emerald-500 rounded-xl p-6 text-center">
                    <Scan className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">MH 12 AB 1234</p>
                    <p className="text-sm text-emerald-400">OCR Confidence: 96%</p>
                  </div>
                </div>
              )}

              {/* Annotation Overlays */}
              {activeMediaTab === 'ANNOTATED' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="absolute w-[35%] h-[40%] border-[3px] border-emerald-500 bg-emerald-500/10 rounded left-[30%] top-[25%]">
                    <div className="absolute -top-7 left-[-3px] bg-emerald-500 text-white text-sm px-2 py-0.5 font-mono font-bold tracking-wider rounded-t">CAR (0.98)</div>
                  </div>
                  <div className="absolute bottom-[25%] w-[70%] h-1.5 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                    <div className="absolute -top-7 right-0 text-rose-500 font-mono text-sm bg-slate-950/90 px-2 py-0.5 border border-rose-500/50 rounded">VIRTUAL_STOP_LINE</div>
                  </div>
                  <div className="absolute right-[15%] top-[20%] border-2 border-cyan-400 bg-cyan-500/10 rounded-lg px-2 py-1">
                    <span className="text-cyan-400 text-xs font-bold">🚦 SIGNAL: RED</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-10 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6 text-xs font-mono text-slate-500">
            <span>RES: 1920x1080 | FPS: 30</span>
            <span>SYSTEM: ViolationLens AI v1.0.4</span>
          </div>
        </div>

        {/* RIGHT PANE: Scrollable Case File */}
        <div className="lg:w-[42%] xl:w-[38%] overflow-y-auto bg-slate-950 p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          {/* Evidence Completeness Score */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Evidence Completeness
              </h3>
              <span className="text-2xl font-bold text-emerald-400">{completenessScore}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" style={{ width: `${completenessScore}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {evidenceItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  {item.available ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span className={item.available ? 'text-slate-300' : 'text-slate-500'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Violation Summary */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Detected Infractions
            </h3>
            <div className="space-y-3">
              {RECORD_DATA.violations.map((v, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${v.severity === 'CRITICAL' ? 'bg-rose-500' : 'bg-orange-500'}`} />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-white text-base">{v.type}</h4>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${
                        v.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {v.severity}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Confidence</div>
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-base font-bold">
                        {(v.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-2.5">
                    <p className="text-sm text-slate-300 leading-relaxed">{v.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* License Plate & Image Quality */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" /> Plate Extraction & Quality
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-center flex-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Plate</div>
                  <div className="font-mono text-xl font-extrabold text-amber-300 tracking-widest">{RECORD_DATA.plate.text}</div>
                </div>
                <div className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-center flex-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">OCR Confidence</div>
                  <div className="font-mono text-xl font-extrabold text-emerald-400">{(RECORD_DATA.plate.confidence * 100).toFixed(0)}%</div>
                </div>
              </div>
              
              {/* Image Quality Report */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Image className="w-3.5 h-3.5" /> Image Quality & Preprocessing
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-500">Quality:</span>
                    <span className={`ml-2 font-semibold ${RECORD_DATA.imageQuality.qualityLabel === 'Acceptable' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {RECORD_DATA.imageQuality.qualityLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Condition:</span>
                    <span className="ml-2 font-semibold text-cyan-400">{RECORD_DATA.imageQuality.visibilityCondition.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Blur Score:</span>
                    <span className="ml-2 font-mono text-slate-300">{RECORD_DATA.imageQuality.blurScore}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Brightness:</span>
                    <span className="ml-2 font-mono text-slate-300">{RECORD_DATA.imageQuality.brightnessScore}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-500 text-xs">Preprocessing:</span>
                  <span className="ml-2 text-xs text-cyan-300">{RECORD_DATA.imageQuality.preprocessingApplied}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Reviewer Decision */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" /> Reviewer Decision
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(RECORD_DATA.status)}`}>
                      {RECORD_DATA.status}
                    </span>
                    <span className="text-sm text-slate-400">{RECORD_DATA.reviewer.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">Badge: {RECORD_DATA.reviewer.badgeId}</span>
                </div>
                <span className="text-xs text-slate-500">{new Date(RECORD_DATA.reviewer.timestamp).toLocaleString()}</span>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-2.5">
                <p className="text-sm text-slate-300">"{RECORD_DATA.reviewer.remarks}"</p>
              </div>
            </div>
          </section>

          {/* Review History Timeline */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" /> Review & Evidence Timeline
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative">
              <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-slate-700" />
              <div className="space-y-4">
                {RECORD_DATA.reviewHistory.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10 shrink-0">
                      {getHistoryIcon(item.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{item.action}</p>
                      <p className="text-xs text-slate-400">{item.actor}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{new Date(item.time).toLocaleTimeString()}</p>
                    </div>
                    {index === 0 && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Latest</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Supported Violations */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" /> Supported Violation Classes
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap gap-1.5">
                {RECORD_DATA.supportedViolations.map((v, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium border bg-slate-800/30 border-slate-700 text-slate-300">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Detected Objects */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" /> AI Detected Objects
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Object</th>
                    <th className="px-4 py-3 font-semibold">Conf.</th>
                    <th className="px-4 py-3 font-semibold text-right">BBox</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800">
                  {RECORD_DATA.objects.map((obj, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-slate-200 capitalize font-medium flex items-center gap-2">
                        <Car className="w-3.5 h-3.5 text-slate-500" /> {obj.label.replace('_', ' ')}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-emerald-400 text-sm">
                          {(obj.confidence * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs text-slate-500">{obj.bbox}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Integrity */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-emerald-400" /> Chain of Custody
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5"/> SHA-256 Hash
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg text-[10px] font-mono text-emerald-400 break-all">
                  {RECORD_DATA.integrity.hash}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Algorithm</div>
                  <div className="text-xs text-slate-300 font-mono">{RECORD_DATA.integrity.signatureAlgo}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sealed</div>
                  <div className="text-xs text-slate-300 font-mono">{new Date(RECORD_DATA.integrity.sealedAt).toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </section>

          {/* API Payload */}
          <section>
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
              <FileJson className="w-4 h-4 text-blue-400" /> System Payload
            </h3>
            <pre className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-[10px] text-slate-400 font-mono overflow-x-auto leading-relaxed">
{JSON.stringify({
  violation_id: violationId,
  timestamp: RECORD_DATA.timestamp,
  camera_profile: 'PROF-MG-NORTH-v2',
  metrics: {
    total_time_ms: RECORD_DATA.processingTimeMs,
    preprocessing_ms: 120,
    inference_ms: 450,
    ocr_ms: 270
  },
  supported_checks: RECORD_DATA.supportedViolations.length,
  engine: 'ViolationLens Core v1.0.4'
}, null, 2)}
            </pre>
          </section>

        </div>
      </div>
    </div>
  );
}