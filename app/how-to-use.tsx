"use client";

import { useEffect, useState } from "react";

const STEP_MS = 4500;

const steps = [
  {
    title: "เปิดเครื่อง",
    text: "กดปุ่มเปิดเครื่อง รอไฟสถานะขึ้นว่าพร้อมใช้งาน",
  },
  {
    title: "วางตำแหน่งเหนือผิว",
    text: "ถือเครื่องเหนือบริเวณที่ต้องการ เช่น แขนหรือหลังมือ ในระยะที่คู่มือแนะนำ",
  },
  {
    title: "ฉายภาพเส้นเลือด",
    text: "แสง NIR 850 nm แสดงแนวเส้นเลือดลงบนผิวผู้ป่วยแบบ Real-time",
  },
  {
    title: "ปรับโหมดและขนาดภาพ",
    text: "เลือกได้ 6 โหมดภาพ 3 ขนาด และ HD Mode ให้เห็นเส้นชัดที่สุดในแต่ละเคส",
  },
  {
    title: "ประเมินตำแหน่ง",
    text: "เลือกเส้นที่เหมาะสม แล้วทำหัตถการตามมาตรฐานวิชาชีพ",
  },
];

const VEINS = [
  "M100 252 C150 240 195 266 245 252 S330 236 380 250",
  "M140 274 C185 262 220 282 265 266 S320 262 350 276",
  "M245 252 C268 238 300 230 335 226",
  "M190 258 C205 270 215 276 240 282",
];

