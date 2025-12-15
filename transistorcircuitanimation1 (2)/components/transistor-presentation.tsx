"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react"
import { CircuitDiagram } from "@/components/circuit-diagram"
import { cn } from "@/lib/utils"

const teamMembers = [
  { name: "Yousef Khames", color: "#22d3ee", isLead: true },
  { name: "Ahmed Elshaer", color: "#f472b6" },
  { name: "Mohamed Elbhery", color: "#a78bfa" },
  { name: "Moaaz Ali", color: "#34d399" },
  { name: "Ahmed Mokhtar", color: "#fbbf24" },
  { name: "Ahmed Fahem", color: "#f87171" },
  { name: "Hassan Elhlwany", color: "#60a5fa" },
]

const scenes = [
  {
    id: 1,
    title: "Circuit Overview",
    subtitle: "Introduction to NPN Transistor Switch",
    description: "A complete switching circuit using an NPN transistor",
    details: [
      "This circuit demonstrates a basic NPN transistor switch",
      "The transistor acts as an electronic switch controlled by a small base current",
      "Main components: Battery, Resistors (Rb, Rc), NPN Transistor, LED indicator",
      "When activated, a small input signal controls a larger output current",
    ],
    formula: "Ic = β × Ib",
    note: "Principle: A small base current controls a large collector current",
  },
  {
    id: 2,
    title: "The Battery",
    subtitle: "Power Supply Unit",
    description: "DC voltage source providing energy to the entire circuit",
    details: [
      "Vcc = +12V DC power supply",
      "The positive terminal connects to the collector circuit",
      "Provides the main power for all circuit operations",
      "Ground (GND) completes the circuit path",
    ],
    formula: "P = V × I",
    note: "A stable voltage is essential for consistent transistor operation",
  },
  {
    id: 3,
    title: "Power Distribution Wire",
    subtitle: "From Battery to Circuit",
    description: "Connecting the power source to the main circuit",
    details: [
      "Wire carries +12V from battery positive terminal",
      "Low resistance path for current flow",
      "Connects to the collector resistor Rc",
      "Forms the main power rail of the circuit",
    ],
    formula: "V = I × R (wire)",
    note: "Wire resistance is negligible but important in high-current applications",
  },
  {
    id: 4,
    title: "Collector Resistor (Rc)",
    subtitle: "Current Limiting Resistor",
    description: "Controls the maximum collector current and protects the LED",
    details: [
      "Rc = 470Ω limits current through the collector",
      "Protects the LED from excessive current",
      "Determines the voltage drop when transistor is ON",
      "Sets the operating point of the transistor",
    ],
    formula: "Ic(max) = (Vcc - Vce - Vled) / Rc",
    note: "Rc value is chosen based on desired LED brightness and transistor ratings",
  },
  {
    id: 5,
    title: "LED Indicator",
    subtitle: "Visual Output Device",
    description: "Shows the ON/OFF state of the transistor switch",
    details: [
      "LED connected in series with collector circuit",
      "Lights up when transistor is ON (saturated)",
      "Remains OFF when transistor is in cutoff",
      "Forward voltage drop ≈ 2V (yellow LED)",
    ],
    formula: "I_LED = (Vcc - Vled - Vce) / Rc ≈ 20mA",
    note: "LED current must be within safe operating limits (typically 10-20mA)",
  },
  {
    id: 6,
    title: "NPN Transistor",
    subtitle: "The Electronic Switch",
    description: "Three-terminal device that controls current flow",
    details: [
      "Collector (C): Receives current from Vcc through Rc",
      "Base (B): Control terminal - small current here controls large current",
      "Emitter (E): Connected to ground, current exits here",
      "Arrow pointing outward indicates NPN type",
    ],
    formula: "Ie = Ic + Ib",
    note: "NPN structure: N-type emitter, P-type base, N-type collector",
  },
  {
    id: 7,
    title: "Base Resistor (Rb)",
    subtitle: "Input Current Limiter",
    description: "Controls the base current to prevent transistor damage",
    details: [
      "Rb = 10kΩ limits base current to safe levels",
      "Connects input signal to transistor base",
      "Determines switching threshold",
      "Ensures proper saturation when input is HIGH",
    ],
    formula: "Ib = (Vin - Vbe) / Rb = (5V - 0.7V) / 10kΩ = 0.43mA",
    note: "0.7V is the forward voltage drop of the base-emitter junction (silicon)",
  },
  {
    id: 8,
    title: "Input Signal",
    subtitle: "Control Voltage",
    description: "The signal that turns the transistor ON or OFF",
    details: [
      "Vin controls the state of the transistor",
      "When Vin > 0.7V: Transistor turns ON",
      "When Vin = 0V: Transistor turns OFF",
      "Typical input: 0V (OFF) or 5V (ON)",
    ],
    formula: "Vin > Vbe(threshold) → Transistor ON",
    note: "Input can come from a microcontroller, sensor, or another circuit",
  },
  {
    id: 9,
    title: "Ground Connection",
    subtitle: "Return Path",
    description: "Completes the circuit by providing current return path",
    details: [
      "Ground (GND) is the reference point (0V)",
      "Emitter connects to ground",
      "All currents return to battery through ground",
      "Essential for circuit operation",
    ],
    formula: "Kirchhoff: ΣI(in) = ΣI(out)",
    note: "A solid ground connection is critical for stable circuit operation",
  },
  {
    id: 10,
    title: "Current Flow: OFF State",
    subtitle: "Cutoff Mode",
    description: "No current flows when input signal is LOW",
    details: [
      "Vin = 0V: No base current (Ib = 0)",
      "Base-Emitter junction is not forward biased",
      "Collector current Ic ≈ 0",
      "LED remains OFF, Vce ≈ Vcc",
    ],
    formula: "OFF State: Ib = 0 → Ic = 0 → LED OFF",
    note: "Transistor acts like an open switch in cutoff mode",
  },
  {
    id: 11,
    title: "Current Flow: ON State",
    subtitle: "Saturation Mode",
    description: "Maximum current flows when input signal is HIGH",
    details: [
      "Vin = 5V: Base current flows (Ib ≈ 0.43mA)",
      "Base-Emitter junction is forward biased",
      "Collector current Ic = β × Ib (amplified)",
      "LED turns ON brightly, Vce(sat) ≈ 0.2V",
    ],
    formula: "ON State: Ic = β × Ib → LED ON",
    note: "Transistor acts like a closed switch in saturation mode",
  },
  {
    id: 12,
    title: "Current Amplification",
    subtitle: "The Beta Factor",
    description: "How a small base current controls a large collector current",
    details: [
      "β (beta) = Current gain factor (typically 100-300)",
      "Ic = β × Ib (collector = beta × base)",
      "Small base current → Large collector current",
      "This is the fundamental principle of transistor amplification",
    ],
    formula: "β = Ic / Ib ≈ 100 → Ic = 100 × 0.43mA = 43mA",
    note: "Beta varies with temperature and transistor model",
  },
  {
    id: 13,
    title: "Transition Analysis",
    subtitle: "Switching Between States",
    description: "How the transistor switches from OFF to ON",
    details: [
      "Phase 1: Vin rises from 0V toward 0.7V",
      "Phase 2: At Vbe ≈ 0.6V, junction starts conducting",
      "Phase 3: At Vbe = 0.7V, transistor enters active region",
      "Phase 4: Vin > 0.7V, transistor reaches saturation",
    ],
    formula: "Vbe(on) ≈ 0.7V | Vce(sat) ≈ 0.2V",
    note: "Transition speed depends on junction capacitance and base current",
  },
  {
    id: 14,
    title: "Timing Parameters",
    subtitle: "Switching Speed",
    description: "Understanding the timing of state transitions",
    details: [
      "Delay time (td): Signal applied to output change begins",
      "Rise time (tr): Output goes from 10% to 90%",
      "Storage time (ts): Time to remove stored charge",
      "Fall time (tf): Output goes from 90% to 10%",
    ],
    formula: "t_on = td + tr | t_off = ts + tf",
    note: "Faster switching requires higher base current and lower capacitance",
  },
  {
    id: 15,
    title: "Circuit Summary",
    subtitle: "Complete Operation Review",
    description: "Putting it all together - the complete NPN transistor switch",
    details: [
      "Battery provides power (Vcc = 12V)",
      "Input signal controls transistor through Rb",
      "Transistor switches LED ON/OFF through Rc",
      "Small input current controls large output current",
    ],
    formula: "Power = Vce × Ic | Gain = Ic / Ib",
    note: "This circuit forms the basis of digital logic gates and amplifiers",
  },
]

