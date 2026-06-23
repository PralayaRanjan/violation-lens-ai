"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    UploadCloud, Settings, AlertTriangle, Play,
    CheckCircle, Image as ImageIcon, MapPin,
    ThermometerSun, Compass, Camera, Video,
    Info, ShieldAlert, SlidersHorizontal, Trash2,
    Menu, Home, Brain, FileText, Users, BarChart3,
    TrendingUp, AlertOctagon, GitBranch, LayoutDashboard,
    ChevronLeft, ChevronRight as ChevronRightIcon,
    LogOut, HelpCircle, Award, Gauge, Scan,
    Eye, Layers, FileCheck, Clock, Target
} from 'lucide-react';

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (v: boolean) => void;
}) => {
    const [active, setActive] = useState("analyze");

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
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[280px]'
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

export default function AnalyzePage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    const [config, setConfig] = useState({
        camera_location: '',
        signal_status: 'UNKNOWN',
        road_direction: 'UNKNOWN',
        weather_condition: 'UNKNOWN',
        camera_angle: 'UNKNOWN',
        enable_preprocessing: true,
        preprocessing_mode: 'AUTO',
        enable_ocr: true,
        stop_line_position: 50,
        no_parking_zone_enabled: false,
        selected_checks: [
            'HELMET_NON_COMPLIANCE',
            'SEATBELT_NON_COMPLIANCE',
            'TRIPLE_RIDING',
            'WRONG_SIDE_DRIVING',
            'STOP_LINE_VIOLATION',
            'RED_LIGHT_VIOLATION',
            'ILLEGAL_PARKING',
        ],
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processingStage, setProcessingStage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile: File) => {
        setError(null);
        if (selectedFile.size > 50 * 1024 * 1024) {
            setError("File is too large. Please upload an image or video under 50MB.");
            return;
        }
        if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
            setError("Unsupported file format. Please upload JPG, PNG, or MP4.");
            return;
        }

        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target?.result as string);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl('video');
        }
    };

    const handleConfigChange = (field: string, value: string | boolean | number | string[]) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const toggleViolationCheck = (violation: string) => {
        setConfig(prev => {
            const current = prev.selected_checks;
            const newChecks = current.includes(violation)
                ? current.filter(v => v !== violation)
                : [...current, violation];
            return { ...prev, selected_checks: newChecks };
        });
    };

    const runAnalysis = async () => {
        if (!file) {
            setError("Please upload an image to analyze.");
            return;
        }

        if (config.selected_checks.length === 0) {
            setError("Please select at least one violation type to check.");
            return;
        }

        if (file.type.startsWith("video/")) {
            setError(
                "Video analysis is reserved for future live-stream mode. Please upload an image for this prototype."
            );
            return;
        }

        try {
            setIsAnalyzing(true);
            setProgress(5);
            setProcessingStage("Preparing evidence package...");
            setError(null);

            const formData = new FormData();

            formData.append("file", file);
            formData.append(
                "camera_location",
                config.camera_location || "Unknown Location"
            );
            formData.append("signal_status", config.signal_status);
            formData.append("road_direction", config.road_direction);
            formData.append("weather_condition", config.weather_condition);

            formData.append("camera_angle", config.camera_angle || "UNKNOWN");
            formData.append(
                "enable_preprocessing",
                String(config.enable_preprocessing)
            );
            formData.append("preprocessing_mode", config.preprocessing_mode || "AUTO");
            formData.append("enable_ocr", String(config.enable_ocr));

            formData.append("stop_line_y", String(config.stop_line_position));
            formData.append("stop_line_position", String(config.stop_line_position));

            formData.append(
                "no_parking_zone_enabled",
                String(config.no_parking_zone_enabled)
            );

            formData.append(
                "selected_checks",
                JSON.stringify(config.selected_checks || [])
            );

            /**
             * MVP note:
             * The current UI shows parking zone configuration but does not yet draw polygon points.
             * So for now, when parking zone is enabled, we send a demo polygon.
             * Later this should come from a real polygon drawing tool.
             */
            if (config.no_parking_zone_enabled) {
                formData.append(
                    "no_parking_polygon",
                    JSON.stringify([
                        [100, 300],
                        [700, 300],
                        [700, 700],
                        [100, 700],
                    ])
                );
            }

            setProgress(15);
            setProcessingStage("Uploading image to ViolationLens AI...");

            setProgress(30);
            setProcessingStage(
                config.enable_preprocessing
                    ? `Applying ${config.preprocessing_mode} preprocessing...`
                    : "Skipping preprocessing..."
            );

            setProgress(45);
            setProcessingStage("Running YOLO object detection...");

            const response = await fetch(`${API_BASE_URL}/violations/analyze`, {
                method: "POST",
                body: formData,
            });

            setProgress(65);
            setProcessingStage("Running OCR and violation rule engine...");

            const json = await response.json();

            if (!response.ok) {
                throw new Error(
                    json?.detail || json?.message || "Analysis failed. Please try again."
                );
            }

            if (!json?.data?.violation_id) {
                throw new Error("Analysis completed but no violation ID was returned.");
            }

            setProgress(85);
            setProcessingStage("Generating annotated evidence image...");

            setProgress(95);
            setProcessingStage("Saving metadata and review record...");

            setProgress(100);
            setProcessingStage("Analysis complete. Opening evidence report...");

            setTimeout(() => {
                router.push(`/analyze/result/${json.data.violation_id}`);
            }, 600);
        } catch (err: any) {
            setError(err?.message || "Analysis failed. Please try again.");
        } finally {
            setTimeout(() => {
                setIsAnalyzing(false);
            }, 800);
        }
    };

    const violationChecks = [
        { id: 'HELMET_NON_COMPLIANCE', label: 'Helmet Non-Compliance', icon: ShieldAlert },
        { id: 'SEATBELT_NON_COMPLIANCE', label: 'Seatbelt Non-Compliance', icon: ShieldAlert },
        { id: 'TRIPLE_RIDING', label: 'Triple Riding', icon: Users },
        { id: 'WRONG_SIDE_DRIVING', label: 'Wrong-Side Driving', icon: Compass },
        { id: 'STOP_LINE_VIOLATION', label: 'Stop-Line Violation', icon: Target },
        { id: 'RED_LIGHT_VIOLATION', label: 'Red-Light Violation', icon: AlertTriangle },
        { id: 'ILLEGAL_PARKING', label: 'Illegal Parking', icon: MapPin },
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

                <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 relative z-10">
                    {/* Header */}
                    <header>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Smart Upload & Analysis Studio</h1>
                        <p className="text-lg text-slate-400 mt-1">Upload traffic evidence and configure scene parameters for AI inference.</p>
                    </header>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-sm">Upload Error</h4>
                                <p className="text-sm opacity-90">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* MEDIA UPLOAD BOX - FULL WIDTH TOP */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                            <h2 className="font-semibold text-white flex items-center gap-2 text-lg">
                                <ImageIcon className="w-5 h-5 text-blue-400" /> Source Media
                            </h2>
                            {file && (
                                <button onClick={() => { setFile(null); setPreviewUrl(null); }} className="text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Clear Media
                                </button>
                            )}
                        </div>

                        <div className="p-6 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-950" style={{ backgroundBlendMode: 'overlay' }}>
                            {!file ? (
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleFileDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center p-12 cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group min-h-[300px]"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                    <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                                        <UploadCloud className="w-12 h-12 text-slate-400 group-hover:text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">Drag & Drop Evidence</h3>
                                    <p className="text-base text-slate-400 text-center max-w-md mb-4">
                                        Upload high-resolution images or MP4 videos. The system automatically handles motion blur, low light, and noisy artifacts.
                                    </p>
                                    <div className="flex gap-4 mt-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-700"><Camera className="w-4 h-4" /> JPG, PNG</div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                                            <FileCheck className="w-4 h-4" /> Evidence-ready output
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-slate-500">Max 50MB · Clear traffic view recommended</div>
                                </div>
                            ) : (
                                <div className="relative flex items-center justify-center rounded-xl overflow-hidden border border-slate-700 bg-slate-900 min-h-[400px] max-h-[600px]">
                                    {previewUrl === 'video' ? (
                                        <div className="flex flex-col items-center text-slate-400 p-8">
                                            <Video className="w-24 h-24 mb-4 text-slate-500" />
                                            <p className="text-lg font-medium">{file.name}</p>
                                            <p className="text-sm text-slate-500 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <img src={previewUrl!} alt="Evidence Preview" className="max-w-full max-h-full object-contain" />
                                    )}

                                    {/* Overlay Tools */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        <button className="bg-slate-900/90 backdrop-blur border border-slate-700 text-sm px-3 py-2 rounded-lg shadow text-slate-300 hover:text-white hover:border-red-500/50 flex items-center gap-2 transition-colors">
                                            <div className="w-3 h-0.5 bg-red-500"></div> Set Stop Line
                                        </button>
                                        <button className="bg-slate-900/90 backdrop-blur border border-slate-700 text-sm px-3 py-2 rounded-lg shadow text-slate-300 hover:text-white hover:border-yellow-500/50 flex items-center gap-2 transition-colors">
                                            <div className="w-3 h-3 border border-yellow-500 bg-yellow-500/20"></div> Set Parking Zone
                                        </button>
                                    </div>

                                    {config.stop_line_position !== null && (
                                        <div className="absolute left-0 right-0 border-t-2 border-red-500/70 border-dashed" style={{ top: `${config.stop_line_position}%` }}>
                                            <span className="absolute -top-3 left-2 text-xs bg-red-500/20 px-2 py-0.5 rounded text-red-400">Stop Line {config.stop_line_position}%</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CONFIGURATION PANELS - BELOW MEDIA */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Scene Configuration */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                                <h2 className="font-semibold text-white flex items-center gap-2 text-lg">
                                    <SlidersHorizontal className="w-5 h-5 text-violet-400" /> Scene Configuration
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Warning Panel */}
                                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-400/90 leading-relaxed">
                                        <strong className="text-amber-400">Responsible AI Notice:</strong> If signal, stop line, or direction is marked as "UNKNOWN", the system will classify related violations as <span className="font-mono bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 text-xs">Needs Manual Review</span> to prevent false positives.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> Camera Location
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. MG Road Junction Cam-04"
                                            value={config.camera_location}
                                            onChange={(e) => handleConfigChange('camera_location', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4" /> Signal Status
                                            </label>
                                            <select
                                                value={config.signal_status}
                                                onChange={(e) => handleConfigChange('signal_status', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                            >
                                                <option value="UNKNOWN">Unknown</option>
                                                <option value="RED">Red</option>
                                                <option value="GREEN">Green</option>
                                                <option value="YELLOW">Yellow</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Compass className="w-4 h-4" /> Road Direction
                                            </label>
                                            <select
                                                value={config.road_direction}
                                                onChange={(e) => handleConfigChange('road_direction', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                            >
                                                <option value="UNKNOWN">Unknown</option>
                                                <option value="LEFT_TO_RIGHT">Left to Right</option>
                                                <option value="RIGHT_TO_LEFT">Right to Left</option>
                                                <option value="TOWARDS_CAMERA">Towards Camera</option>
                                                <option value="AWAY_FROM_CAMERA">Away from Camera</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <ThermometerSun className="w-4 h-4" /> Weather Condition
                                            </label>
                                            <select
                                                value={config.weather_condition}
                                                onChange={(e) => handleConfigChange('weather_condition', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                            >
                                                <option value="UNKNOWN">Unknown</option>
                                                <option value="CLEAR">Clear</option>
                                                <option value="RAIN">Rain</option>
                                                <option value="FOG">Fog / Smog</option>
                                                <option value="NIGHT">Night / Low Light</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Camera className="w-4 h-4" /> Camera Angle
                                            </label>
                                            <select
                                                value={config.camera_angle}
                                                onChange={(e) => handleConfigChange('camera_angle', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                            >
                                                <option value="UNKNOWN">Unknown</option>
                                                <option value="FRONT">Front</option>
                                                <option value="SIDE">Side</option>
                                                <option value="TOP">Top Down</option>
                                                <option value="DIAGONAL">Diagonal</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Stop Line Slider */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Target className="w-4 h-4" /> Stop Line Position
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={config.stop_line_position}
                                                onChange={(e) => handleConfigChange('stop_line_position', parseInt(e.target.value))}
                                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                            />
                                            <span className="text-sm font-mono text-blue-400 w-12">{config.stop_line_position}%</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Set vertical position of stop line in the image</p>
                                    </div>

                                    {/* Preprocessing & OCR */}
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Eye className="w-4 h-4" /> Preprocessing Mode
                                            </label>
                                            <select
                                                value={config.preprocessing_mode}
                                                onChange={(e) => handleConfigChange('preprocessing_mode', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                                disabled={!config.enable_preprocessing}
                                            >
                                                <option value="AUTO">Auto</option>
                                                <option value="LOW_LIGHT">Low Light</option>
                                                <option value="RAIN">Rain / Noise</option>
                                                <option value="BLUR">Blur Recovery</option>
                                                <option value="SHADOW">Shadow Correction</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Scan className="w-4 h-4" /> OCR Option
                                            </label>
                                            <div className="flex items-center gap-3 h-[50px]">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={config.enable_ocr}
                                                        onChange={(e) => handleConfigChange('enable_ocr', e.target.checked)}
                                                    />
                                                    <div className="w-12 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                                <span className="text-sm text-slate-400">{config.enable_ocr ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enable Preprocessing Toggle */}
                                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-base font-semibold text-white">Enable AI Preprocessing</h4>
                                            <p className="text-sm text-slate-500">Auto-corrects contrast, rain, and blur.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={config.enable_preprocessing}
                                                onChange={(e) => handleConfigChange('enable_preprocessing', e.target.checked)}
                                            />
                                            <div className="w-12 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Violation Checks & Expected Output */}
                        <div className="space-y-6">
                            {/* Violation Checks */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-slate-800 bg-slate-950">
                                    <h2 className="font-semibold text-white flex items-center gap-2 text-lg">
                                        <Layers className="w-5 h-5 text-emerald-400" /> Violation Checks
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-0.5">Select which violations to detect</p>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-2">
                                    {violationChecks.map((violation) => {
                                        const Icon = violation.icon;
                                        const isChecked = config.selected_checks.includes(violation.id);

                                        return (
                                            <label
                                                key={violation.id}
                                                className={`flex items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${isChecked
                                                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                                        : 'bg-slate-950/50 border-slate-700 text-slate-400 hover:bg-slate-800/50'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => toggleViolationCheck(violation.id)}
                                                    className="hidden"
                                                />
                                                <Icon className={`w-4 h-4 ${isChecked ? 'text-blue-400' : 'text-slate-500'}`} />
                                                <span className="text-sm font-medium truncate">{violation.label}</span>
                                                {isChecked && <CheckCircle className="w-3.5 h-3.5 ml-auto text-emerald-400 shrink-0" />}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Expected Output */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-slate-800 bg-slate-950">
                                    <h2 className="font-semibold text-white flex items-center gap-2 text-lg">
                                        <FileCheck className="w-5 h-5 text-cyan-400" /> Expected Output
                                    </h2>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-2">
                                    {[
                                        { icon: ImageIcon, label: 'Annotated Evidence' },
                                        { icon: AlertTriangle, label: 'Violation Classification' },
                                        { icon: Scan, label: 'OCR Registration' },
                                        { icon: Gauge, label: 'Confidence Scores' },
                                        { icon: Clock, label: 'Review Status' },
                                        { icon: FileText, label: 'Metadata Timestamp' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-700">
                                            <item.icon className="w-4 h-4 text-cyan-400" />
                                            <span className="text-sm text-slate-300">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                                <div className="p-4 bg-slate-950/80 border-t border-slate-800">
                                    {!isAnalyzing ? (
                                        <button
                                            onClick={runAnalysis}
                                            disabled={!file || config.selected_checks.length === 0}
                                            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${file && config.selected_checks.length > 0
                                                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]'
                                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                }`}
                                        >
                                            <Play className="w-6 h-6 fill-current" /> Run AI Analysis
                                        </button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-base">
                                                <span className="font-medium text-blue-400 animate-pulse">{processingStage}</span>
                                                <span className="text-white font-mono text-lg">{progress}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 ease-out"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {file && config.selected_checks.length === 0 && (
                                        <p className="text-sm text-amber-400 text-center mt-2">Please select at least one violation type</p>
                                    )}
                                </div>
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