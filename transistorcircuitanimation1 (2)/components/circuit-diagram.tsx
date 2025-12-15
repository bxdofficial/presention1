"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Battery Component
function Battery({
  x,
  y,
  highlight,
  glowing,
  animationPhase,
}: {
  x: number
  y: number
  highlight?: boolean
  glowing?: boolean
  animationPhase?: number
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-20"
        y="-55"
        width="40"
        height="110"
        fill="rgba(0,0,0,0.5)"
        rx="4"
        stroke={highlight ? "#22d3ee" : "#6b7280"}
        strokeWidth={highlight ? "3" : "1"}
        filter={highlight ? "url(#glow-cyan)" : ""}
      />
      {/* Positive terminal */}
      <line x1="-12" y1="-55" x2="12" y2="-55" stroke="#f87171" strokeWidth="4" />
      <text x="25" y="-50" className="fill-red-400 text-xs font-mono font-bold">
        +
      </text>
      {/* Negative terminal */}
      <line x1="-8" y1="55" x2="8" y2="55" stroke="#60a5fa" strokeWidth="2" />
      <text x="25" y="60" className="fill-blue-400 text-xs font-mono font-bold">
        −
      </text>
      {/* Battery body */}
      <rect x="-15" y="-45" width="30" height="90" fill="#1f2937" rx="2" />
      <rect
        x="-12"
        y="-42"
        width="24"
        height="84"
        fill={glowing ? "rgba(250,204,21,0.3)" : "rgba(34,211,238,0.1)"}
        rx="1"
      />
      {/* Voltage label */}
      <text x="0" y="5" textAnchor="middle" className="fill-white text-xs font-mono font-bold">
        12V
      </text>
      {/* Highlight label */}
      {highlight && (
        <text x="0" y="80" textAnchor="middle" className="fill-cyan-400 text-sm font-bold animate-pulse">
          BATTERY
        </text>
      )}
    </g>
  )
}

// LED Component
function LED({
  x,
  y,
  active,
  highlight,
  animationPhase,
}: { x: number; y: number; active?: boolean; highlight?: boolean; animationPhase?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* LED glow effect when active */}
      {active && (
        <circle cx="0" cy="0" r="25" fill="rgba(250,204,21,0.4)" filter="url(#glow-led)" className="animate-pulse" />
      )}
      {/* Highlight ring */}
      {highlight && !active && (
        <circle
          cx="0"
          cy="0"
          r="30"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeDasharray="4,4"
          className="animate-pulse"
        />
      )}
      {/* LED body - triangle pointing down */}
      <polygon
        points="-12,-15 12,-15 0,15"
        fill={active ? "#facc15" : "#374151"}
        stroke={highlight ? "#22d3ee" : active ? "#fbbf24" : "#6b7280"}
        strokeWidth={highlight ? "3" : "2"}
      />
      {/* LED bar at bottom */}
      <line
        x1="-12"
        y1="18"
        x2="12"
        y2="18"
        stroke={active ? "#facc15" : highlight ? "#22d3ee" : "#6b7280"}
        strokeWidth="3"
      />
      {/* Arrow indicators */}
      {active && (
        <>
          <line x1="18" y1="-8" x2="28" y2="-18" stroke="#facc15" strokeWidth="1.5" />
          <polygon points="28,-18 24,-14 30,-12" fill="#facc15" />
          <line x1="22" y1="2" x2="32" y2="-8" stroke="#facc15" strokeWidth="1.5" />
          <polygon points="32,-8 28,-4 34,-2" fill="#facc15" />
        </>
      )}
      {/* Highlight label */}
      {highlight && (
        <text x="45" y="5" className="fill-cyan-400 text-sm font-bold animate-pulse">
          LED
        </text>
      )}
    </g>
  )
}

