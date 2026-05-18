"use client";

import type { CSSProperties, ReactNode } from "react";

type CtaPlayfulBackdropProps = {
  /** Koyu zeminde açık kontur + dolgular biraz düşük opaklık */
  dark?: boolean;
};

function Floater({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={`cta-playful-shape absolute ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}

/** Kurumsal palet: lacivert–çelik, tek hafif bronz vurgu; düşük doygunluk */
const CORP_DARK = {
  slate: "bg-[#3F4F63]/88",
  steel: "bg-[#5A6574]/82",
  blueGray: "bg-[#4A5568]/80",
  deepBlue: "bg-[#354A5E]/85",
  coolGray: "bg-[#4B525C]/78",
  ring: "bg-[#3D4A58]/72",
  tealGray: "bg-[#3A4A4A]/75",
  mauveGray: "bg-[#4F4D58]/70",
  bar: "bg-[#445769]/82",
  accentBrass: "bg-[#8A7D6C]/72",
  star: "text-[#6B7280]/88",
  triFill: "rgba(107, 116, 128, 0.82)",
} as const;

const CORP_LIGHT = {
  slate: "bg-[#C4B49C]",
  steel: "bg-[#D4C8B4]",
  blueGray: "bg-[#BFAF9C]",
  deepBlue: "bg-[#A89478]",
  coolGray: "bg-[#C0B4A4]",
  ring: "bg-[#D8CFBC]",
  tealGray: "bg-[#B8AC9C]",
  mauveGray: "bg-[#C0B4A0]",
  bar: "bg-[#B8AA94]",
  accentBrass: "bg-[#C0A868]",
  star: "text-[#A89878]",
  triFill: "#C0B09A",
} as const;

export function CtaPlayfulBackdrop({ dark = false }: CtaPlayfulBackdropProps) {
  const c = dark ? CORP_DARK : CORP_LIGHT;
  const stroke = dark ? "border-2 border-white/14" : "border-2 border-[#7A6A50]/50";
  const extrude = dark ? "4px 5px 0 rgba(0,0,0,0.5)" : "3px 4px 0 rgba(30,58,95,0.25)";
  const extrudeSm = dark ? "3px 4px 0 rgba(0,0,0,0.45)" : "2px 3px 0 rgba(30,58,95,0.18)";
  const svgStroke = dark ? "rgba(255,255,255,0.16)" : "rgba(30,58,95,0.35)";
  const ringBorder = dark ? "border-[3px] border-white/16" : "border-[3px] border-[#7A6A50]/40";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      <Floater className="left-[4%] top-[18%]" style={{ animationDelay: "-0.3s" }}>
        <div className={`h-11 w-11 rotate-[14deg] ${c.deepBlue} ${stroke}`} style={{ boxShadow: extrude }} />
      </Floater>

      <Floater className="right-[10%] top-[12%]" style={{ animationDelay: "-1.2s" }}>
        <div className={`h-14 w-14 rounded-full ${c.steel} ${stroke}`} style={{ boxShadow: extrudeSm }} />
      </Floater>

      <Floater className="bottom-[22%] left-[6%]" style={{ animationDelay: "-2.4s" }}>
        <div className={`h-10 w-16 rounded-full ${c.blueGray} ${stroke}`} style={{ boxShadow: extrudeSm }} />
      </Floater>

      <Floater className="left-[14%] bottom-[14%]" style={{ animationDelay: "-0.8s" }}>
        <svg className={`h-12 w-12 ${c.star}`} viewBox="0 0 48 48" fill="currentColor">
          <path
            d="M24 2l5.5 14.5L44 18l-11 9.5L36 44 24 35 12 44l3-16.5L4 18l14.5-1.5L24 2z"
            stroke={svgStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </Floater>

      <Floater className="right-[18%] top-[28%]" style={{ animationDelay: "-3s" }}>
        <div className={`h-9 w-20 -rotate-[8deg] ${c.bar} ${stroke}`} style={{ boxShadow: extrude }} />
      </Floater>

      <Floater className="left-[22%] top-[8%]" style={{ animationDelay: "-4s" }}>
        <div className={`h-7 w-7 -rotate-[22deg] ${c.coolGray} ${stroke}`} style={{ boxShadow: extrudeSm }} />
      </Floater>

      <Floater className="right-[6%] bottom-[12%]" style={{ animationDelay: "-1.5s" }}>
        <div className={`h-16 w-16 rounded-full ${ringBorder} ${c.ring}`} />
      </Floater>

      <Floater className="right-[28%] bottom-[20%]" style={{ animationDelay: "-2s" }}>
        <svg className="h-14 w-14" viewBox="0 0 56 56">
          <path
            d="M28 6L50 48H6L28 6z"
            fill={c.triFill}
            stroke={svgStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </Floater>

      <Floater className="left-[32%] bottom-[8%]" style={{ animationDelay: "-3.5s" }}>
        <div className={`h-8 w-14 rounded-full ${ringBorder} border-b-0 ${c.tealGray}`} />
      </Floater>

      <Floater className="top-[42%] right-[4%]" style={{ animationDelay: "-0.5s" }}>
        <div className={`h-10 w-10 rotate-45 ${c.slate} ${stroke}`} style={{ boxShadow: extrudeSm }} />
      </Floater>

      <Floater className="top-[52%] left-[3%]" style={{ animationDelay: "-2.8s" }}>
        <div className={`h-8 w-14 rotate-90 rounded-sm ${c.deepBlue} ${stroke}`} style={{ boxShadow: extrudeSm }} />
      </Floater>

      <Floater className="left-[8%] top-[48%]" style={{ animationDelay: "-1s" }}>
        <div className={`h-6 w-6 rounded-full ${c.mauveGray} ${stroke}`} />
      </Floater>

      <Floater className="right-[38%] top-[6%]" style={{ animationDelay: "-4.2s" }}>
        <div
          className={`h-5 w-12 rotate-[18deg] ${c.accentBrass} ${stroke}`}
          style={{ boxShadow: extrudeSm }}
        />
      </Floater>
    </div>
  );
}
