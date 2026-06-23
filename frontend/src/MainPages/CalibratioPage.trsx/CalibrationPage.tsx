"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import {
  Camera, UploadCloud, Save, Crosshair,
  Square, MapPin, Settings, AlertTriangle,
  Trash2, CheckCircle2, Info, ShieldAlert, Route,
  Menu, Home, Brain, Users, BarChart3, TrendingUp,
  LayoutDashboard, ChevronLeft, ChevronRight as ChevronRightIcon,
  LogOut, AlertOctagon, Layers, FileCheck, Play,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Radio,
  HelpCircle, Eye, Navigation, Gauge
} from 'lucide-react';

// --- SIDEBAR ---
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
  isOpen: boolean; setIsOpen: (v: boolean) => void;
  isCollapsed: boolean; setIsCollapsed: (v: boolean) => void;
}) => {
  const [active, setActive] = useState("calibration");
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

type Point = { x: number; y: number };
type ToolType = 'STOP_LINE' | 'NO_PARKING' | 'SIGNAL_ROI' | 'LANE';

export default function CalibrationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>('STOP_LINE');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    cameraId: 'CAM-JUNCTION-04',
    locationName: 'MG Road North Intersection',
    latitude: '12.9716',
    longitude: '77.5946',
    policeZone: 'North Zone',
    junctionName: 'MG Road Junction',
    cameraAngle: '45°',
    cameraHeight: '8m',
    cameraViewType: 'JUNCTION_VIEW',
    allowedDirection: 'LEFT_TO_RIGHT',
    stopLine: [] as Point[],
    noParking: [] as Point[],
    signalRoi: [] as Point[],
    lanePolygon: [] as Point[],
  });

  const getCoordinates = (e: MouseEvent<SVGSVGElement>): Point | null => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
  };

  const handleCanvasClick = (e: MouseEvent<SVGSVGElement>) => {
    const pt = getCoordinates(e);
    if (!pt) return;
    setData(prev => {
      const newData = { ...prev };
      if (activeTool === 'STOP_LINE') {
        if (newData.stopLine.length >= 2) newData.stopLine = [];
        newData.stopLine.push(pt);
      } else if (activeTool === 'NO_PARKING') {
        newData.noParking.push(pt);
      } else if (activeTool === 'SIGNAL_ROI') {
        if (newData.signalRoi.length >= 2) newData.signalRoi = [];
        newData.signalRoi.push(pt);
      } else if (activeTool === 'LANE') {
        newData.lanePolygon.push(pt);
      }
      return newData;
    });
  };

  const clearData = () => {
    setData(prev => {
      const newData = { ...prev };
      if (activeTool === 'STOP_LINE') newData.stopLine = [];
      if (activeTool === 'NO_PARKING') newData.noParking = [];
      if (activeTool === 'SIGNAL_ROI') newData.signalRoi = [];
      if (activeTool === 'LANE') newData.lanePolygon = [];
      return newData;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateCalibration = () => {
    const errors: string[] = [];
    if (!data.locationName || data.locationName.trim() === '') errors.push('Location name is required');
    if (!data.cameraId || data.cameraId.trim() === '') errors.push('Camera ID is required');
    if (data.stopLine.length !== 2) errors.push('Stop line must have exactly 2 points');
    if (data.noParking.length < 3) errors.push('No-parking zone must have at least 3 points');
    if (data.signalRoi.length !== 2) errors.push('Traffic light ROI must have exactly 2 points');
    if (!data.allowedDirection || data.allowedDirection === 'UNKNOWN') errors.push('Allowed direction is required');
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const saveProfile = () => {
    if (!validateCalibration()) return;
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }, 1500);
  };

  const testCalibration = () => {
    setTestResult(null);
    const passed = data.stopLine.length === 2 && data.signalRoi.length === 2 && data.noParking.length >= 3;
    setTimeout(() => {
      setTestResult(passed ? '✅ All rules validated! System ready.' : '⚠️ Please complete all steps.');
    }, 1000);
  };

  const isComplete = () => {
    return data.stopLine.length === 2 && 
           data.signalRoi.length === 2 && 
           data.noParking.length >= 3 &&
           data.locationName.trim() !== '' &&
           data.cameraId.trim() !== '';
  };

  const renderPoints = (points: Point[]) => points.map(p => `${p.x},${p.y}`).join(' ');

  const tools = [
    { id: 'STOP_LINE' as ToolType, label: 'Stop Line', icon: '🛑', desc: 'Click 2 points', color: 'rose', count: data.stopLine.length, max: 2 },
    { id: 'SIGNAL_ROI' as ToolType, label: 'Signal ROI', icon: '🚦', desc: 'Click 2 points', color: 'cyan', count: data.signalRoi.length, max: 2 },
    { id: 'NO_PARKING' as ToolType, label: 'No Parking', icon: '🚫', desc: 'Click 3+ points', color: 'yellow', count: data.noParking.length, max: '∞' },
    { id: 'LANE' as ToolType, label: 'Lane Zone', icon: '🛣️', desc: 'Click 3+ points', color: 'blue', count: data.lanePolygon.length, max: '∞' },
  ];

  const directionOptions = [
    { value: 'LEFT_TO_RIGHT', label: '← Left to Right' },
    { value: 'RIGHT_TO_LEFT', label: '→ Right to Left' },
    { value: 'TOWARDS_CAMERA', label: '↑ Towards Camera' },
    { value: 'AWAY_FROM_CAMERA', label: '↓ Away from Camera' },
    { value: 'BIDIRECTIONAL', label: '↔ Bidirectional' },
  ];

  const cameraViews = ['FRONT_VIEW', 'SIDE_VIEW', 'TOP_VIEW', 'JUNCTION_VIEW', 'PARKING_VIEW'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
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

        <div className="p-6 max-w-[1400px] mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Camera className="w-7 h-7 text-blue-400" />
                Camera Calibration
              </h1>
              <p className="text-slate-400 mt-1 text-sm">Set stop lines, signal areas, parking zones, and lane geometry for AI rule engine</p>
            </div>
            <div className="flex gap-3">
              <button onClick={testCalibration} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-slate-700">
                <Play className="w-4 h-4" /> Test Rules
              </button>
              <button onClick={saveProfile} disabled={isSaving || !isComplete()} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${saveSuccess ? 'bg-emerald-600 text-white' : isComplete() ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                {isSaving ? 'Saving...' : saveSuccess ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 border border-slate-800 rounded-xl p-3 mb-6">
            <div className="flex items-center gap-3">
              {isComplete() ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
              <span className="text-sm">{isComplete() ? '✅ All calibrated! Ready to save.' : `⚠️ ${4 - [data.stopLine.length === 2, data.signalRoi.length === 2, data.noParking.length >= 3, data.lanePolygon.length >= 3].filter(Boolean).length} steps remaining`}</span>
              {testResult && <span className={`text-sm ${testResult.includes('✅') ? 'text-emerald-400' : 'text-amber-400'}`}>{testResult}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Progress</span>
              <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${(data.stopLine.length === 2 ? 25 : 0) + (data.signalRoi.length === 2 ? 25 : 0) + (data.noParking.length >= 3 ? 25 : 0) + (data.lanePolygon.length >= 3 ? 25 : 0)}%` }} />
              </div>
            </div>
          </div>

          {/* VALIDATION ERRORS */}
          {validationErrors.length > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-rose-400 mb-2">Please fix the following:</h4>
              <ul className="list-disc list-inside text-xs text-rose-300 space-y-1">
                {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          {/* MAIN CONTENT - 2 Column Layout for Better Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT: Canvas */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden">
                <div className="h-11 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {data.cameraId}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${imageSrc ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {imageSrc ? '📷 Loaded' : 'No image'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Tool:</span>
                    <span className="text-xs font-medium text-blue-400">{tools.find(t => t.id === activeTool)?.label}</span>
                  </div>
                </div>

                <div className="relative bg-slate-950 overflow-hidden flex items-center justify-center min-h-[550px]">
                  {!imageSrc ? (
                    <div className="text-center p-8">
                      <Camera className="w-16 h-16 text-slate-800 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Upload a reference image to start</p>
                      <button onClick={() => fileInputRef.current?.click()} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                        <UploadCloud className="w-4 h-4 inline mr-2" /> Upload Image
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img src={imageSrc} alt="Reference" className="w-full h-full object-contain pointer-events-none opacity-60" />
                      <svg ref={svgRef} onClick={handleCanvasClick} className="absolute inset-0 w-full h-full z-10 cursor-crosshair">
                        
                        {/* Lane Polygon */}
                        {data.lanePolygon.length > 0 && (
                          <>
                            <polygon points={renderPoints(data.lanePolygon)} fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 3" />
                            {data.lanePolygon.map((p, i) => <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="5" fill="#3b82f6" />)}
                            {data.lanePolygon.length >= 3 && <text x={`${data.lanePolygon[0].x}%`} y={`${data.lanePolygon[0].y - 3}%`} fill="#3b82f6" fontSize="12" fontWeight="bold">🛣️ LANE</text>}
                          </>
                        )}

                        {/* Stop Line */}
                        {data.stopLine.length > 0 && (
                          <>
                            <polyline points={renderPoints(data.stopLine)} fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="8 4" />
                            {data.stopLine.map((p, i) => <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="6" fill="#f43f5e" />)}
                            {data.stopLine.length === 2 && <text x={`${data.stopLine[0].x}%`} y={`${data.stopLine[0].y - 3}%`} fill="#f43f5e" fontSize="12" fontWeight="bold">🛑 STOP</text>}
                          </>
                        )}

                        {/* Signal ROI */}
                        {data.signalRoi.length === 2 && (
                          <>
                            <rect x={`${Math.min(data.signalRoi[0].x, data.signalRoi[1].x)}%`} y={`${Math.min(data.signalRoi[0].y, data.signalRoi[1].y)}%`} width={`${Math.abs(data.signalRoi[0].x - data.signalRoi[1].x)}%`} height={`${Math.abs(data.signalRoi[0].y - data.signalRoi[1].y)}%`} fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 4" />
                            <text x={`${data.signalRoi[0].x}%`} y={`${data.signalRoi[0].y - 3}%`} fill="#06b6d4" fontSize="12" fontWeight="bold">🚦 SIGNAL</text>
                          </>
                        )}
                        {data.signalRoi.map((p, i) => <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="5" fill="#06b6d4" />)}

                        {/* No Parking */}
                        {data.noParking.length > 0 && (
                          <>
                            <polygon points={renderPoints(data.noParking)} fill="rgba(234,179,8,0.12)" stroke="#eab308" strokeWidth="2.5" />
                            {data.noParking.map((p, i) => <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="5" fill="#eab308" />)}
                            {data.noParking.length > 2 && <text x={`${data.noParking[0].x}%`} y={`${data.noParking[0].y - 3}%`} fill="#eab308" fontSize="12" fontWeight="bold">🚫 NO PARKING</text>}
                          </>
                        )}

                        <text x="1.5%" y="5%" fill="#94a3b8" fontSize="12" className="drop-shadow-lg">Click on image to place points</text>
                        <text x="1.5%" y="8%" fill="#94a3b8" fontSize="12" className="drop-shadow-lg">🧭 Direction: {data.allowedDirection.replace('_', ' ')}</text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Tools + Config in one column */}
            <div className="lg:col-span-1 space-y-4">
              
              {/* Drawing Tools - Horizontal row for better use */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Crosshair className="w-4 h-4" /> Drawing Tools
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => {
                    const isActive = activeTool === tool.id;
                    const isDone = tool.count === tool.max || (typeof tool.max === 'string' && tool.count >= 3);
                    return (
                      <button key={tool.id} onClick={() => setActiveTool(tool.id)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? `bg-${tool.color}-500/15 text-${tool.color}-400 border border-${tool.color}-500/30` : isDone ? 'bg-emerald-500/5 text-slate-300 border border-emerald-500/20' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'}`}>
                        <span className="flex items-center gap-2">{tool.icon} {tool.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isActive ? `border-${tool.color}-500/30 text-${tool.color}-400` : isDone ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-700 text-slate-500'}`}>
                          {isDone ? '✅' : `${tool.count}/${tool.max}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button onClick={clearData} className="mt-3 text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Clear current tool data
                </button>
              </div>

              {/* Camera Details - Compact 2 column */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Camera Details
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={data.cameraId} onChange={(e) => setData({...data, cameraId: e.target.value})} className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Camera ID" />
                  <input type="text" value={data.locationName} onChange={(e) => setData({...data, locationName: e.target.value})} className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Location Name" />
                  <input type="text" value={data.latitude} onChange={(e) => setData({...data, latitude: e.target.value})} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Latitude" />
                  <input type="text" value={data.longitude} onChange={(e) => setData({...data, longitude: e.target.value})} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Longitude" />
                  <input type="text" value={data.policeZone} onChange={(e) => setData({...data, policeZone: e.target.value})} className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Police Zone" />
                  <select value={data.cameraViewType} onChange={(e) => setData({...data, cameraViewType: e.target.value})} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none">
                    {cameraViews.map(opt => <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>)}
                  </select>
                  <input type="text" value={data.cameraAngle} onChange={(e) => setData({...data, cameraAngle: e.target.value})} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" placeholder="Angle" />
                </div>
                <div className="mt-3">
                  <select value={data.allowedDirection} onChange={(e) => setData({...data, allowedDirection: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none">
                    {directionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Enabled Violations + Config Preview */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Enabled Violations
                  </h3>
                  <span className={`text-xs ${isComplete() ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isComplete() ? '✅ Ready' : '⏳ Incomplete'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[
                    { label: 'Stop-Line', active: data.stopLine.length === 2 },
                    { label: 'Red-Light', active: data.signalRoi.length === 2 },
                    { label: 'Wrong-Side', active: data.allowedDirection !== 'UNKNOWN' },
                    { label: 'Parking', active: data.noParking.length >= 3 },
                  ].map((v, i) => (
                    <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${v.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>
                      {v.active ? '✅' : '⬜'} {v.label}
                    </span>
                  ))}
                </div>
                
                {/* Config Preview - Compact */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Config Preview</h4>
                  <pre className="text-[9px] text-slate-400 font-mono leading-relaxed bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto max-h-[120px] overflow-y-auto">
{`{
  camera: "${data.cameraId}",
  location: "${data.locationName}",
  direction: "${data.allowedDirection}",
  stopLine: ${data.stopLine.length === 2 ? '✅' : '❌'},
  signalROI: ${data.signalRoi.length === 2 ? '✅' : '❌'},
  noParking: ${data.noParking.length >= 3 ? '✅' : '❌'},
  lane: ${data.lanePolygon.length >= 3 ? '✅' : '❌'}
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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