// Resistor Component
function Resistor({
  x,
  y,
  horizontal,
  highlight,
  label,
  sublabel,
}: {
  x: number
  y: number
  horizontal?: boolean
  highlight?: boolean
  label?: string
  sublabel?: string
}) {
  const color = highlight ? "#22d3ee" : "#9ca3af"
  return (
    <g transform={`translate(${x}, ${y}) ${horizontal ? "rotate(90)" : ""}`}>
      {/* Zigzag resistor shape */}
      <path
        d={`M 0,-35 L 0,-25 L -8,-20 L 8,-10 L -8,0 L 8,10 L -8,20 L 0,25 L 0,35`}
        fill="none"
        stroke={color}
        strokeWidth={highlight ? "3" : "2"}
        filter={highlight ? "url(#glow-cyan)" : ""}
      />
      {/* Labels */}
      {label && (
        <text
          x={horizontal ? "0" : "20"}
          y={horizontal ? "-20" : "5"}
          className={cn("text-xs font-mono font-bold", highlight ? "fill-cyan-400" : "fill-gray-400")}
        >
          {label}
        </text>
      )}
      {sublabel && (
        <text
          x={horizontal ? "0" : "20"}
          y={horizontal ? "-8" : "18"}
          className={cn("text-[10px] font-mono", highlight ? "fill-cyan-400/70" : "fill-gray-500")}
        >
          {sublabel}
        </text>
      )}
    </g>
  )
}

// NPN Transistor Component
function NPNTransistor({
  x,
  y,
  highlight,
  showLabels,
  saturation,
  cutoff,
  active,
}: {
  x: number
  y: number
  highlight?: boolean
  showLabels?: boolean
  saturation?: boolean
  cutoff?: boolean
  active?: boolean
}) {
  const baseColor = highlight ? "#22d3ee" : "#9ca3af"
  const activeColor = active && !cutoff ? "#facc15" : baseColor
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Transistor circle */}
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="rgba(0,0,0,0.5)"
        stroke={highlight ? "#22d3ee" : "#6b7280"}
        strokeWidth={highlight ? "3" : "1"}
        filter={highlight ? "url(#glow-cyan)" : ""}
      />
      {/* Base vertical line */}
      <line x1="-25" y1="-25" x2="-25" y2="25" stroke={baseColor} strokeWidth="3" />
      {/* Base connection */}
      <line x1="-55" y1="0" x2="-25" y2="0" stroke={baseColor} strokeWidth="2" />
      {/* Collector line */}
      <line x1="-25" y1="-15" x2="0" y2="-45" stroke={activeColor} strokeWidth="2" />
      {/* Emitter line with arrow */}
      <line x1="-25" y1="15" x2="0" y2="45" stroke={activeColor} strokeWidth="2" />
      {/* Emitter arrow */}
      <polygon points="0,45 -8,35 -3,33" fill={activeColor} />
      {/* Labels */}
      {showLabels && (
        <>
          <text x="-60" y="5" className="fill-cyan-400 text-xs font-mono font-bold">
            B
          </text>
          <text x="10" y="-40" className="fill-yellow-400 text-xs font-mono font-bold">
            C
          </text>
          <text x="10" y="50" className="fill-yellow-400 text-xs font-mono font-bold">
            E
          </text>
          <text x="-15" y="5" className="fill-white text-[10px] font-mono">
            NPN
          </text>
        </>
      )}
      {/* Status indicator */}
      {(saturation || cutoff) && (
        <circle cx="20" cy="0" r="8" fill={cutoff ? "#6b7280" : "#22c55e"} className={cn(!cutoff && "animate-pulse")} />
      )}
      {/* Highlight label */}
      {highlight && (
        <text x="55" y="5" className="fill-cyan-400 text-sm font-bold animate-pulse">
          TRANSISTOR
        </text>
      )}
    </g>
  )
}

// Capacitor Component
function Capacitor({ x, y, highlight }: { x: number; y: number; highlight?: boolean }) {
  const color = highlight ? "#60a5fa" : "#6b7280"
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="-40" x2="0" y2="-8" stroke={color} strokeWidth="2" />
      <line x1="-15" y1="-8" x2="15" y2="-8" stroke={color} strokeWidth="3" />
      <line x1="-15" y1="8" x2="15" y2="8" stroke={color} strokeWidth="3" />
      <line x1="0" y1="8" x2="0" y2="40" stroke={color} strokeWidth="2" />
    </g>
  )
}

// Voltage Indicator Component
function VoltageIndicator({
  x,
  y,
  label,
  value,
  unit,
  color,
  active,
}: {
  x: number
  y: number
  label: string
  value: number
  unit: string
  color: string
  active?: boolean
}) {
  return (
    <g transform={`translate(${x}, ${y})`} className={cn(!active && "opacity-50")}>
      <rect x="-25" y="-12" width="50" height="24" fill="rgba(0,0,0,0.7)" rx="4" stroke={color} strokeWidth="1" />
      <text x="0" y="-1" textAnchor="middle" style={{ fill: color }} className="text-[9px] font-mono">
        {label}
      </text>
      <text x="0" y="9" textAnchor="middle" className="fill-white text-[10px] font-mono font-bold">
        {value.toFixed(1)}
        {unit}
      </text>
    </g>
  )
}

