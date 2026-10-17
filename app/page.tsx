import Image from "next/image";
import type { ReactNode } from "react";

const CONTACT = {
  phoneLabel: "02-682-9151-4",
  phoneHref: "tel:026829151",
  lineLabel: "@zestmed",
  lineHref: "https://line.me/R/ti/p/@zestmed",
  facebookHref: "https://www.facebook.com/zestmed",
  website: "https://www.zest-med.com",
};

/* ---------- ไอคอน (วาดเอง ไม่ใช้รูปจากเว็บอื่น) ---------- */
function Icon({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}
const icons = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  monitor: (<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>),
  sliders: (<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>),
  hospital: (<><path d="M4 21V8l8-4 8 4v13" /><path d="M10 21v-5h4v5M12 8v4M10 10h4" /></>),
  signal: (<><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.6 5.6a9 9 0 000 12.8M18.4 5.6a9 9 0 010 12.8" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  hd: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9v6M11 9v6M7 12h4M14 9v6h1.5a2.5 2.5 0 002.5-2.5v-1A2.5 2.5 0 0015.5 9H14z" /></>),
  feather: (<><path d="M20 4c-6 0-12 4-13 13l-3 3" /><path d="M7 17c5 0 10-3 11-9" /></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>),
  doc: (<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></>),
  chevron: <path d="M6 9l6 6 6-6" />,
};

/* ---------- ข้อมูลเนื้อหา ---------- */
const highlights = [
  {
    icon: icons.monitor,
    title: "เห็นแนวเส้นเลือดก่อนเจาะ",
    text: "ฉายภาพเส้นเลือดใต้ผิวหนังลงบนผิวผู้ป่วยแบบ Real-time ช่วยประเมินตำแหน่งได้มั่นใจขึ้น",
    image: "/images/vein-arm.jpg",
  },
  {
    icon: icons.sliders,
    title: "ปรับภาพให้เหมาะกับเคส",
    text: "เลือกได้ 6 โหมดภาพ 3 ขนาดการแสดงผล พร้อม HD Mode ให้เหมาะกับสภาพผิวแต่ละคน",
    image: "/images/display-modes.jpg",
  },
  {
    icon: icons.hospital,
    title: "ใช้ได้ในหลายหน่วยงาน",
    text: "พกพาสะดวก เหมาะกับ ER, Ward, OPD, Pediatric, NICU, ICU และหน่วยรับบริจาคโลหิต",
    image: "/images/clinical-use.jpg",
  },
];

const specs = [
  { icon: icons.signal, title: "NIR 850 nm", text: "เทคโนโลยี Near-Infrared แสดงภาพเส้นเลือดใต้ผิวหนัง" },
  { icon: icons.monitor, title: "Real-time Vein Mapping", text: "เห็นแนวเส้นเลือดแบบเรียลไทม์ก่อนแทง" },
  { icon: icons.layers, title: "6 Display Modes", text: "เลือกโหมดภาพให้เหมาะกับผู้ป่วยและสภาพผิว" },
  { icon: icons.expand, title: "3 Image Sizes", text: "ปรับขนาดภาพได้ 3 ระดับ รองรับหลายบริเวณ" },
  { icon: icons.hd, title: "HD Mode", text: "เพิ่มความคมชัดของภาพเส้นเลือด" },
  { icon: icons.feather, title: "Portable Design", text: "น้ำหนักเบา ถือถนัดมือ พกพาสะดวก" },
];

const checklist = [
  "เห็นเส้นได้จริงในเคสจริงหรือไม่",
  "ใช้กับเด็ก ผู้สูงอายุ ผู้ป่วยอ้วน/บวม หรือผู้ป่วยเคมีบำบัดได้หรือไม่",
  "ภาพเส้นเลือดนิ่ง ชัด ช่วยประเมินตำแหน่งได้จริงหรือไม่",
  "มีมาตรฐาน US FDA | KFDA | Thai FDA ให้ตรวจสอบหรือไม่",
  "มีการทดลองใช้ อบรม และบริการหลังการขายหรือไม่",
];

