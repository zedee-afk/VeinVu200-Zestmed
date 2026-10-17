"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

/* ---------- ข้อมูลจากแคตตาล็อก VeinVu 200 ---------- */
const steps = [
  {
    title: "เปิดเครื่อง",
    text: "กดปุ่ม Power รอหน้าจอแสดงสถานะแบตเตอรี่และโหมด พร้อมใช้งาน",
    ticks: 1,
    ms: 4000,
  },
  {
    title: "ตั้งระยะโฟกัส 40 cm ± 3 cm",
    text: "ถือเครื่องเหนือหลังมือหรือแขน ห่างผิวประมาณ 40 cm ± 3 cm เพื่อให้ภาพคมชัดที่สุด",
    ticks: 1,
    ms: 4500,
  },
  {
    title: "ฉายภาพและเลือกโหมดสี",
    text: "แสง NIR 850 nm ฉายแนวเส้นเลือดลงบนผิวแบบ Real-time เลือกได้ 6 โหมด: 4 Basic Color และ 2 Advanced Color",
    ticks: 6,
    ms: 1500,
  },
  {
    title: "ปรับขนาดภาพ + HD Mode",
    text: "ปรับขนาดภาพได้ 3 ขนาด Small / Medium / Large และเปิด HD Mode เพื่อเห็นเส้นเลือดฝอยคมชัดขึ้น",
    ticks: 3,
    ms: 1800,
  },
  {
    title: "ประเมินตำแหน่ง",
    text: "ความแม่นยำ 0.2 mm มองเห็นเส้นเลือดลึกถึง 10 mm เลือกเส้นที่เหมาะสม แล้วทำหัตถการตามมาตรฐานวิชาชีพ",
    ticks: 1,
    ms: 5000,
  },
];

type Mode = {
  group: "BASIC" | "ADVANCED";
  name: string;
  fill: string | [string, string];
  fillOpacity: number;
  vein: string;
  edge?: string;
  glow?: boolean;
};

const MODES: Mode[] = [
  { group: "BASIC", name: "Green", fill: "#3dff6a", fillOpacity: 0.1, vein: "#3dff6a", glow: true },
  { group: "BASIC", name: "White", fill: "#ffffff", fillOpacity: 0.14, vein: "#fff7ef", glow: true },
  { group: "BASIC", name: "Green Fill", fill: "#4ef060", fillOpacity: 0.88, vein: "#2c4a22" },
  { group: "BASIC", name: "White Fill", fill: "#fdeee8", fillOpacity: 0.9, vein: "#a3807a" },
  { group: "ADVANCED", name: "Color · Warm", fill: ["#ff4b2b", "#ffae34"], fillOpacity: 0.85, vein: "#3d5bff", edge: "#ffe347" },
  { group: "ADVANCED", name: "Color · Cool", fill: ["#3446ff", "#9b4dff"], fillOpacity: 0.85, vein: "#ffe347", edge: "#3be3ff" },
];

const SIZES = [
  { key: "S", label: "Small", w: 112, h: 44 },
  { key: "M", label: "Medium", w: 164, h: 60 },
  { key: "L", label: "Large", w: 220, h: 76 },
];

/* ศูนย์กลางภาพที่ฉายบนหลังมือ */
const CX = 292;
const CY = 262;

const VEINS = [
  "M150 262 C200 252 235 270 280 258 S350 246 395 254",
  "M170 282 C215 272 250 290 300 276 S352 276 392 286",
  "M280 258 C300 246 330 240 362 238 S392 238 404 240",
  "M232 264 C246 276 258 282 300 276",
  "M318 252 C330 262 340 270 352 276",
];
const CAPILLARIES = [
  "M206 258 C214 248 224 244 236 242",
  "M262 272 C270 282 282 290 294 292",
  "M336 246 C344 236 356 232 366 230",
  "M356 276 C364 268 374 266 386 266",
  "M190 276 C198 286 210 290 222 290",
];