// Current Dot Component (animated)
function CurrentDot({
  x1,
  y1,
  x2,
  y2,
  phase,
  color,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  phase: number
  color: string
}) {
  const progress = (phase % 100) / 100
  const cx = x1 + (x2 - x1) * progress
  const cy = y1 + (y2 - y1) * progress
  return <circle cx={cx} cy={cy} r="4" fill={color} filter="url(#glow-yellow)" />
}

// Electron Dot Component (animated, opposite direction)
function ElectronDot({ x1, y1, x2, y2, phase }: { x1: number; y1: number; x2: number; y2: number; phase: number }) {
  const progress = (phase % 100) / 100
  const cx = x1 + (x2 - x1) * progress
  const cy = y1 + (y2 - y1) * progress
  return <circle cx={cx} cy={cy} r="3" fill="#60a5fa" opacity="0.7" />
}

// Waveform Component
function Waveform({
  x,
  y,
  amplitude,
  label,
  color,
  inverted,
}: {
  x: number
  y: number
  amplitude: number
  label: string
  color: string
  inverted?: boolean
}) {
  const sign = inverted ? -1 : 1
  const points = Array.from({ length: 60 }, (_, i) => {
    const px = x + i
    const py = y + sign * Math.sin((i / 60) * 4 * Math.PI) * amplitude
    return `${px},${py}`
  }).join(" ")

  return (
    <g>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
      <text
        x={x + 25}
        y={y + amplitude + 15}
        textAnchor="middle"
        style={{ fill: color }}
        className="text-[9px] font-mono"
      >
        {label}
      </text>
    </g>
  )
}

interface CircuitDiagramProps {
  currentScene: number
}