export default function HowToUse() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, playing]);

  const projecting = step >= 2;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
      {/* ฉากภาพเคลื่อนไหว */}
      <div className="pop-on-scroll relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-deep to-navy p-3 shadow-2xl shadow-navy/30 sm:p-5">
        <div className="mb-2 flex items-center justify-between px-1 text-xs text-white/80 sm:text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1">
            ขั้นที่ {step + 1}/{steps.length} · {steps[step].title}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full bg-white/15 px-3 py-1 transition hover:bg-white/25"
            aria-label={playing ? "หยุดภาพเคลื่อนไหว" : "เล่นภาพเคลื่อนไหว"}
          >
            {playing ? "❚❚ หยุด" : "▶ เล่น"}
          </button>
        </div>

        <svg viewBox="0 0 480 320" className="howto h-auto w-full" role="img" aria-label={`ภาพจำลองขั้นตอน: ${steps[step].title}`}>
          <defs>
            <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7dffb0" stopOpacity="0.55" />
              <stop offset="1" stopColor="#7dffb0" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d3b7" />
              <stop offset="1" stopColor="#e2ac8a" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="armClip">
              <rect x="-20" y="214" width="384" height="80" rx="40" />
            </clipPath>
          </defs>

          {/* พื้นหลังห้องตรวจ */}
          <rect width="480" height="320" rx="18" fill="#eaf4fd" />
          <rect y="296" width="480" height="24" fill="#d5e6f7" />

          {/* แขนผู้ป่วย + เสื้อ */}
          <rect x="-20" y="214" width="420" height="80" rx="40" fill="url(#skin)" />
          <rect x="360" y="206" width="140" height="96" rx="20" fill="#a9c8ec" />
          <path d="M372 214v80M392 214v80M412 214v80M432 214v80" stroke="#93b6e0" strokeWidth="6" />

          {/* ภาพเส้นเลือดที่ฉายลงบนผิว */}
          <g clipPath="url(#armClip)">
            <g className={`howto-projection ${projecting ? "is-on" : ""} ${step === 3 ? "is-cycling" : ""}`}>
              <rect x="96" y="220" width="292" height="70" rx="10" fill="#7dffb0" opacity="0.14" />
              <g filter="url(#glow)" stroke="#3dff8a" strokeWidth="6" strokeLinecap="round" fill="none">
                {VEINS.map((d, i) => (
                  <path key={d} d={d} pathLength={1} className="howto-vein" style={{ transitionDelay: `${0.3 + i * 0.25}s` }} />
                ))}
              </g>
            </g>
          </g>

          {/* ลำแสง NIR */}
          <polygon points="214,150 266,150 388,222 96,222" fill="url(#beam)" className={`howto-beam ${projecting ? "is-on" : ""}`} />

          {/* ระยะการถือเครื่อง */}
          <g className={`howto-fade ${step === 1 ? "is-on" : ""}`}>
            <path d="M150 150v62" stroke="#1a4bad" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M144 156l6-8 6 8M144 206l6 8 6-8" stroke="#1a4bad" strokeWidth="2" fill="none" />
            <text x="140" y="186" textAnchor="end" fontSize="15" fontWeight="500" fill="#1a4bad" fontFamily="var(--font-noto-thai)">ระยะตามคู่มือ</text>
          </g>

          {/* เครื่อง VeinVu 200 (ภาพจำลอง) */}
          <g className="howto-device" style={{ transform: step === 0 ? "translateY(-46px)" : "translateY(0)" }}>
            <rect x="196" y="56" width="70" height="26" rx="10" fill="#d6dde6" />
            <rect x="168" y="76" width="160" height="72" rx="16" fill="#ffffff" stroke="#c9d4e1" strokeWidth="2" />
            <rect x="168" y="76" width="44" height="72" rx="16" fill="#e6ebf1" />
            <rect x="212" y="146" width="56" height="5" rx="2.5" fill="#0f2a66" />
            <text x="300" y="132" textAnchor="end" fontSize="13" fontWeight="700" fill="#2b2f36" fontFamily="var(--font-mitr)">VeinVu 200</text>
            {[290, 306, 314].map((x, i) => (
              <circle key={x} cx={x - i * 2} cy={94 + (i % 2) * 2} r="1.6" fill="#9aa7b6" />
            ))}
            {/* ปุ่มเปิดเครื่อง + ไฟสถานะ */}
            <circle cx="240" cy="98" r="7" fill="#f3f6fa" stroke="#9aa7b6" strokeWidth="1.5" />
            <circle cx="240" cy="98" r="3" className={`howto-led ${step === 0 ? "is-blink" : "is-on"}`} />
            <circle cx="240" cy="98" r="7" fill="none" stroke="#00adee" strokeWidth="2" className={`howto-ring ${step === 0 ? "is-on" : ""}`} />
            {/* ปุ่มโหมด */}
            <circle cx="264" cy="98" r="5" fill="#f3f6fa" stroke="#9aa7b6" strokeWidth="1.5" className={step === 3 ? "howto-press" : ""} />
          </g>

          {/* ป้ายโหมดภาพ */}
          <g className={`howto-fade ${step === 3 ? "is-on" : ""}`}>
            <rect x="16" y="16" width="184" height="36" rx="17" fill="#ffffff" />
            <text x="32" y="39" fontSize="15" fill="#1a4bad" fontFamily="var(--font-noto-thai)">โหมดภาพ</text>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={110 + i * 14} cy="34" r="4.5" fill="#00adee" className="howto-dot" style={{ animationDelay: `${i * 0.6}s` }} />
            ))}
          </g>

          {/* จุดประเมินตำแหน่ง */}
          <g className={`howto-fade ${step === 4 ? "is-on" : ""}`}>
            <circle cx="245" cy="252" r="16" fill="none" stroke="#f6ab5c" strokeWidth="3" className="howto-target" />
            <path d="M245 228v10M245 266v10M221 252h10M259 252h10" stroke="#f6ab5c" strokeWidth="3" strokeLinecap="round" />
            <rect x="268" y="16" width="196" height="36" rx="17" fill="#ffffff" />
            <circle cx="288" cy="34" r="9" fill="#22c55e" />
            <path d="M283 34l3.5 3.5 6-7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <text x="304" y="39" fontSize="15" fill="#1a4bad" fontFamily="var(--font-noto-thai)">พร้อมประเมินตำแหน่ง</text>
          </g>

          {/* ป้ายเปิดเครื่อง */}
          <g className={`howto-fade ${step === 0 ? "is-on" : ""}`}>
            <rect x="16" y="16" width="136" height="36" rx="17" fill="#ffffff" />
            <circle cx="36" cy="34" r="6" fill="#22c55e" className="howto-dot" />
            <text x="50" y="39" fontSize="15" fill="#1a4bad" fontFamily="var(--font-noto-thai)">POWER ON</text>
          </g>
        </svg>
      </div>

      {/* รายการขั้นตอน */}
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const active = i === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={active ? "step" : undefined}
                className={`relative w-full overflow-hidden rounded-2xl border-2 p-4 text-left transition sm:p-5 ${
                  active ? "border-sky bg-white shadow-lg shadow-sky/15" : "border-transparent bg-white/60 hover:bg-white"
                }`}
              >
                <span className="flex gap-4">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-lg transition ${
                      active ? "bg-sky text-white" : i < step ? "bg-navy text-white" : "bg-sky-soft text-navy"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className={`block font-display text-lg ${active ? "text-navy" : "text-navy/70"}`}>{s.title}</span>
                    <span className={`block text-sm transition-all ${active ? "mt-1 text-ink" : "text-muted"}`}>{s.text}</span>
                  </span>
                </span>
                {active && playing && (
                  <span key={step} className="howto-progress absolute bottom-0 left-0 h-1 bg-sky" style={{ animationDuration: `${STEP_MS}ms` }} />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