function IntroScreen({ onStart }: { onStart: () => void }) {
  const [isPressed, setIsPressed] = useState(false)
  const [phase, setPhase] = useState<"idle" | "pressed" | "transforming" | "moving" | "merging">("idle")
  const [energyPhase, setEnergyPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPhase((prev) => (prev + 1) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (phase !== "idle") return
    setIsPressed(true)
    setPhase("pressed")

    setTimeout(() => {
      setPhase("transforming")
    }, 400)

    setTimeout(() => {
      setPhase("moving")
    }, 1200)

    setTimeout(() => {
      setPhase("merging")
    }, 2200)

    setTimeout(() => {
      onStart()
    }, 3000)
  }

  const memberPositions = [
    { x: 0, y: -160 },
    { x: -280, y: -70 },
    { x: 280, y: -70 },
    { x: -300, y: 80 },
    { x: 300, y: 80 },
    { x: -160, y: 180 },
    { x: 160, y: 180 },
  ]

  const circuitParticles = [
    { type: "resistor", x: 8, y: 15, rotation: 30, scale: 0.6 },
    { type: "transistor", x: 85, y: 12, rotation: -15, scale: 0.5 },
    { type: "capacitor", x: 92, y: 45, rotation: 45, scale: 0.5 },
    { type: "resistor", x: 5, y: 70, rotation: -20, scale: 0.5 },
    { type: "transistor", x: 90, y: 80, rotation: 10, scale: 0.6 },
    { type: "capacitor", x: 12, y: 88, rotation: -35, scale: 0.5 },
    { type: "resistor", x: 88, y: 92, rotation: 25, scale: 0.5 },
    { type: "diode", x: 3, y: 40, rotation: 60, scale: 0.5 },
    { type: "diode", x: 95, y: 60, rotation: -40, scale: 0.5 },
    { type: "ground", x: 7, y: 55, rotation: 0, scale: 0.6 },
    { type: "ground", x: 93, y: 25, rotation: 0, scale: 0.5 },
  ]

  return (
    <div className="h-screen w-screen bg-[#0a0a12] flex items-center justify-center overflow-hidden relative" role="presentation">
      {/* Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="intro-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intro-grid)" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
            style={{
              left: `${10 + i * 4.5}%`,
              top: `${20 + Math.sin(energyPhase * 0.02 + i) * 30}%`,
              opacity: 0.3 + Math.sin(energyPhase * 0.03 + i) * 0.3,
              transform: `scale(${1 + Math.sin(energyPhase * 0.02 + i) * 0.5})`,
            }}
          />
        ))}

        {circuitParticles.map((particle, i) => (
          <svg
            key={`circuit-particle-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `rotate(${particle.rotation + Math.sin(energyPhase * 0.01 + i) * 10}deg) scale(${particle.scale})`,
              transition: "transform 0.5s ease-out",
            }}
            width="60"
            height="60"
            viewBox="0 0 60 60"
          >
            {particle.type === "resistor" && (
              <g stroke="#22d3ee" strokeWidth="2" fill="none">
                <path d="M 5 30 L 15 30 L 18 20 L 24 40 L 30 20 L 36 40 L 42 20 L 45 30 L 55 30" />
              </g>
            )}
            {particle.type === "transistor" && (
              <g stroke="#22d3ee" strokeWidth="2" fill="none">
                <circle cx="30" cy="30" r="18" />
                <line x1="12" y1="30" x2="22" y2="30" />
                <line x1="22" y1="20" x2="22" y2="40" />
                <line x1="22" y1="24" x2="38" y2="16" />
                <line x1="22" y1="36" x2="38" y2="44" />
                <polygon points="34,42 38,44 36,38" fill="#22d3ee" />
              </g>
            )}
            {particle.type === "capacitor" && (
              <g stroke="#22d3ee" strokeWidth="2" fill="none">
                <line x1="10" y1="30" x2="25" y2="30" />
                <line x1="25" y1="15" x2="25" y2="45" />
                <line x1="35" y1="15" x2="35" y2="45" />
                <line x1="35" y1="30" x2="50" y2="30" />
              </g>
            )}
            {particle.type === "diode" && (
              <g stroke="#22d3ee" strokeWidth="2" fill="none">
                <line x1="10" y1="30" x2="22" y2="30" />
                <polygon points="22,20 22,40 38,30" fill="none" stroke="#22d3ee" />
                <line x1="38" y1="20" x2="38" y2="40" />
                <line x1="38" y1="30" x2="50" y2="30" />
              </g>
            )}
            {particle.type === "ground" && (
              <g stroke="#22d3ee" strokeWidth="2" fill="none">
                <line x1="30" y1="10" x2="30" y2="25" />
                <line x1="15" y1="25" x2="45" y2="25" />
                <line x1="20" y1="32" x2="40" y2="32" />
                <line x1="25" y1="39" x2="35" y2="39" />
              </g>
            )}
          </svg>
        ))}
      </div>

      {/* Circuit preview that fades in during merge */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          phase === "merging" ? "opacity-30" : "opacity-0",
        )}
      >
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 700 500" className="w-full max-w-4xl h-auto opacity-20">
            <path d="M 60 180 L 60 310 L 82 310" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 130 310 L 170 310" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.5" />
            <rect
              x="170"
              y="295"
              width="80"
              height="30"
              rx="4"
              stroke="#22d3ee"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <path d="M 250 310 L 320 310" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="380" cy="280" r="40" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative" style={{ width: "700px", height: "450px" }}>
          {teamMembers.map((member, index) => {
            const pos = memberPositions[index]
            return (
              <div
                key={member.name}
                className={cn(
                  "absolute transition-all duration-700",
                  (phase === "transforming" || phase === "moving" || phase === "merging") && "opacity-0 scale-50",
                )}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative flex flex-col items-center">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: member.color,
                        left: `calc(50% + ${Math.cos(((energyPhase + i * 120) * Math.PI) / 180) * 40}px)`,
                        top: `${Math.sin(((energyPhase + i * 120) * Math.PI) / 180) * 15}px`,
                        opacity: 0.7,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}

                  <span
                    className={cn(
                      "font-bold whitespace-nowrap transition-all duration-300 text-center",
                      member.isLead ? "text-5xl" : "text-2xl",
                    )}
                    style={{
                      color: member.color,
                      textShadow: `0 0 30px ${member.color}80, 0 0 60px ${member.color}40`,
                    }}
                  >
                    {member.name}
                  </span>

                  <div
                    className={cn("rounded-full animate-pulse mt-2", member.isLead ? "h-1.5 w-40" : "h-1 w-28")}
                    style={{
                      backgroundColor: member.color,
                      boxShadow: `0 0 20px ${member.color}`,
                    }}
                  />
                </div>
              </div>
            )
          })}

          <div
            className={cn(
              "absolute z-20 transition-all",
              phase === "idle" || phase === "pressed"
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-500"
                : phase === "transforming"
                  ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-800"
                  : phase === "moving"
                    ? "left-[12%] top-[48%] -translate-x-1/2 -translate-y-1/2 duration-1000 scale-75"
                    : "left-[12%] top-[48%] -translate-x-1/2 -translate-y-1/2 duration-500 scale-50 opacity-0",
            )}
          >
            {/* Switch - visible in idle and pressed phases */}
            <button
              className={cn(
                "relative rounded-3xl cursor-pointer transition-all duration-500 leading-7 font-normal w-[182px] h-[223px]",
                "bg-gradient-to-b from-zinc-800 to-zinc-900",
                "border-4 border-zinc-700 shadow-2xl",
                phase === "idle" && "hover:border-cyan-500/50 hover:shadow-cyan-500/20 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400",
                isPressed && "border-cyan-400 shadow-cyan-500/50",
                (phase === "transforming" || phase === "moving" || phase === "merging") && "opacity-0 scale-0",
              )}
              onClick={handleClick}
              aria-label="Turn on the circuit - Start presentation"
              disabled={phase !== "idle"}
            >
              <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-zinc-950 to-black opacity-80" />

              <div className="absolute inset-x-6 top-8 bottom-8 rounded-full bg-gradient-to-b from-zinc-950 to-zinc-800 border border-zinc-700">
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full transition-all duration-500",
                    "bg-gradient-to-b shadow-lg flex items-center justify-center",
                    isPressed
                      ? "top-[calc(100%-6rem)] from-cyan-400 to-cyan-600 shadow-cyan-500/50"
                      : "top-4 from-zinc-600 to-zinc-700 shadow-black/50",
                  )}
                >
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"
                      stroke={isPressed ? "#000" : "#888"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-zinc-500">OFF</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400">ON</span>
            </button>

            {/* Battery - appears during transforming phase */}
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
                phase === "transforming" && "opacity-100 scale-100 duration-800",
                phase === "moving" && "opacity-100 scale-100 duration-500",
                phase === "merging" && "opacity-100 scale-110 duration-500",
                (phase === "idle" || phase === "pressed") && "opacity-0 scale-50 duration-300",
              )}
            >
              <svg
                width="100"
                height="160"
                viewBox="0 0 100 160"
                className={cn(phase === "transforming" && "animate-pulse", phase === "moving" && "animate-bounce")}
              >
                <defs>
                  <filter id="battery-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect
                  x="15"
                  y="25"
                  width="70"
                  height="125"
                  rx="10"
                  fill="#1a1a2e"
                  stroke="#22d3ee"
                  strokeWidth="4"
                  filter="url(#battery-glow)"
                />

                <rect x="32" y="5" width="36" height="24" rx="5" fill="#22d3ee" />

                <text x="50" y="65" fill="#ef4444" fontSize="28" fontWeight="bold" textAnchor="middle">
                  +
                </text>

                <text x="50" y="135" fill="#3b82f6" fontSize="28" fontWeight="bold" textAnchor="middle">
                  −
                </text>

                <rect x="23" y="72" width="54" height="18" rx="3" fill="#22d3ee" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="23" y="95" width="54" height="18" rx="3" fill="#22d3ee" opacity="0.7">
                  <animate
                    attributeName="opacity"
                    values="0.7;0.3;0.7"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.3s"
                  />
                </rect>
                <rect x="23" y="118" width="54" height="18" rx="3" fill="#22d3ee" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.5;0.2;0.5"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.6s"
                  />
                </rect>

                {(phase === "transforming" || phase === "moving") && (
                  <>
                    <circle cx="20" cy="40" r="3" fill="#fbbf24">
                      <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="80" cy="60" r="3" fill="#fbbf24">
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="0.3s"
                        repeatCount="indefinite"
                        begin="0.1s"
                      />
                    </circle>
                    <circle cx="15" cy="100" r="3" fill="#fbbf24">
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="0.3s"
                        repeatCount="indefinite"
                        begin="0.2s"
                      />
                    </circle>
                    <circle cx="85" cy="130" r="3" fill="#fbbf24">
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="0.3s"
                        repeatCount="indefinite"
                        begin="0.15s"
                      />
                    </circle>
                  </>
                )}
              </svg>

              {(phase === "moving" || phase === "merging") && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-cyan-400 font-bold text-lg animate-pulse">
                  Vcc = 12V
                </div>
              )}
            </div>

            <div
              className={cn(
                "absolute -bottom-16 left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wider text-white/80 transition-opacity duration-500 whitespace-nowrap",
                phase !== "idle" && phase !== "pressed" && "opacity-0",
              )}
            >
              TURN <span className="text-cyan-400">ON</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className={cn(
            "mt-8 text-center transition-all duration-700",
            (phase === "transforming" || phase === "moving" || phase === "merging") && "opacity-0 translate-y-10",
          )}
        >
          <h1 className="text-4xl font-bold text-white tracking-wider">
            NPN TRANSISTOR <span className="text-cyan-400">CIRCUIT</span>
          </h1>
          <p className="text-white/50 mt-2 text-sm tracking-wide">Interactive Presentation</p>
        </div>

        {/* Loading indicator during transition */}
        {(phase === "moving" || phase === "merging") && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-cyan-400 text-sm">Loading Circuit...</span>
          </div>
        )}
      </div>
    </div>
  )
}