const faqs = [
  {
    q: "VeinVu 200 ทำงานอย่างไร?",
    a: "เครื่องใช้แสง Near-Infrared ความยาวคลื่น 850 nm ซึ่งถูกดูดซับโดยฮีโมโกลบินในเลือด แล้วฉายภาพแนวเส้นเลือดกลับลงบนผิวหนังแบบ Real-time ช่วยให้บุคลากรทางการแพทย์ประเมินตำแหน่งก่อนเจาะได้ง่ายขึ้น",
  },
  {
    q: "เหมาะกับผู้ป่วยกลุ่มไหนบ้าง?",
    a: "ช่วยได้มากในเคสที่หาเส้นยาก เช่น เด็กเล็กและทารก ผู้สูงอายุ ผู้ป่วยที่มีภาวะอ้วนหรือบวม และผู้ป่วยที่ได้รับยาเคมีบำบัด ทั้งนี้การใช้งานขึ้นกับทักษะและวิจารณญาณของบุคลากรทางการแพทย์",
  },
  {
    q: "ขอทดลองใช้หรือนัดสาธิตก่อนซื้อได้ไหม?",
    a: "ได้ ทีม Zest-Med สามารถนำเครื่องไปสาธิตที่หน่วยงานของคุณ ให้พยาบาลได้ทดลองกับ workflow จริงก่อนตัดสินใจ ติดต่อนัดหมายได้ทาง LINE หรือโทรศัพท์",
  },
  {
    q: "ราคาเท่าไร และมีบริการหลังการขายไหม?",
    a: "ราคาขึ้นกับจำนวนและเงื่อนไขการจัดซื้อของแต่ละหน่วยงาน กรุณาขอใบเสนอราคาจากทีมขาย Zest-Med มีทีมช่างและผู้เชี่ยวชาญดูแลการอบรมการใช้งานและบริการหลังการขาย พร้อมเอกสารประกอบการพิจารณาจัดซื้อ",
  },
];

/* ---------- ส่วนประกอบเล็ก ๆ ---------- */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-sm font-medium tracking-wide text-sky">
      <span className="h-1 w-10 rounded-full bg-sky" />
      {children}
    </p>
  );
}

function PrimaryButton({ href, children, icon }: { href: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 font-display text-lg text-white shadow-lg shadow-orange/30 transition hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      {icon}
      {children}
    </a>
  );
}

function SecondaryButton({ href, children, icon }: { href: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-sky bg-white px-6 py-3 font-display text-lg text-navy transition hover:bg-sky-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      {icon}
      {children}
    </a>
  );
}