export default function HowToUse() {
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [modeSel, setModeSel] = useState<number | null>(null);
  const [sizeSel, setSizeSel] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const { ticks, ms } = steps[step];
    const t = setTimeout(() => {
      if (tick + 1 < ticks) {
        setTick(tick + 1);
      } else {
        setStep((step + 1) % steps.length);
        setTick(0);
      }
    }, ms);
    return () => clearTimeout(t);
  }, [step, tick, playing]);

  const goTo = (i: number) => {
    setStep(i);
    setTick(0);
    setModeSel(null);
    setSizeSel(null);
  };

  const modeIdx = modeSel ?? (step === 2 ? tick : 0);
  const sizeIdx = sizeSel ?? (step === 3 ? tick : 1);
  const mode = MODES[modeIdx];
  const size = SIZES[sizeIdx];
  const powered = step >= 1;
  const projecting = step >= 2;
  const hd = step >= 3;

  const rx = CX - size.w / 2;
  const ry = CY - size.h / 2;
  const fill = Array.isArray(mode.fill) ? "url(#modeFill)" : mode.fill;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <div className="pop-on-scroll rounded-3xl bg-gradient-to-br from-navy-deep to-navy p-3 shadow-2xl shadow-navy/30 sm:p-4">
        {/* แถบควบคุมบนสุด แบบจอมอนิเตอร์ทางการแพทย์ */}
        <div className="mb-3 flex items-center justify-between gap-2 px-1 text-xs text-white/85 sm:text-sm">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#3dff6a]" />
            STEP {step + 1}/{steps.length} · {steps[step].title}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="shrink-0 rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20"
            aria-label={playing ? "หยุดภาพเคลื่อนไหว" : "เล่นภาพเคลื่อนไหว"}
          >
            {playing ? "❚❚ หยุด" : "▶ เล่น"}
          </button>
        </div>

        {/* ฉาก */}
        <div className="howto-stage relative aspect-[480/340] w-full overflow-hidden rounded-2xl">
          <svg viewBox="0 0 480 340" className="absolute inset-0 h-full w-full" role="img" aria-label={`ภาพจำลองขั้นตอน: ${steps[step].title}`}>
            <defs>
              <linearGradient id="modeFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={Array.isArray(mode.fill) ? mode.fill[0] : mode.fill} />
                <stop offset="1" stopColor={Array.isArray(mode.fill) ? mode.fill[1] : mode.fill} />
              </linearGradient>
              <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8dffb4" stopOpacity="0.5" />
                <stop offset="1" stopColor="#8dffb4" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f3cdb0" />
                <stop offset="1" stopColor="#dda585" />
              </linearGradient>
              <filter id="veinGlow" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="projClip">
                <rect x={rx} y={ry} width={size.w} height={size.h} rx="4" className="howto-size" />
              </clipPath>
            </defs>

            {/* โต๊ะตรวจ */}
            <rect y="300" width="480" height="40" fill="#dbe8f6" />
            <path d="M0 300h480" stroke="#c3d6ec" strokeWidth="2" />

            {/* แขนและมือ (มุมมองหลังมือ) */}
            <g stroke="#c98d6c" strokeWidth="1.2">
              <rect x="-20" y="240" width="290" height="56" rx="26" fill="url(#skin)" />
              <path d="M250 236 C290 226 340 228 372 238 C384 246 386 290 372 298 C336 306 288 304 252 298 Z" fill="url(#skin)" />
              <rect x="352" y="238" width="96" height="14" rx="7" fill="url(#skin)" />
              <rect x="360" y="254" width="104" height="14" rx="7" fill="url(#skin)" />
              <rect x="358" y="270" width="98" height="14" rx="7" fill="url(#skin)" />
              <rect x="350" y="286" width="80" height="13" rx="6.5" fill="url(#skin)" />
              <path d="M300 236 C318 222 338 212 358 206 C366 204 370 212 364 218 C350 228 334 236 320 242 Z" fill="url(#skin)" />
            </g>
            <rect x="-20" y="232" width="110" height="72" rx="14" fill="#e7eef8" stroke="#c3d6ec" />
            <path d="M8 232v72M30 232v72M52 232v72M74 232v72" stroke="#d3e0f0" strokeWidth="5" />

            {/* ลำแสง NIR */}
            <polygon
              points={`214,150 250,150 ${rx + size.w},${ry + size.h} ${rx},${ry + size.h}`}
              fill="url(#beam)"
              className={`howto-beam ${projecting ? "is-on" : ""}`}
            />

            {/* ภาพเส้นเลือดที่ฉายลงบนผิว */}
            <g className={`howto-projection ${projecting ? "is-on" : ""}`} clipPath="url(#projClip)">
              <rect x="120" y="200" width="320" height="130" fill={fill} opacity={mode.fillOpacity} className="howto-mode" />
              <g fill="none" strokeLinecap="round" filter={mode.glow ? "url(#veinGlow)" : undefined}>
                {mode.edge &&
                  VEINS.map((d) => <path key={`e${d}`} d={d} stroke={mode.edge} strokeWidth="9" pathLength={1} className="howto-vein" />)}
                {VEINS.map((d, i) => (
                  <path
                    key={d}
                    d={d}
                    stroke={mode.vein}
                    strokeWidth={mode.edge ? 4.5 : 5}
                    pathLength={1}
                    className="howto-vein howto-mode-stroke"
                    style={{ transitionDelay: `${0.2 + i * 0.18}s` }}
                  />
                ))}
                <g className={`howto-fade ${hd ? "is-on" : ""}`}>
                  {CAPILLARIES.map((d) => (
                    <path key={d} d={d} stroke={mode.vein} strokeWidth="1.6" className="howto-mode-stroke" />
                  ))}
                </g>
              </g>
              <rect x={rx} y={ry} width={size.w} height="2" fill="#ffffff" opacity="0.7" className="howto-scan" style={{ "--scan-h": `${size.h}px` } as CSSProperties} />
            </g>
            <rect
              x={rx}
              y={ry}
              width={size.w}
              height={size.h}
              rx="4"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.8"
              strokeDasharray="5 4"
              className={`howto-size howto-fade ${step === 3 ? "is-on" : ""}`}
            />

            {/* เส้นบอกระยะโฟกัส */}
            <g className={`howto-fade ${step === 1 ? "is-on" : ""}`}>
              <path d="M418 150v84" stroke="#1a4bad" strokeWidth="1.6" strokeDasharray="4 4" />
              <path d="M412 156l6-8 6 8M412 228l6 8 6-8" stroke="#1a4bad" strokeWidth="1.6" fill="none" />
              <g className="howto-focus" stroke="#00adee" strokeWidth="2.5" fill="none">
                <path d="M248 240h-14v14M336 240h14v14M248 290h-14v-14M336 290h14v-14" />
              </g>
              <circle cx={CX} cy={CY + 3} r="3" fill="#00adee" />
            </g>

            {/* จุดประเมินตำแหน่ง */}
            <g className={`howto-fade ${step === 4 ? "is-on" : ""}`}>
              <circle cx="280" cy="258" r="14" fill="none" stroke="#f6ab5c" strokeWidth="2.5" className="howto-target" />
              <path d="M280 236v10M280 270v10M258 258h10M292 258h10" stroke="#f6ab5c" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>

          {/* เครื่อง VeinVu 200 (รูปจริง) */}
          <div
            className="howto-device absolute left-1/2 top-[2%] w-[38%]"
            style={{ transform: `translate(-50%, ${step === 0 ? "-14%" : "0"})` }}
          >
            <Image
              src="/images/veinvu200-device.png"
              alt="เครื่อง VeinVu 200"
              width={720}
              height={550}
              sizes="(min-width: 1024px) 260px, 38vw"
              loading="eager"
              className="h-auto w-full drop-shadow-[0_14px_18px_rgba(15,42,102,0.28)]"
            />
            {/* ปุ่มต่าง ๆ บนเครื่อง: Power / โหมดสี / ขนาด / HD */}
            <span className={`howto-btn left-[50.3%] top-[27.6%] ${step === 0 ? "is-on" : ""}`} />
            <span className={`howto-btn left-[57.2%] top-[18.2%] ${step === 2 ? "is-on" : ""}`} />
            <span className={`howto-btn left-[66.3%] top-[24.7%] ${step === 3 ? "is-on" : ""}`} />
            <span className={`howto-btn left-[69.9%] top-[17.1%] ${step === 3 ? "is-on" : ""}`} />
          </div>

          {/* ข้อมูลบนจอ (HUD) */}
          <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1 text-[10px] font-medium sm:left-3 sm:top-3 sm:text-xs">
            <span className="howto-chip">
              <span className={`h-1.5 w-1.5 rounded-full ${powered ? "bg-[#22c55e]" : "animate-pulse bg-orange"}`} />
              {powered ? "READY" : "POWER ON…"}
            </span>
            <span className="howto-chip">NIR 850 nm</span>
            <span className={`howto-chip transition ${hd ? "!bg-sky !text-white" : "opacity-60"}`}>HD</span>
          </div>
          <div className="pointer-events-none absolute right-2 top-2 flex flex-col items-end gap-1 text-[10px] font-medium sm:right-3 sm:top-3 sm:text-xs">
            <span className="howto-chip">
              <span className="relative inline-block h-2.5 w-5 rounded-[3px] border border-navy/60">
                <span className="absolute inset-y-[1px] left-[1px] w-[70%] rounded-[1px] bg-[#22c55e]" />
              </span>
              BATT
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-2 bottom-2 flex flex-wrap items-end justify-between gap-1 text-[10px] font-medium sm:inset-x-3 sm:bottom-3 sm:text-xs">
            <span className="flex flex-wrap gap-1">
              {step === 1 && <span className="howto-chip !bg-navy !text-white">FOCUS 40 cm ± 3 cm</span>}
              {projecting && step !== 4 && (
                <span className="howto-chip max-sm:!hidden">
                  {mode.group} · {mode.name}
                </span>
              )}
              {projecting && step !== 4 && <span className="howto-chip max-sm:!hidden">SIZE {size.label}</span>}
            </span>
            {step === 4 && (
              <span className="howto-chip mx-auto !px-3 !py-1 text-xs max-sm:!hidden sm:text-sm">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#22c55e] text-[10px] text-white">✓</span>
                Accuracy 0.2 mm · Depth 10 mm
              </span>
            )}
          </div>
        </div>

        {/* ข้อมูลโหมดบนมือถือ (บนคอมแสดงอยู่ในภาพ) */}
        <p className="mt-2 min-h-4 px-1 text-xs text-white/85 sm:hidden" aria-live="polite">
          {step === 4
            ? "✓ Accuracy 0.2 mm · Depth 10 mm"
            : projecting
              ? `${mode.group} · ${mode.name} · SIZE ${size.label}`
              : ""}
        </p>

        {/* ปุ่มเลือกโหมดสีและขนาด (กดเองได้) */}
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-1.5 px-1 text-[11px] text-white/70">
              โหมดสี: <span className="text-white">4 BASIC</span> + <span className="text-white">2 ADVANCED</span>
            </p>
            <div className="flex gap-1.5">
              {MODES.map((m, i) => {
                const bg = Array.isArray(m.fill) ? `linear-gradient(135deg, ${m.fill[0]}, ${m.fill[1]})` : m.fillOpacity > 0.5 ? m.fill : "#d9a385";
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => {
                      if (step < 2) goTo(2);
                      setModeSel(i);
                      setPlaying(false);
                    }}
                    aria-label={`โหมด ${m.group} ${m.name}`}
                    aria-pressed={projecting && i === modeIdx}
                    className={`relative h-9 flex-1 overflow-hidden rounded-lg border-2 transition ${
                      projecting && i === modeIdx ? "scale-105 border-white" : "border-white/20 hover:border-white/60"
                    } ${i === 4 ? "ml-2" : ""}`}
                    style={{ background: bg }}
                  >
                    <svg viewBox="0 0 40 20" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                      {m.edge && <path d="M0 12 C10 4 22 16 40 8" stroke={m.edge} strokeWidth="5" fill="none" />}
                      <path d="M0 12 C10 4 22 16 40 8" stroke={m.vein} strokeWidth="2.6" fill="none" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-1.5 px-1 text-[11px] text-white/70">ขนาดภาพ</p>
            <div className="flex gap-1.5">
              {SIZES.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    if (step < 2) goTo(3);
                    setSizeSel(i);
                    setPlaying(false);
                  }}
                  aria-label={`ขนาด ${s.label}`}
                  aria-pressed={projecting && i === sizeIdx}
                  className={`h-9 min-w-11 flex-1 rounded-lg border-2 font-display text-sm transition sm:flex-none ${
                    projecting && i === sizeIdx ? "border-white bg-white text-navy" : "border-white/20 text-white hover:border-white/60"
                  }`}
                >
                  {s.key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* รายการขั้นตอน */}
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const active = i === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
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
                    <span className={`block text-sm ${active ? "mt-1 text-ink" : "text-muted"}`}>{s.text}</span>
                  </span>
                </span>
                {active && playing && (
                  <span key={step} className="howto-progress absolute bottom-0 left-0 h-1 bg-sky" style={{ animationDuration: `${s.ms * s.ticks}ms` }} />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