function OutroScreen({ onRestart }: { onRestart: () => void }) {
  const [isPressed, setIsPressed] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [energyPhase, setEnergyPhase] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThankYou(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPhase((prev) => (prev + 1) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => {
      onRestart()
    }, 800)
  }

  const getPosition = (index: number, total: number, isLead: boolean) => {
    if (isLead) {
      return { x: 0, y: -220 }
    }
    const adjustedIndex = index - 1
    const adjustedTotal = total - 1
    const startAngle = -60
    const endAngle = 240
    const angleRange = endAngle - startAngle
    const angle = startAngle + (adjustedIndex / (adjustedTotal - 1)) * angleRange
    const radius = 280
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius + 30
    return { x, y }
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="outro-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#outro-grid)" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div
        className={cn(
          "absolute top-16 left-1/2 -translate-x-1/2 transition-all duration-1000 text-center z-30",
          showThankYou ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
        )}
      >
        <h1 className="text-5xl font-bold text-white tracking-wider mb-4">
          THANK <span className="text-cyan-400">YOU</span>
        </h1>
        <p className="text-white/60 text-lg">For Watching Our Presentation</p>
        <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-16">
        <div className="relative">
          {teamMembers.map((member, index) => {
            const pos = getPosition(index, teamMembers.length, member.isLead || false)
            return (
              <div
                key={member.name}
                className={cn("absolute transition-all duration-700", showThankYou ? "opacity-100" : "opacity-0")}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full animate-ping"
                      style={{
                        backgroundColor: member.color,
                        left: `${Math.cos(((energyPhase + i * 120) * Math.PI) / 180) * 30}px`,
                        top: `${Math.sin(((energyPhase + i * 120) * Math.PI) / 180) * 10}px`,
                        opacity: 0.6,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                  <span
                    className={cn("font-bold whitespace-nowrap", member.isLead ? "text-2xl" : "text-lg")}
                    style={{
                      color: member.color,
                      textShadow: `0 0 20px ${member.color}60, 0 0 40px ${member.color}30`,
                    }}
                  >
                    {member.name}
                  </span>
                  <div
                    className="h-0.5 mt-1 rounded-full animate-pulse"
                    style={{
                      backgroundColor: member.color,
                      boxShadow: `0 0 10px ${member.color}`,
                    }}
                  />
                </div>
              </div>
            )
          })}

          <div className="relative z-20">
            <div className="relative flex flex-col items-center justify-center">
              <button
                className={cn(
                  "relative w-48 h-72 rounded-3xl cursor-pointer transition-all duration-500",
                  "bg-gradient-to-b from-zinc-800 to-zinc-900",
                  "border-4 border-zinc-700 shadow-2xl hover:border-red-500/50 hover:shadow-red-500/20",
                  "focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400",
                  isPressed && "scale-95",
                )}
                onClick={handleClick}
                aria-label="Turn off the circuit - Restart presentation"
              >
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-zinc-900 to-black opacity-80" />
                <div className="absolute inset-x-6 top-8 bottom-8 rounded-full bg-gradient-to-b from-zinc-950 to-zinc-800 border border-zinc-700">
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full transition-all duration-500",
                      "bg-gradient-to-b shadow-lg flex items-center justify-center",
                      isPressed
                        ? "top-4 from-zinc-600 to-zinc-700 shadow-black/50"
                        : "top-[calc(100%-6rem)] from-cyan-400 to-cyan-600 shadow-cyan-500/50",
                    )}
                  >
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"
                        stroke={isPressed ? "#888" : "#000"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-zinc-500">OFF</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400">ON</span>
              </button>
              <div className="mt-6 text-2xl font-bold tracking-wider text-white/80">
                TURN <span className="text-red-400">OFF</span>
              </div>
              <p className="text-white/40 text-sm mt-2">Click to restart</p>
            </div>
          </div>
        </div>
      </div>

      {isPressed && (
        <div className="absolute inset-0 z-50 bg-black/50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full animate-ping" />
        </div>
      )}
    </div>
  )
}

export function TransistorPresentation() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showOutro, setShowOutro] = useState(false)

  const handleStart = useCallback(() => {
    setShowIntro(false)
    setCurrentScene(0)
  }, [])

  const handleRestart = useCallback(() => {
    setShowOutro(false)
    setShowIntro(true)
    setCurrentScene(0)
    setIsPlaying(false)
  }, [])

  const nextScene = useCallback(() => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene((prev) => prev + 1)
    } else {
      setIsPlaying(false)
      setShowOutro(true)
    }
  }, [currentScene])

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1)
    }
  }, [currentScene])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro || showOutro) return
      
      switch (e.key) {
        case "ArrowLeft":
          prevScene()
          break
        case "ArrowRight":
          nextScene()
          break
        case " ":
        case "Spacebar":
          e.preventDefault()
          togglePlay()
          break
        case "Home":
          setCurrentScene(0)
          break
        case "End":
          setShowOutro(true)
          break
        case "Escape":
          setIsPlaying(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentScene, showIntro, showOutro, nextScene, prevScene])

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        nextScene()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentScene, nextScene])

  if (showIntro) {
    return <IntroScreen onStart={handleStart} />
  }

  if (showOutro) {
    return <OutroScreen onRestart={handleRestart} />
  }

  const scene = scenes[currentScene]

  return (
    <div className="h-screen w-screen bg-[#0a0a12] text-white overflow-hidden flex items-center justify-center">
      {/* 16:9 Container */}
      <div className="w-full h-full max-h-screen flex flex-col" style={{ maxWidth: "calc(100vh * 16 / 9)" }} role="main" aria-label="Transistor circuit presentation">
        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0 flex-col md:flex-row">
          {/* Left: Circuit Diagram Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Circuit Diagram */}
            <div className="flex-1 relative min-h-0">
              <CircuitDiagram currentScene={currentScene + 1} />
            </div>
          </div>

          {/* Right: Info Panel - reduced width from w-80 to w-72 */}
          <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-white/10 bg-black/40 flex flex-col max-h-[40vh] md:max-h-full" role="complementary" aria-label="Slide information">
            {/* Header */}
            <div className="p-2 border-b border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-cyan-400 text-xs font-medium tracking-wider">
                  SLIDE {scene.id} OF {scenes.length}
                </span>
                <span className="text-white/40 text-xs">{Math.round(((currentScene + 1) / scenes.length) * 100)}%</span>
              </div>
              <h2 className="text-base font-bold text-white">{scene.title}</h2>
              <p className="text-cyan-400/80 text-[10px] mt-0.5">{scene.subtitle}</p>
            </div>

            {/* Content - reduced padding and spacing */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {/* Description */}
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <p className="text-white/80 text-[11px] leading-relaxed">{scene.description}</p>
              </div>

              {/* Key Points */}
              <div>
                <h3 className="text-[9px] font-semibold text-white/50 uppercase tracking-wider mb-1">Key Points</h3>
                <div className="space-y-1">
                  {scene.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-1.5 p-1 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-400 text-[8px] font-bold">{index + 1}</span>
                      </div>
                      <p className="text-white/70 text-[10px] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-2 border border-cyan-400/20">
                <h3 className="text-[9px] font-semibold text-cyan-400 uppercase tracking-wider mb-1">Formula</h3>
                <code className="text-white font-mono text-xs block">{scene.formula}</code>
              </div>

              {/* Scientific Note */}
              <div className="bg-yellow-500/5 rounded-lg p-2 border border-yellow-400/20">
                <div className="flex items-start gap-1.5">
                  <svg className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="text-yellow-400 text-[9px] font-semibold uppercase tracking-wider">Note</span>
                    <p className="text-white/60 text-[10px] mt-0.5">{scene.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - reduced height from h-16 to h-12 */}
        <div className="h-12 border-t border-white/10 bg-black/60 flex items-center px-3 gap-3">
          {/* Left: Main Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={prevScene}
              disabled={currentScene === 0}
              aria-label="Previous slide"
              className={cn(
                "h-8 px-3 border-2 font-semibold transition-all text-xs",
                currentScene === 0
                  ? "border-white/10 text-white/30 bg-transparent cursor-not-allowed"
                  : "border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-cyan-300",
              )}
            >
              <ChevronLeft className="w-4 h-4 mr-0.5" />
              Prev
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause presentation" : "Play presentation"}
              className="h-8 w-8 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={nextScene}
              disabled={currentScene === scenes.length - 1}
              aria-label="Next slide"
              className={cn(
                "h-8 px-3 border-2 font-semibold transition-all text-xs",
                currentScene === scenes.length - 1
                  ? "border-white/10 text-white/30 bg-transparent cursor-not-allowed"
                  : "border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-cyan-300",
              )}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Button>

            {/* Reset Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScene(0)}
              aria-label="Reset to first slide"
              className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Center: Progress Bar */}
          <div className="flex-1 flex items-center gap-2">
            <div className="flex gap-0.5 flex-1">
              {scenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScene(index)}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-300",
                    index === currentScene
                      ? "bg-cyan-400"
                      : index < currentScene
                        ? "bg-cyan-400/50"
                        : "bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
            <span className="text-white/60 text-xs font-medium min-w-[50px] text-right">
              {currentScene + 1} / {scenes.length}
            </span>
          </div>

          {/* Right: End Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOutro(true)}
            aria-label="End presentation"
            className="h-8 px-3 border border-white/20 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/40"
          >
            End
          </Button>
        </div>
      </div>
    </div>
  )
}
