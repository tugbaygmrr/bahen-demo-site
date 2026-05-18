function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stats = [
  { Icon: IconCheck, value: "200+", label: "Tamamlanan proje" },
  { Icon: IconUsers, value: "100+", label: "Mutlu müşteri" },
  { Icon: IconCalendar, value: "15+", label: "Yıllık deneyim" },
  { Icon: IconShield, value: "7/24", label: "Teknik destek" },
] as const;

/** Hero altındaki yarı saydam istatistik bandı (referans düzen). */
export function HeroStatsStrip() {
  return (
    <div
      className="pointer-events-none w-full max-w-5xl rounded-2xl border border-bahen-border/70 bg-bahen-surface/90 px-4 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6 sm:py-5"
      aria-label="Öne çıkan rakamlar"
    >
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {stats.map(({ Icon, value, label }) => (
          <li key={label} className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bahen-ink text-white sm:h-11 sm:w-11">
              <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="font-sans text-lg font-bold tracking-[-0.02em] text-bahen-ink sm:text-xl">{value}</p>
              <p className="font-sans text-[11px] font-medium leading-snug text-bahen-muted sm:text-xs">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
