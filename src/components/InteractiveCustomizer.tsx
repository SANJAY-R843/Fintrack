import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MousePointer, 
  Type, 
  Layers, 
  Compass, 
  Layout, 
  MousePointerClick,
  Monitor,
  Command,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Tv,
  Zap
} from "lucide-react";

// =========================================================================
// 1. TEXTS: Interactive Text Components
// =========================================================================

interface HoverInteractiveTextProps {
  text: string;
  className?: string;
  mood?: "tech" | "lux" | "retro" | "default";
}

export function HoverInteractiveText({ text, className = "", mood = "tech" }: HoverInteractiveTextProps) {
  const letters = text.split("");
  
  const getLetterColor = (moodStyle: string) => {
    switch (moodStyle) {
      case "tech": return "hover:text-[#5f5df5] hover:drop-shadow-[0_0_12px_rgba(95,93,245,0.8)]";
      case "lux": return "hover:text-amber-400 hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]";
      case "retro": return "hover:text-emerald-400 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]";
      default: return "hover:text-[#7a78fa] hover:drop-shadow-[0_0_10px_rgba(122,120,250,0.6)]";
    }
  };

  return (
    <span className={`inline-flex flex-wrap select-none ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block transition-colors duration-150 cursor-default ${char === " " ? "mr-2.5" : ""} ${getLetterColor(mood)}`}
          whileHover={{ 
            y: -8, 
            scale: 1.25,
            rotate: Math.random() > 0.5 ? 6 : -6,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Dynamic Gradient Highlight Header
interface NeonHighlightHeaderProps {
  title: string;
  subtitle?: string;
  themeColor: "indigo" | "rose" | "emerald" | "amber";
}

export function NeonHighlightHeader({ title, subtitle, themeColor }: NeonHighlightHeaderProps) {
  const gradients = {
    indigo: "from-[#7a78fa] via-[#5f5df5] to-[#403eef] text-indigo-400/25",
    rose: "from-rose-400 via-pink-500 to-indigo-500 text-rose-400/25",
    emerald: "from-emerald-400 via-teal-500 to-[#5f5df5] text-emerald-400/25",
    amber: "from-amber-400 via-orange-500 to-rose-500 text-amber-400/25",
  };

  const ringGlows = {
    indigo: "rgba(95,93,245,0.45)",
    rose: "rgba(244,63,94,0.45)",
    emerald: "rgba(52,211,153,0.45)",
    amber: "rgba(251,191,36,0.45)"
  };

  return (
    <div className="relative group p-0.5 rounded-3xl overflow-visible">
      {/* Dynamic Animated Underlight Glow */}
      <div 
        className="absolute -inset-2 bg-gradient-to-r opacity-30 group-hover:opacity-60 blur-3xl rounded-full transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ringGlows[themeColor]} 0%, transparent 65%)`
        }}
      />
      
      <div className="relative">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">
          <span className={`bg-gradient-to-r ${gradients[themeColor]} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-zinc-400 font-light max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// 2. CURSORS: (Removed high-friction custom cursor option per user request)
// =========================================================================

export type CursorStyle = "classic";



// =========================================================================
// 3. SELECTION OPTIONS: Glow Segmented & Bento Selection Cards
// =========================================================================

interface GlowSegmentedOptionsProps {
  options: { value: string; label: string; icon?: any }[];
  selectedValue: string;
  onChange: (value: any) => void;
  title?: string;
  themeColor?: "indigo" | "rose" | "emerald" | "amber";
}

export function GlowSegmentedControl({ 
  options, 
  selectedValue, 
  onChange, 
  title,
  themeColor = "indigo" 
}: GlowSegmentedOptionsProps) {
  
  const colors = {
    indigo: "bg-[#5f5df5] shadow-[0_0_15px_rgba(95,93,245,0.4)]",
    rose: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]",
    emerald: "bg-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.4)]",
    amber: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
  };

  const ringBorders = {
    indigo: "border-[#5f5df5]/20",
    rose: "border-rose-500/20",
    emerald: "border-emerald-500/20",
    amber: "border-amber-500/10"
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {title && (
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">{title}</span>
      )}
      <div className={`p-1 bg-zinc-950 rounded-xl border ${ringBorders[themeColor]} flex items-center shadow-inner relative w-full`}>
        {options.map((item) => {
          const isSelected = selectedValue === item.value;
          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className="relative flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-center min-w-[70px] z-[1] select-none text-zinc-300 hover:text-white"
            >
              {isSelected && (
                <motion.div
                  layoutId={`active-slider-${title || "segmented"}`}
                  className={`absolute inset-0 rounded-lg ${colors[themeColor]} z-[-1]`}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              {item.icon && <item.icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? "scale-110 text-white" : "text-zinc-500"}`} />}
              <span className={isSelected ? "text-white font-extrabold" : "text-zinc-400 font-medium"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


// Bento Selection Grids for beautiful visual checklist choices
interface BentoSelectCardProps {
  key?: string;
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon: any;
  isSelected: boolean;
  onSelect: (id: any) => void;
  accentColor?: string;
}

export function BentoSelectCard({
  id,
  title,
  description,
  badge,
  icon: IconComponent,
  isSelected,
  onSelect,
  accentColor = "#5f5df5"
}: BentoSelectCardProps) {
  return (
    <motion.div
      onClick={() => onSelect(id)}
      className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none overflow-hidden h-full flex flex-col justify-between group ${
        isSelected 
          ? "bg-zinc-950 border-[#5f5df5]/60 shadow-[0_0_30px_rgba(95,93,245,0.15)]" 
          : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10"
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Top right checked mark circle with glassmorphism */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
        {badge && (
          <span className="text-[9px] font-extrabold uppercase bg-indigo-950/60 text-[#7a78fa] px-2 py-0.5 rounded border border-indigo-900/50">
            {badge}
          </span>
        )}
        <div 
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected 
              ? "bg-[#5f5df5] border-[#5f5df5] text-white" 
              : "border-zinc-850 bg-zinc-950 text-transparent"
          }`}
        >
          <motion.svg 
            viewBox="0 0 24 24" 
            className="w-3.5 h-3.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5"
            animate={{ scale: isSelected ? 1 : 0 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </div>
      </div>

      {/* Decorative colored glow on select background */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 12% 12%, ${accentColor} 0%, transparent 60%)`
            }}
          />
        )}
      </AnimatePresence>

      <div>
        <div 
          className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all mb-4 ${
            isSelected 
              ? "bg-[#5f5df5]/10 border-[#5f5df5]/30 text-[#7a78fa]" 
              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 group-hover:text-zinc-200"
          }`}
        >
          <IconComponent className="w-5.5 h-5.5" />
        </div>
        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-xs text-zinc-500 mt-1.5 font-light leading-relaxed">{description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-900/55 flex items-center text-[10px] font-bold text-zinc-400 group-hover:text-[#7a78fa] transition-colors">
        <span>Toggle interactive model</span>
        <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 duration-200" />
      </div>
    </motion.div>
  );
}


// =========================================================================
// 4. NAVIGATION BARS: Cybernetic Floating Mac Dock Menu
// =========================================================================

interface CyberDockProps {
  items: { key: string; label: string; icon: any }[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function CyberDock({ items, activeKey, onSelect }: CyberDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto max-w-[92vw]">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className="flex items-end gap-3 px-4 py-2.5 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(95,93,245,0.06)] overflow-visible"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {items.map((item, idx) => {
          const isSelected = activeKey === item.key;
          const isHovered = hoveredIdx === idx;
          const isNearHovered = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          // Apple dock-inspired magnetic size calculation
          let scaleFactor = 1.0;
          if (isHovered) scaleFactor = 1.25;
          else if (isNearHovered) scaleFactor = 1.12;

          return (
            <div 
              key={item.key}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIdx(idx)}
            >
              {/* Tooltip on top of active element */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    className="absolute bg-zinc-900 border border-zinc-800 text-[10px] font-black text-white px-2.5 py-1 rounded-lg shadow-xl uppercase tracking-wider whitespace-nowrap z-[45]"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon Container */}
              <button
                onClick={() => onSelect(item.key)}
                className={`rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer relative ${
                  isSelected 
                    ? "bg-[#5f5df5] text-white shadow-[0_0_15px_rgba(95,93,245,0.4)]" 
                    : "bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
                style={{
                  width: `${40 * scaleFactor}px`,
                  height: `${40 * scaleFactor}px`,
                }}
              >
                {isSelected && (
                  <motion.span 
                    layoutId="dock-indicator-dot"
                    className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <item.icon className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}


// =========================================================================
// 5. UNIFIED DEMORAMA CONTROL PANEL WIDGET
// =========================================================================

interface InteractionStudioWidgetProps {
  typographyMood: "tech" | "lux" | "retro" | "default";
  setTypographyMood: (mood: "tech" | "lux" | "retro" | "default") => void;
  navTheme: "standard" | "cyberdock";
  setNavTheme: (theme: "standard" | "cyberdock") => void;
}

export function InteractionStudioWidget({
  typographyMood,
  setTypographyMood,
  navTheme,
  setNavTheme
}: InteractionStudioWidgetProps) {
  
  const mood_options = [
    { value: "tech", label: "Neo-Swiss Tech", icon: Cpu },
    { value: "lux", label: "Golden Lux", icon: TrendingUp },
    { value: "retro", label: "Matrix Emerald", icon: Zap },
    { value: "default", label: "Default Pro", icon: Monitor }
  ];

  const nav_options = [
    { value: "standard", label: "Default Header", icon: Layout },
    { value: "cyberdock", label: "Apple floating dock", icon: Compass }
  ];

  return (
    <div className="bg-zinc-950 p-6 md:p-8 rounded-3xl border border-[#5f5df5]/15 shadow-[0_0_40px_rgba(95,93,245,0.08)] relative overflow-hidden group">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-radial from-[#5f5df5]/15 to-transparent blur-2xl rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-[150px] h-[150px] bg-gradient-radial from-[#7a78fa]/10 to-transparent blur-2xl rounded-full" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5f5df5]/10 border border-[#5f5df5]/30 flex items-center justify-center text-[#5f5df5]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                Interaction Studio Customizer
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Fine-tune the extraordinary navigation structures and typography dynamics below</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-950">
            Realtime Applied
          </span>
        </div>

        {/* Triple Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column A: Text/Typography Selection Option */}
          <div className="p-5 rounded-2xl bg-zinc-900/25 border border-zinc-900 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Type className="w-5 h-5 text-[#5f5df5]" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">Animated Typography Mood</h4>
                  <p className="text-[11px] text-zinc-500">Real-time typographic swap (affects whole viewport heading styles)</p>
                </div>
              </div>

              <GlowSegmentedControl
                options={mood_options}
                selectedValue={typographyMood}
                onChange={(val) => setTypographyMood(val as "default" | "tech" | "lux" | "retro")}
                themeColor="indigo"
              />
            </div>

            <div className="p-3 bg-black border border-zinc-900 rounded-xl mt-3">
              <p className="text-[10px] text-zinc-400 font-bold uppercase mb-1">Live Typography preview (Hover me!):</p>
              <div className="p-1">
                <HoverInteractiveText 
                  text="Hover each letter here beautifully" 
                  className="text-sm font-bold tracking-tight text-white" 
                  mood={typographyMood}
                />
              </div>
            </div>
          </div>

          {/* Column B: Infinite Layout / Navigation Bar customization options */}
          <div className="p-5 rounded-2xl bg-zinc-900/25 border border-zinc-900 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Layout className="w-5 h-5 text-[#5f5df5]" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">Interactive Navigation Layout</h4>
                  <p className="text-[11px] text-zinc-500">Unlocks custom magnetic dock menu at the absolute bottom margin</p>
                </div>
              </div>

              <GlowSegmentedControl
                options={nav_options}
                selectedValue={navTheme}
                onChange={(val) => setNavTheme(val as "standard" | "cyberdock")}
                themeColor="indigo"
              />
            </div>

            <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-3 bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-950">
              <Zap className="w-4 h-4 text-[#5f5df5] flex-shrink-0" />
              <span>Choosing <strong className="text-indigo-400">"Apple floating dock"</strong> activates the magnetic bottom dock overlay for frictionless navigation tracking. try it out!</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
