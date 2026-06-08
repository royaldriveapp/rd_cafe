import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useContent";

const RECEIPT_BG = "#F5ECD7";
const RECEIPT_INK = "#1E0C02";
const RECEIPT_GOLD = "#C49A3C";
const RECEIPT_MID = "#6C472B";
const RECEIPT_SOFT = "#9A7651";
const SITE_BG = "#140800";
const RESERVATION_LINKS = [
  { label: "eazydiner.com", href: "https://www.eazydiner.com/" },
  { label: "swiggy.com", href: "https://www.swiggy.com/" },
];

function ZigZagEdge({ position }: { position: "top" | "bottom" }) {
  const topPattern =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='12' viewBox='0 0 28 12'%3E%3Cpath d='M0 12L7 4L14 12L21 4L28 12V12H0Z' fill='%23F5ECD7'/%3E%3C/svg%3E\")";
  const bottomPattern =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='12' viewBox='0 0 28 12'%3E%3Cpath d='M0 0L7 8L14 0L21 8L28 0V0H0Z' fill='%23F5ECD7'/%3E%3C/svg%3E\")";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-3 ${position === "top" ? "top-0 -translate-y-[calc(100%-1px)]" : "bottom-0 translate-y-[calc(100%-1px)]"}`}
      style={{
        backgroundSize: "28px 12px",
        backgroundRepeat: "repeat-x",
        backgroundImage: position === "top" ? topPattern : bottomPattern,
        backgroundColor: "transparent",
        zIndex: 2,
      }}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <span
        className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
        style={{ color: RECEIPT_SOFT }}
      >
        {children}
      </span>
    </div>
  );
}

function Stamp() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-[58px] w-[58px] shrink-0">
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <circle cx="29" cy="29" r="26.5" stroke="#8B2020" strokeWidth="1.8" strokeDasharray="3 2.2" opacity="0.33" />
          <circle cx="29" cy="29" r="21" stroke="#8B2020" strokeWidth="1" opacity="0.26" />
          <text x="29" y="24" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="700" fill="#8B2020" opacity="0.33" letterSpacing="1.5">
            SINCE
          </text>
          <text x="29" y="35" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#8B2020" opacity="0.33">
            2019
          </text>
          <text x="29" y="44" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#8B2020" opacity="0.26">
            ★
          </text>
        </svg>
      </div>
      <div
        className="font-sans text-[0.56rem] uppercase leading-[1.95] tracking-[0.2em]"
        style={{ color: RECEIPT_SOFT }}
      >
        <div>Handcrafted</div>
        <div>with care</div>
        <div>since 2019</div>
      </div>
    </div>
  );
}

function NavRow({
  label,
  path,
  code,
}: {
  label: string;
  path: string;
  code: string;
}) {
  return (
    <li className="border-b border-dotted py-[7.5px]" style={{ borderColor: "rgba(90,50,15,0.15)" }}>
      <Link to={path} className="group flex items-center gap-2 whitespace-nowrap">
        <span className="font-serif text-[0.9rem] font-semibold transition-colors group-hover:text-[#C49A3C]" style={{ color: RECEIPT_INK }}>
          {label}
        </span>
        <span className="mb-[3px] min-w-[12px] flex-1 border-b border-dotted" style={{ borderColor: "rgba(90,50,15,0.15)" }} />
        <span className="font-sans text-[0.56rem] tracking-[0.2em]" style={{ color: RECEIPT_GOLD }}>
          {code}
        </span>
      </Link>
    </li>
  );
}

const Footer = () => {
  const { data: siteSettings } = useSiteSettings();
  if (!siteSettings) return null;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const navLinks = siteSettings.footerLinks.map((link, index) => ({
    ...link,
    code: `PG-${String(index + 1).padStart(3, "0")}`,
  }));

  return (
    <footer className="bg-[#140800] px-0 pb-0 pt-0 text-white" role="contentinfo">
      <div className="mx-auto max-w-none">
        <div className="mx-auto max-w-[1920px]">
          <div className="relative">
            <ZigZagEdge position="top" />

            <div
              className="relative overflow-hidden px-5 py-9 shadow-[0_-8px_48px_rgba(0,0,0,0.5)] sm:px-7 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-20"
              style={{
                backgroundColor: RECEIPT_BG,
                color: RECEIPT_INK,
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent 0px, transparent 27px, rgba(130,85,30,0.05) 27px, rgba(130,85,30,0.05) 28px)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-brand text-[7rem] font-normal tracking-[0.24em] text-[rgba(160,100,30,0.04)] md:text-[9.4rem]"
                style={{ transform: "translate(-50%, -50%) rotate(-12deg)", top: "50%", left: "50%", position: "absolute", whiteSpace: "nowrap" }}
                aria-hidden="true"
              >
                RD CAFE
              </div>

              <div className="relative z-10">
                <div
                  className="text-center font-sans text-[0.58rem] uppercase tracking-[0.18em] sm:text-[0.56rem] sm:tracking-[0.24em]"
                  style={{ color: `${RECEIPT_SOFT}` }}
                >
                  Order #00247 · Table 4 · Dine In
                </div>

                <div className="mt-4 grid items-end gap-4 border-b pb-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:text-left" style={{ borderColor: "rgba(196,154,60,0.16)" }}>
                  <div className="order-2 font-sans text-[0.68rem] uppercase tracking-[0.16em] lg:order-1 lg:text-[0.62rem] lg:tracking-[0.22em]" style={{ color: RECEIPT_SOFT }}>
                    {formattedDate}
                  </div>

                  <div className="order-1 text-center lg:order-2">
                    <h2 className="font-brand text-[2.35rem] font-normal leading-none tracking-[0.14em] sm:text-[2.85rem] md:text-[3.25rem] lg:text-[3.5rem] lg:tracking-[0.2em] xl:text-[4rem]" style={{ color: RECEIPT_INK }}>
                      RD CAFE
                    </h2>
                    <p className="mt-3 px-2 font-display text-[1rem] italic leading-relaxed sm:px-0 md:text-[1.14rem] lg:text-[1.28rem]" style={{ color: RECEIPT_MID }}>
                      A warm corner for slow pours, quiet mornings, and good company.
                    </p>
                  </div>

                  <div className="order-3 text-center font-sans text-[0.68rem] uppercase tracking-[0.16em] lg:text-right lg:text-[0.62rem] lg:tracking-[0.22em]" style={{ color: RECEIPT_SOFT }}>
                    {siteSettings.addressLines.join(" · ")}
                  </div>
                </div>

                <div className="grid gap-8 border-b py-7 sm:gap-9 md:grid-cols-2 md:gap-x-10 md:py-8 xl:grid-cols-[1.2fr_0.95fr_0.85fr_1fr] xl:gap-x-14" style={{ borderColor: "rgba(196,154,60,0.16)" }}>
                  <div className="flex flex-col gap-5">
                    <div>
                      <div className="font-brand text-[2.35rem] font-normal leading-none tracking-[0.13em] sm:text-[2.8rem] md:text-[3.1rem] lg:text-[3.4rem] lg:tracking-[0.16em]" style={{ color: RECEIPT_INK }}>
                        RD <span style={{ color: RECEIPT_GOLD }}>CAFE</span>
                      </div>
                      <div className="mt-3 font-sans text-[0.58rem] uppercase tracking-[0.18em] sm:text-[0.56rem] sm:tracking-[0.28em] lg:tracking-[0.32em]" style={{ color: RECEIPT_SOFT }}>
                        Est. 2019 · {siteSettings.addressLines[0]}
                      </div>
                    </div>

                    <p className="max-w-[28rem] font-display text-[1rem] italic leading-[1.75] sm:text-[1.08rem] md:text-[1.12rem] lg:text-[1.18rem]" style={{ color: RECEIPT_MID }}>
                      {siteSettings.footerDescription}
                    </p>

                    <Stamp />
                  </div>

                  <div>
                    <SectionHeading>Explore</SectionHeading>
                      <ul>
                        {navLinks.map((link) => (
                          <NavRow key={link.path} label={link.label} path={link.path} code={link.code} />
                        ))}
                      </ul>
                  </div>

                  <div>
                    <SectionHeading>Opening Hours</SectionHeading>
                    <div className="space-y-0">
                      {siteSettings.businessHours.map((entry, index) => (
                        <div
                          key={entry.label}
                          className={`flex items-baseline justify-between gap-4 py-[11px] font-sans text-[0.76rem] uppercase tracking-[0.08em] sm:text-[0.72rem] sm:tracking-[0.1em] ${index < siteSettings.businessHours.length - 1 ? "border-b" : ""}`}
                          style={{
                            borderColor: "rgba(196,154,60,0.12)",
                            color: RECEIPT_INK,
                          }}
                        >
                          <span className="font-semibold">{entry.label.replace(" to ", " — ").replace("Monday", "MON").replace("Friday", "FRI").replace("Saturday", "SAT").replace("Sunday", "SUN")}</span>
                          <span style={{ color: RECEIPT_GOLD }}>{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionHeading>Contact</SectionHeading>
                    <div className="space-y-0">
                      {[
                        { icon: "◎", text: siteSettings.addressLines.join(", ") },
                        { icon: "✆", text: siteSettings.phone, href: `tel:${siteSettings.phone.replace(/[^\d+]/g, "")}` },
                        {
                          icon: "⌘",
                          text: "Reservations",
                          custom: (
                            <span className="flex flex-wrap gap-x-2 gap-y-1">
                              {RESERVATION_LINKS.map((link, linkIndex) => (
                                <span key={link.label} className="inline-flex items-center gap-2">
                                  <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-[#1E0C02]">
                                    {link.label}
                                  </a>
                                  {linkIndex < RESERVATION_LINKS.length - 1 ? <span>·</span> : null}
                                </span>
                              ))}
                            </span>
                          ),
                        },
                      ].map((item, index, items) => (
                        <div
                          key={item.text}
                          className={`flex items-start gap-3 py-[10px] font-sans text-[0.84rem] leading-[1.75] sm:text-[0.76rem] ${index < items.length - 1 ? "border-b" : ""}`}
                          style={{ borderColor: "rgba(196,154,60,0.12)", color: RECEIPT_MID }}
                        >
                          <span style={{ color: RECEIPT_GOLD }}>{item.icon}</span>
                          {"custom" in item && item.custom ? (
                            item.custom
                          ) : item.href ? (
                            <a href={item.href} className="hover:text-[#1E0C02]">
                              {item.text}
                            </a>
                          ) : (
                            <span>{item.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid items-center gap-6 pt-6 text-center lg:grid-cols-3 lg:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 font-sans text-[0.74rem] sm:text-[0.72rem] lg:justify-start" style={{ color: RECEIPT_MID }}>
                    {["rdcafe.ig", "rdcafe.fb", "rdcafe.tt"].map((handle, index) => (
                      <div key={handle} className="flex items-center gap-3">
                        <span className="whitespace-nowrap">
                          <span style={{ color: RECEIPT_GOLD }}>@</span>
                          {handle}
                        </span>
                        {index < 2 ? <span style={{ color: "rgba(30,12,2,0.2)" }}>·</span> : null}
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="font-serif text-[1.25rem] italic sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.55rem]" style={{ color: RECEIPT_INK }}>
                      Thank you for visiting ☕
                    </p>
                    <p className="mt-2 font-sans text-[0.54rem] uppercase tracking-[0.24em] sm:text-[0.58rem] sm:tracking-[0.3em]" style={{ color: RECEIPT_SOFT }}>
                      Come back soon · We saved your seat
                    </p>
                  </div>

                  <div className="flex flex-col items-center lg:items-end">
                    <div
                      className="rounded-full border border-dashed px-4 py-2 font-sans text-[0.54rem] uppercase tracking-[0.24em] sm:px-5 sm:text-[0.58rem] sm:tracking-[0.34em]"
                      style={{
                        color: RECEIPT_INK,
                        borderColor: "rgba(30,12,2,0.18)",
                        background: "rgba(255,255,255,0.18)",
                      }}
                    >
                      RD-CAFE-2026-COZY
                    </div>
                    <div
                      className="mt-3 font-sans text-[0.5rem] uppercase tracking-[0.22em]"
                      style={{ color: RECEIPT_SOFT }}
                    >
                      cozy table receipt
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ZigZagEdge position="bottom" />
          </div>
        </div>

        <div
          className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-2 px-4 py-3 text-center font-sans text-[0.56rem] uppercase tracking-[0.16em] text-white/25 md:flex-row md:px-3 md:text-left md:tracking-[0.2em]"
        >
          <span>{siteSettings.footerBottomLeft.replace("2026", `${new Date().getFullYear()}`)}</span>
          <span>{siteSettings.footerBottomRight}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