export function CircuitDiagram({ currentScene }: CircuitDiagramProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Scene mapping:
  // 1: Overview, 2: Battery, 3: Wire, 4: Rc, 5: LED, 6: Transistor
  // 7: Rb, 8: Input, 9: Ground, 10: OFF state, 11: ON state
  // 12: Amplification, 13: Transition, 14: Timing, 15: Summary

  const isCutoffState = currentScene === 10
  const isOnState = currentScene >= 11 && currentScene !== 10
  const showCurrentFlow = isOnState
  const isTransistorActive = showCurrentFlow

  const voltageValues = {
    vcc: 12,
    vin: 5,
    vbe: showCurrentFlow ? 0.7 : 0,
    vled: 2,
    vce: isCutoffState ? 12 : showCurrentFlow ? 0.2 : 12,
    vout: isCutoffState ? 12 : showCurrentFlow ? 0.2 : 0,
  }

  const currentValues = {
    ib: showCurrentFlow ? 0.43 : 0,
    ic: showCurrentFlow ? 43 : 0,
  }

  return (
    <div className="w-full h-full relative">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main Circuit SVG */}
      <svg viewBox="0 0 750 520" className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-led" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================== SLIDE 2: BATTERY (Power Source) ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 2 ? "opacity-100" : "opacity-30")}>
          <Battery
            x={60}
            y={240}
            highlight={currentScene === 2}
            glowing={showCurrentFlow}
            animationPhase={animationPhase}
          />
        </g>

        {/* ==================== SLIDE 3: POWER DISTRIBUTION WIRE ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 3 ? "opacity-100" : "opacity-30")}>
          {/* Positive rail from battery */}
          <line
            x1={60}
            y1={185}
            x2={60}
            y2={50}
            stroke={currentScene === 3 ? "#22d3ee" : showCurrentFlow ? "#f87171" : "#374151"}
            strokeWidth={currentScene === 3 ? "4" : "3"}
            filter={currentScene === 3 ? "url(#glow-cyan)" : ""}
            className={cn(showCurrentFlow && "animate-pulse")}
          />
          <line
            x1={60}
            y1={50}
            x2={600}
            y2={50}
            stroke={currentScene === 3 ? "#22d3ee" : showCurrentFlow ? "#f87171" : "#374151"}
            strokeWidth={currentScene === 3 ? "4" : "3"}
            filter={currentScene === 3 ? "url(#glow-cyan)" : ""}
          />
          <text
            x={330}
            y={35}
            textAnchor="middle"
            className={cn("text-base font-mono font-bold", currentScene === 3 ? "fill-cyan-400" : "fill-red-400")}
          >
            +Vcc (12V)
          </text>
          {/* Wire highlight label */}
          {currentScene === 3 && (
            <text x={200} y={70} className="fill-cyan-400 text-sm font-bold animate-pulse">
              POWER WIRE
            </text>
          )}
        </g>

        {/* ==================== SLIDE 9: GROUND CONNECTION ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 3 ? "opacity-100" : "opacity-30")}>
          <line
            x1={60}
            y1={295}
            x2={60}
            y2={450}
            stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"}
            strokeWidth={currentScene === 9 ? "4" : "3"}
            filter={currentScene === 9 ? "url(#glow-cyan)" : ""}
          />
          <line
            x1={60}
            y1={450}
            x2={600}
            y2={450}
            stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"}
            strokeWidth={currentScene === 9 ? "4" : "3"}
            filter={currentScene === 9 ? "url(#glow-cyan)" : ""}
          />
          {/* Ground symbol */}
          <g transform="translate(330, 450)">
            <line x1={0} y1={0} x2={0} y2={12} stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"} strokeWidth="2" />
            <line
              x1={-18}
              y1={12}
              x2={18}
              y2={12}
              stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"}
              strokeWidth="3"
            />
            <line
              x1={-12}
              y1={18}
              x2={12}
              y2={18}
              stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"}
              strokeWidth="2"
            />
            <line x1={-6} y1={24} x2={6} y2={24} stroke={currentScene === 9 ? "#22d3ee" : "#60a5fa"} strokeWidth="1" />
          </g>
          <text
            x={330}
            y={490}
            textAnchor="middle"
            className={cn("text-sm font-mono", currentScene === 9 ? "fill-cyan-400 font-bold" : "fill-blue-400")}
          >
            GND (0V)
          </text>
          {/* Ground highlight label */}
          {currentScene === 9 && (
            <text x={330} y={510} textAnchor="middle" className="fill-cyan-400 text-sm font-bold animate-pulse">
              GROUND CONNECTION
            </text>
          )}
        </g>

        {/* ==================== SLIDE 4: COLLECTOR RESISTOR (Rc) ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 4 ? "opacity-100" : "opacity-30")}>
          <line x1={330} y1={50} x2={330} y2={80} stroke={showCurrentFlow ? "#facc15" : "#6b7280"} strokeWidth="2" />
          <line x1={330} y1={150} x2={330} y2={165} stroke={showCurrentFlow ? "#facc15" : "#6b7280"} strokeWidth="2" />
          <Resistor x={330} y={200} highlight={currentScene === 4} label="Rc" sublabel="1kΩ" />
          <line x1={330} y1={235} x2={330} y2={255} stroke={showCurrentFlow ? "#facc15" : "#6b7280"} strokeWidth="2" />
          {/* Rc highlight label */}
          {currentScene === 4 && (
            <text x={380} y={200} className="fill-cyan-400 text-sm font-bold animate-pulse">
              COLLECTOR RESISTOR
            </text>
          )}
        </g>

        {/* ==================== SLIDE 5: LED INDICATOR ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 5 ? "opacity-100" : "opacity-30")}>
          <LED
            x={330}
            y={115}
            active={showCurrentFlow && !isCutoffState}
            highlight={currentScene === 5}
            animationPhase={animationPhase}
          />
        </g>

        {/* ==================== SLIDE 6: NPN TRANSISTOR ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 6 ? "opacity-100" : "opacity-30")}>
          <NPNTransistor
            x={330}
            y={310}
            highlight={currentScene === 6}
            showLabels={currentScene >= 6}
            saturation={showCurrentFlow}
            cutoff={isCutoffState}
            active={isTransistorActive}
          />
        </g>

        {/* ==================== EMITTER TO GROUND ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 6 ? "opacity-100" : "opacity-30")}>
          <line x1={330} y1={365} x2={330} y2={450} stroke={showCurrentFlow ? "#facc15" : "#6b7280"} strokeWidth="2" />
        </g>

        {/* ==================== SLIDE 7: BASE RESISTOR (Rb) ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 7 ? "opacity-100" : "opacity-30")}>
          <line
            x1={138}
            y1={310}
            x2={170}
            y2={310}
            stroke={currentScene === 7 ? "#22d3ee" : showCurrentFlow ? "#22d3ee" : "#6b7280"}
            strokeWidth={currentScene === 7 ? "3" : "2"}
          />
          <Resistor x={210} y={310} horizontal highlight={currentScene === 7} label="Rb" sublabel="10kΩ" />
          <line
            x1={250}
            y1={310}
            x2={275}
            y2={310}
            stroke={currentScene === 7 ? "#22d3ee" : showCurrentFlow ? "#22d3ee" : "#6b7280"}
            strokeWidth={currentScene === 7 ? "3" : "2"}
          />
          {/* Rb highlight label */}
          {currentScene === 7 && (
            <text x={210} y={280} textAnchor="middle" className="fill-cyan-400 text-sm font-bold animate-pulse">
              BASE RESISTOR
            </text>
          )}
        </g>

        {/* ==================== SLIDE 8: INPUT SIGNAL (Vin) ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 8 ? "opacity-100" : "opacity-0")}>
          <g transform="translate(110, 310)">
            <circle
              cx={0}
              cy={0}
              r={28}
              fill="rgba(34,211,238,0.1)"
              stroke={currentScene === 8 ? "#22d3ee" : "#22d3ee"}
              strokeWidth={currentScene === 8 ? "3" : "2"}
              filter={currentScene === 8 ? "url(#glow-cyan)" : ""}
            />
            <text x={0} y={-5} textAnchor="middle" className="fill-cyan-400 text-sm font-mono font-bold">
              Vin
            </text>
            <text x={0} y={10} textAnchor="middle" className="fill-cyan-400/70 text-xs font-mono">
              (5V)
            </text>
            <circle cx={28} cy={0} r={3} fill="#22d3ee" />
          </g>
          {/* Input highlight label */}
          {currentScene === 8 && (
            <text x={110} y={260} textAnchor="middle" className="fill-cyan-400 text-sm font-bold animate-pulse">
              INPUT SIGNAL
            </text>
          )}

          {/* Input ground connection */}
          <line
            x1={110}
            y1={338}
            x2={110}
            y2={450}
            stroke={currentScene === 8 ? "#22d3ee" : "#22d3ee"}
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <g transform="translate(110, 450)">
            <line x1={-8} y1={0} x2={8} y2={0} stroke="#60a5fa" strokeWidth="2" />
            <line x1={-5} y1={4} x2={5} y2={4} stroke="#60a5fa" strokeWidth="1.5" />
            <line x1={-2} y1={8} x2={2} y2={8} stroke="#60a5fa" strokeWidth="1" />
          </g>
          <g transform="translate(110, 380)">
            <text x={15} y={0} className="fill-cyan-400 text-xs font-mono">
              +
            </text>
            <text x={15} y={55} className="fill-blue-400 text-xs font-mono">
              −
            </text>
          </g>
        </g>

        {/* ==================== FILTERING CAPACITOR ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 4 ? "opacity-40" : "opacity-20")}>
          <line x1={540} y1={50} x2={540} y2={210} stroke="#6b7280" strokeWidth="2" />
          <Capacitor x={540} y={250} highlight={false} />
          <line x1={540} y1={290} x2={540} y2={450} stroke="#6b7280" strokeWidth="2" />
          <text x={560} y={250} className="fill-blue-400 text-xs font-mono">
            C1
          </text>
          <text x={560} y={265} className="fill-blue-400/60 text-[9px] font-mono">
            100µF
          </text>
        </g>

        {/* ==================== OUTPUT ==================== */}
        <g className={cn("transition-all duration-500", currentScene >= 11 ? "opacity-100" : "opacity-0")}>
          <line x1={365} y1={255} x2={480} y2={255} stroke="#facc15" strokeWidth="2" filter="url(#glow-yellow)" />
          <circle
            cx={520}
            cy={255}
            r={30}
            fill="rgba(250,204,21,0.1)"
            stroke="#facc15"
            strokeWidth="2"
            filter="url(#glow-yellow)"
          />
          <text x={520} y={250} textAnchor="middle" className="fill-yellow-400 text-sm font-mono font-bold">
            Vout
          </text>
          <text x={520} y={267} textAnchor="middle" className="fill-yellow-300 text-[10px] font-mono">
            (Output)
          </text>
        </g>

        {/* ==================== ANIMATED CURRENT FLOW (Slides 11+) ==================== */}
        {showCurrentFlow && (
          <>
            <CurrentDot x1={60} y1={185} x2={60} y2={50} phase={animationPhase} color="#f87171" />
            <CurrentDot x1={60} y1={50} x2={330} y2={50} phase={animationPhase + 20} color="#f87171" />
            <CurrentDot x1={330} y1={50} x2={330} y2={115} phase={animationPhase + 30} color="#facc15" />
            <CurrentDot x1={330} y1={150} x2={330} y2={200} phase={animationPhase + 40} color="#facc15" />
            <CurrentDot x1={330} y1={235} x2={330} y2={260} phase={animationPhase + 50} color="#facc15" />
            <CurrentDot x1={330} y1={365} x2={330} y2={450} phase={animationPhase + 70} color="#facc15" />
            <ElectronDot x1={140} y1={310} x2={275} y2={310} phase={animationPhase} />
            <ElectronDot x1={330} y1={450} x2={330} y2={365} phase={animationPhase + 30} />
            <g className="animate-pulse">
              <text x={210} y={295} className="fill-cyan-400 text-sm font-mono font-bold">
                Ib
              </text>
              <text x={350} y={185} className="fill-yellow-400 text-sm font-mono font-bold">
                Ic
              </text>
            </g>
          </>
        )}

        {/* ==================== SLIDE 10: CUTOFF STATE INDICATOR ==================== */}
        {currentScene === 10 && (
          <g transform="translate(20, 380)">
            <rect
              x={0}
              y={0}
              width={130}
              height={100}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#6b7280"
              strokeWidth={1.5}
            />
            <text x={65} y={18} textAnchor="middle" className="fill-gray-400 text-xs font-bold">
              CUTOFF MODE
            </text>
            <text x={65} y={32} textAnchor="middle" className="fill-gray-500 text-[10px]">
              Transistor OFF
            </text>

            <g transform="translate(65, 58)">
              <circle cx={0} cy={0} r={18} fill="rgba(107,114,128,0.3)" stroke="#6b7280" strokeWidth={1.5} />
              <text x={0} y={-2} textAnchor="middle" className="fill-gray-400 text-xs font-bold">
                OFF
              </text>
              <text x={0} y={10} textAnchor="middle" className="fill-gray-500 text-[8px] font-mono">
                Ic = 0
              </text>
            </g>

            <text x={65} y={92} textAnchor="middle" className="fill-gray-500 text-[9px] font-mono">
              LED: OFF | Vce = Vcc
            </text>
          </g>
        )}

        {/* ==================== SLIDE 11: ON STATE INDICATOR ==================== */}
        {currentScene === 11 && (
          <g transform="translate(20, 380)">
            <rect
              x={0}
              y={0}
              width={130}
              height={100}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#22c55e"
              strokeWidth={1.5}
            />
            <text x={65} y={18} textAnchor="middle" className="fill-green-400 text-xs font-bold">
              SATURATION MODE
            </text>
            <text x={65} y={32} textAnchor="middle" className="fill-green-500 text-[10px]">
              Transistor ON
            </text>

            <g transform="translate(65, 58)">
              <circle
                cx={0}
                cy={0}
                r={18}
                fill="rgba(34,197,94,0.3)"
                stroke="#22c55e"
                strokeWidth={1.5}
                className="animate-pulse"
              />
              <text x={0} y={-2} textAnchor="middle" className="fill-green-400 text-xs font-bold">
                ON
              </text>
              <text x={0} y={10} textAnchor="middle" className="fill-green-500 text-[8px] font-mono">
                Ic = max
              </text>
            </g>

            <text x={65} y={92} textAnchor="middle" className="fill-green-500 text-[9px] font-mono">
              LED: ON | Vce ≈ 0.2V
            </text>
          </g>
        )}

        {/* ==================== SLIDE 12: CURRENT AMPLIFICATION ==================== */}
        {currentScene === 12 && (
          <g transform="translate(20, 360)">
            <rect
              x={0}
              y={0}
              width={140}
              height={120}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#facc15"
              strokeWidth={1.5}
            />
            <text x={70} y={16} textAnchor="middle" className="fill-yellow-400 text-[10px] font-bold">
              CURRENT AMPLIFICATION
            </text>

            <g transform="translate(12, 30)">
              <text x={0} y={0} className="fill-cyan-400 text-[9px] font-mono">
                Base Current (Ib):
              </text>
              <text x={0} y={12} className="fill-white text-[10px] font-mono font-bold">
                0.43 mA
              </text>

              <text x={0} y={28} className="fill-yellow-400 text-[9px] font-mono">
                Beta (β):
              </text>
              <text x={0} y={40} className="fill-white text-[10px] font-mono font-bold">
                ≈ 100
              </text>

              <text x={0} y={56} className="fill-green-400 text-[9px] font-mono">
                Collector (Ic):
              </text>
              <text x={0} y={68} className="fill-white text-[10px] font-mono font-bold">
                43 mA
              </text>
            </g>

            <text x={70} y={110} textAnchor="middle" className="fill-yellow-300 text-[9px] font-mono font-bold">
              Ic = β × Ib
            </text>
          </g>
        )}

        {/* ==================== SLIDE 13: TRANSITION ANALYSIS ==================== */}
        {currentScene === 13 && (
          <g transform="translate(20, 350)">
            <rect
              x={0}
              y={0}
              width={150}
              height={130}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#22d3ee"
              strokeWidth={1.5}
            />
            <text x={75} y={16} textAnchor="middle" className="fill-cyan-400 text-[10px] font-bold">
              TRANSITION ANALYSIS
            </text>

            {/* Transition stages */}
            <g transform="translate(10, 30)">
              <circle
                cx={6}
                cy={0}
                r={4}
                fill={animationPhase < 25 ? "#22d3ee" : "#374151"}
                className={animationPhase < 25 ? "animate-pulse" : ""}
              />
              <text x={16} y={3} className="fill-white/80 text-[8px] font-mono">
                Vin = 0V (Cutoff)
              </text>
            </g>
            <g transform="translate(10, 48)">
              <circle
                cx={6}
                cy={0}
                r={4}
                fill={animationPhase >= 25 && animationPhase < 50 ? "#facc15" : "#374151"}
                className={animationPhase >= 25 && animationPhase < 50 ? "animate-pulse" : ""}
              />
              <text x={16} y={3} className="fill-white/80 text-[8px] font-mono">
                Vin rising (Transition)
              </text>
            </g>
            <g transform="translate(10, 66)">
              <circle
                cx={6}
                cy={0}
                r={4}
                fill={animationPhase >= 50 && animationPhase < 75 ? "#22c55e" : "#374151"}
                className={animationPhase >= 50 && animationPhase < 75 ? "animate-pulse" : ""}
              />
              <text x={16} y={3} className="fill-white/80 text-[8px] font-mono">
                Vbe = 0.7V (Active)
              </text>
            </g>
            <g transform="translate(10, 84)">
              <circle
                cx={6}
                cy={0}
                r={4}
                fill={animationPhase >= 75 ? "#ef4444" : "#374151"}
                className={animationPhase >= 75 ? "animate-pulse" : ""}
              />
              <text x={16} y={3} className="fill-white/80 text-[8px] font-mono">
                Full Saturation
              </text>
            </g>

            {/* Progress bar */}
            <rect x={10} y={100} width={130} height={6} fill="#1f2937" rx={3} />
            <rect x={10} y={100} width={130 * (animationPhase / 100)} height={6} fill="#22d3ee" rx={3} />
            <text x={75} y={118} textAnchor="middle" className="fill-white/60 text-[8px] font-mono">
              {Math.round(animationPhase)}% Transition
            </text>
          </g>
        )}

        {/* ==================== SLIDE 14: TIMING PARAMETERS ==================== */}
        {currentScene === 14 && (
          <g transform="translate(20, 330)">
            <rect
              x={0}
              y={0}
              width={160}
              height={150}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#22d3ee"
              strokeWidth={1.5}
            />
            <text x={80} y={16} textAnchor="middle" className="fill-cyan-400 text-[10px] font-bold">
              TIMING PARAMETERS
            </text>

            {/* Timing diagram */}
            <g transform="translate(15, 30)">
              {/* Input signal */}
              <text x={0} y={0} className="fill-cyan-400 text-[8px] font-mono">
                Vin
              </text>
              <path d="M 25 5 L 45 5 L 45 -8 L 85 -8 L 85 5 L 105 5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />

              {/* Output signal */}
              <text x={0} y={40} className="fill-yellow-400 text-[8px] font-mono">
                Vout
              </text>
              <path
                d="M 25 45 L 52 45 L 52 32 L 78 32 L 78 45 L 105 45"
                fill="none"
                stroke="#facc15"
                strokeWidth="1.5"
              />

              {/* Timing markers */}
              <line x1={45} y1={10} x2={45} y2={55} stroke="#ffffff30" strokeWidth={1} strokeDasharray="2,2" />
              <line x1={52} y1={10} x2={52} y2={55} stroke="#ffffff30" strokeWidth={1} strokeDasharray="2,2" />
              <line x1={78} y1={10} x2={78} y2={55} stroke="#ffffff30" strokeWidth={1} strokeDasharray="2,2" />
              <line x1={85} y1={10} x2={85} y2={55} stroke="#ffffff30" strokeWidth={1} strokeDasharray="2,2" />

              {/* Time labels */}
              <text x={48} y={65} textAnchor="middle" className="fill-green-400 text-[7px] font-mono">
                td
              </text>
              <text x={65} y={65} textAnchor="middle" className="fill-green-400 text-[7px] font-mono">
                tr
              </text>
              <text x={81} y={65} textAnchor="middle" className="fill-red-400 text-[7px] font-mono">
                ts
              </text>
              <text x={95} y={65} textAnchor="middle" className="fill-red-400 text-[7px] font-mono">
                tf
              </text>
            </g>

            {/* Legend */}
            <g transform="translate(15, 110)">
              <rect x={0} y={0} width={8} height={8} fill="#22c55e" />
              <text x={12} y={7} className="fill-white/70 text-[7px] font-mono">
                t_on = td + tr
              </text>
              <rect x={0} y={14} width={8} height={8} fill="#ef4444" />
              <text x={12} y={21} className="fill-white/70 text-[7px] font-mono">
                t_off = ts + tf
              </text>
            </g>
          </g>
        )}

        {/* ==================== SLIDE 15: SUMMARY EQUATIONS ==================== */}
        {currentScene === 15 && (
          <g transform="translate(20, 340)">
            <rect
              x={0}
              y={0}
              width={155}
              height={140}
              fill="rgba(0,0,0,0.85)"
              rx={6}
              stroke="#22d3ee"
              strokeWidth={1.5}
            />
            <text x={77} y={16} textAnchor="middle" className="fill-cyan-400 text-[10px] font-bold">
              CIRCUIT SUMMARY
            </text>

            <g transform="translate(10, 30)">
              <text x={0} y={0} className="fill-white/80 text-[9px] font-mono">
                Power Supply:
              </text>
              <text x={0} y={12} className="fill-cyan-400 text-[9px] font-mono font-bold">
                Vcc = 12V
              </text>

              <text x={0} y={28} className="fill-white/80 text-[9px] font-mono">
                Base Current:
              </text>
              <text x={0} y={40} className="fill-cyan-400 text-[9px] font-mono font-bold">
                Ib = (Vin-Vbe)/Rb
              </text>

              <text x={0} y={56} className="fill-white/80 text-[9px] font-mono">
                Collector Current:
              </text>
              <text x={0} y={68} className="fill-yellow-400 text-[9px] font-mono font-bold">
                Ic = β × Ib = 43mA
              </text>

              <text x={0} y={84} className="fill-white/80 text-[9px] font-mono">
                Current Gain:
              </text>
              <text x={0} y={96} className="fill-green-400 text-[9px] font-mono font-bold">
                β = Ic/Ib ≈ 100
              </text>
            </g>

            <text x={77} y={132} textAnchor="middle" className="fill-white/60 text-[8px] font-mono">
              Small input → Large output
            </text>
          </g>
        )}

        {/* ==================== VOLTAGE/CURRENT INDICATORS ==================== */}
        {currentScene >= 10 && (
          <g className="fade-in">
            <VoltageIndicator
              x={280}
              y={350}
              label="Vbe"
              value={voltageValues.vbe}
              unit="V"
              color="#22d3ee"
              active={showCurrentFlow}
            />
            <VoltageIndicator
              x={380}
              y={310}
              label="Vce"
              value={voltageValues.vce}
              unit="V"
              color="#facc15"
              active={!isCutoffState}
            />
          </g>
        )}
      </svg>
    </div>
  )
}
