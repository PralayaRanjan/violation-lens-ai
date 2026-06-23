"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert, Menu, Home, Brain, FileText, Users,
  BarChart3, TrendingUp, Camera, AlertOctagon, Layers,
  LayoutDashboard, ChevronLeft, ChevronRight, LogOut,
  HelpCircle, Settings, Bell, User
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  activeItem?: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
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

export function Sidebar({
  activeItem = "dashboard",
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
  navItems = defaultNavItems,
}: SidebarProps) {
  const [active, setActive] = useState(activeItem);

  // Update active when prop changes
  React.useEffect(() => {
    setActive(activeItem);
  }, [activeItem]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
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
            <ChevronRight className="w-3 h-3 text-slate-400" />
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
}

// Top Bar Component - to be used with Sidebar
export function TopBar({ 
  onMenuClick, 
  title, 
  subtitle 
}: { 
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 ml-auto">
          {title && (
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-white">{title}</h1>
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          )}
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
  );
}