/* ---------- หน้าเว็บ ---------- */
export default function Home() {
  return (
    <>
      {/* แถบบน */}
      <header className="sticky top-0 z-30 border-b-4 border-sky bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-3" aria-label="Zest-Med หน้าแรก">
            <Image src="/images/zest-med-logo.png" alt="ZEST-MED" width={377} height={377} priority className="h-12 w-12" />
            <span className="hidden border-l border-line pl-3 text-xs leading-tight tracking-wide text-navy sm:block">
              BEYOND
              <br />
              EXPERTISE
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="เมนูหลัก">
            <a href="#features" className="hover:text-sky">จุดเด่น</a>
            <a href="#product" className="hover:text-sky">สินค้า</a>
            <a href="#faq" className="hover:text-sky">คำถาม</a>
            <a href="#contact" className="hover:text-sky">ติดต่อเรา</a>
          </nav>
          <a
            href={CONTACT.lineHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-dark"
          >
            ขอใบเสนอราคา
          </a>
        </div>
      </header>

      <main id="top">
        {/* ส่วนหัว */}
        <section className="overflow-hidden bg-gradient-to-b from-mist to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-10 md:grid-cols-2 md:pb-20 md:pt-16">
            <div>
              <span className="inline-block rounded-full bg-navy px-4 py-1.5 text-sm text-white">
                เครื่องสแกนเส้นเลือด NIR
              </span>
              <h1 className="mt-5 text-hero font-semibold">
                <span className="block text-navy">VeinVu 200</span>
                <span className="block text-sky">เห็นเส้นก่อนแทง</span>
              </h1>
              <p className="mt-4 font-display text-xl text-navy md:text-2xl">
                มองเห็นแนวเส้นเลือดชัดเจนขึ้น เพื่อประกอบการประเมินก่อนเจาะ
              </p>
              <p className="mt-4 max-w-xl text-base md:text-lg">
                เครื่องช่วยมองเห็นเส้นเลือดด้วยเทคโนโลยี Near-Infrared 850 nm แสดงภาพแนวเส้นเลือดใต้ผิวหนังแบบ Real-time
                ช่วยบุคลากรทางการแพทย์ประเมินตำแหน่งก่อนทำหัตถการ
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={CONTACT.lineHref} icon={<Icon>{icons.calendar}</Icon>}>
                  นัดทดลองใช้ VeinVu 200
                </PrimaryButton>
                <SecondaryButton href={CONTACT.phoneHref} icon={<Icon>{icons.phone}</Icon>}>
                  โทร {CONTACT.phoneLabel}
                </SecondaryButton>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="มาตรฐาน">
                {["US FDA", "KFDA", "THAI FDA"].map((s) => (
                  <li key={s} className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy">
                    <Icon className="h-4 w-4 text-sky">{icons.shield}</Icon>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              <Image
                src="/images/hero-device.png"
                alt="เครื่องสแกนเส้นเลือด VeinVu 200"
                width={545}
                height={510}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full mix-blend-multiply"
              />
            </div>
          </div>
        </section>

        {/* จุดเด่น 3 ข้อ */}
        <section id="features" className="scroll-mt-20 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionLabel>จุดเด่น</SectionLabel>
            <h2 className="text-section font-semibold">ทำไมต้อง VeinVu 200</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {highlights.map((h) => (
                <article key={h.title} className="flex flex-col overflow-hidden rounded-2xl border-2 border-line bg-white transition hover:border-sky hover:shadow-xl hover:shadow-sky/10">
                  <div className="flex-1 p-6">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-sky-soft text-navy">
                      <Icon className="h-7 w-7">{h.icon}</Icon>
                    </span>
                    <h3 className="mt-4 text-card font-medium">{h.title}</h3>
                    <p className="mt-2 text-muted">{h.text}</p>
                  </div>
                  <Image src={h.image} alt="" width={380} height={104} sizes="(min-width: 768px) 33vw, 100vw" className="h-28 w-full object-cover" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* สินค้า / ราคา */}
        <section id="product" className="scroll-mt-20 bg-sky-soft py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <SectionLabel>สินค้า</SectionLabel>
                <h2 className="text-section font-semibold">เครื่องสแกนเส้นเลือด ไม่ได้เหมือนกันทุกเครื่อง</h2>
                <p className="mt-4">
                  การเลือกเครื่องควรดู <strong className="text-navy">ความชัดในการใช้งานจริง</strong>
                  {" "}ความเหมาะสมกับเคสเจาะยาก และมาตรฐานที่ตรวจสอบได้ ไม่ใช่ดูจากราคาเพียงอย่างเดียว
                </p>
                <ul className="mt-5 space-y-2.5">
                  {checklist.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky text-white">
                        <Icon className="h-3.5 w-3.5">{icons.check}</Icon>
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/10">
                <Image src="/images/demo-nurse.jpg" alt="พยาบาลใช้ VeinVu 200 ส่องหาเส้นเลือดที่แขนผู้ป่วย" width={548} height={165} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                <div className="p-6">
                  <p className="text-sm text-muted">ใช้ได้ในหน่วยงาน</p>
                  <p className="font-medium text-navy">วอร์ดเด็ก · NICU · ICU · ER · OPD · หน่วยรับบริจาคโลหิต</p>
                </div>
              </div>
            </div>

            <h3 className="mt-14 text-card font-medium md:text-2xl">คุณสมบัติหลักของ VeinVu 200</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {specs.map((s) => (
                <div key={s.title} className="rounded-xl bg-white p-4 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sky-soft text-sky">
                    <Icon>{s.icon}</Icon>
                  </span>
                  <p className="mt-3 font-display font-medium text-navy">{s.title}</p>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              ))}
            </div>

            {/* ราคา */}
            <div className="mt-10 grid gap-6 rounded-2xl bg-navy p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
              <div>
                <p className="text-sm text-sky">ราคา</p>
                <p className="font-display text-2xl md:text-3xl">สอบถามราคาพิเศษสำหรับหน่วยงาน</p>
                <ul className="mt-4 grid gap-2 text-white/90 sm:grid-cols-2">
                  {["นัดสาธิตที่หน่วยงานฟรี", "อบรมการใช้งานโดยผู้เชี่ยวชาญ", "เอกสารประกอบการจัดซื้อครบ", "บริการหลังการขายโดยทีม Zest-Med"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Icon className="h-5 w-5 shrink-0 text-sky">{icons.check}</Icon>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <PrimaryButton href={CONTACT.lineHref} icon={<Icon>{icons.doc}</Icon>}>
                  ขอใบเสนอราคา
                </PrimaryButton>
                <a href={CONTACT.phoneHref} className="text-center text-sm text-white/80 underline-offset-4 hover:underline">
                  หรือโทร {CONTACT.phoneLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* คำถามที่พบบ่อย */}
        <section id="faq" className="scroll-mt-20 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <SectionLabel>คำถามที่พบบ่อย</SectionLabel>
            <h2 className="text-section font-semibold">มีคำถาม? เรามีคำตอบ</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0} className="group rounded-xl border-2 border-line bg-white open:border-sky">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg text-navy">
                    {f.q}
                    <Icon className="h-5 w-5 shrink-0 text-sky transition group-open:rotate-180">{icons.chevron}</Icon>
                  </summary>
                  <p className="px-5 pb-5 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ติดต่อเรา */}
        <section id="contact" className="scroll-mt-20 bg-gradient-to-br from-navy to-navy-deep py-14 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="mb-3 flex items-center gap-3 text-sm font-medium text-sky">
                  <span className="h-1 w-10 rounded-full bg-sky" />
                  ติดต่อเรา
                </p>
                <h2 className="text-section font-semibold !text-white">ให้ทีมพยาบาลทดลองใช้จริง ก่อนตัดสินใจจัดซื้อ</h2>
                <p className="mt-4 text-white/85">
                  นัดวันเวลาที่สะดวก แล้วให้ทีม Zest-Med สาธิตการใช้งาน VeinVu 200 กับพยาบาลในหน่วยงานของคุณโดยตรง
                </p>
                <div className="mt-6 hidden overflow-hidden rounded-2xl md:block">
                  <Image src="/images/team.jpg" alt="ทีม Zest-Med สาธิตเครื่องให้พยาบาล" width={289} height={112} className="h-40 w-full object-cover" />
                </div>
              </div>
              <div className="grid gap-3">
                <ContactCard href={CONTACT.lineHref} icon={icons.chat} label="LINE" value={CONTACT.lineLabel} highlight />
                <ContactCard href={CONTACT.phoneHref} icon={icons.phone} label="โทรศัพท์" value={CONTACT.phoneLabel} />
                <ContactCard href={CONTACT.facebookHref} icon={icons.globe} label="Facebook" value="@zestmed" />
                <ContactCard href={CONTACT.website} icon={icons.globe} label="เว็บไซต์" value="www.zest-med.com" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ส่วนท้าย */}
      <footer className="bg-navy-deep text-sm text-white/75">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Image src="/images/zest-med-logo.png" alt="ZEST-MED" width={377} height={377} className="mb-4 h-16 w-16 rounded-lg bg-white p-1.5" />
          <p className="font-display text-base text-white">บริษัท เซสท์-เมด จำกัด (Zest-Med Co., Ltd.)</p>
          <p className="mt-2">896/1-2 Office Tower 1 SV City ชั้น 3 ถ.พระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ 10120</p>
          <p className="mt-1">โทร {CONTACT.phoneLabel} · แฟกซ์ 02-682-9155 · LINE {CONTACT.lineLabel}</p>
          <p className="mt-6 rounded-lg border border-white/20 p-4 text-xs leading-relaxed text-white/70">
            หมายเหตุ: VeinVu 200 เป็นเครื่องมือช่วยมองเห็นแนวเส้นเลือดใต้ผิวหนัง เพื่อประกอบการประเมินก่อนการเจาะ IV / เจาะเลือด / เปิดเส้นให้สารน้ำ
            การใช้งานควรอยู่ภายใต้ทักษะและวิจารณญาณของบุคลากรทางการแพทย์ · โฆษณาโดยตรงต่อผู้ประกอบวิชาชีพทางการแพทย์และสาธารณสุข
          </p>
          <p className="mt-6 tracking-[0.2em] text-sky">UNDERSTANDING TODAY, INNOVATING TOMORROW</p>
          <p className="mt-2 text-xs">© 2026 Zest-Med Co., Ltd.</p>
        </div>
      </footer>
    </>
  );
}

function ContactCard({ href, icon, label, value, highlight }: { href: string; icon: ReactNode; label: string; value: string; highlight?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex min-h-16 items-center gap-4 rounded-xl p-4 transition ${highlight ? "bg-orange text-white hover:bg-orange-dark" : "bg-white/10 hover:bg-white/20"}`}
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${highlight ? "bg-white/20" : "bg-sky"}`}>
        <Icon>{icon}</Icon>
      </span>
      <span className="leading-tight">
        <span className="block text-sm opacity-80">{label}</span>
        <span className="block font-display text-lg">{value}</span>
      </span>
    </a>
  );
}
