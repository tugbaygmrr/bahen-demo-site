"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Mekanik Proje ve Tasarım",
    hint: "Sistem seçimi, hesap ve üretime hazır dokümantasyon.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 20h8M12 17v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M9 9.5 12 7l3 2.5v3H9v-3Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Mekanik Uygulama",
    hint: "Sahada koordinasyon, kalite ve devreye alma disiplini.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4l6.4 6.4a4.5 4.5 0 0 0 6.4-6.4l-6.4-6.4Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M5 19 9 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "İnşai Proje - İnşai Uygulama",
    hint: "Mekanik ile uyumlu inşai çözümler ve uygulama takibi.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 20V9l4-2v11M10 20V6l4-2v16M16 20V11l4-2v11"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M3 20h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

const highlights = [
  {
    title: "Tek Sorumluluk",
    desc: "Uçtan uca güvenilir çözüm",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
        <path
          d="M12 3 5 6v6c0 4.2 3 7.6 7 8.8 4-1.2 7-4.6 7-8.8V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Saha Uyumlu",
    desc: "Gerçek ihtiyaçlara özel yaklaşım",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Ölçülebilir Sonuçlar",
    desc: "Performans odaklı süreç yönetimi",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
        <path d="M4 18V6M4 18h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M8 14l3-3 3 2 4-5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function KurumsalSection() {
  return (
    <section
      id="kurumsal"
      className="relative overflow-hidden border-b border-bahen-border bg-bahen-surface-muted"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #b0b5c0 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          maskImage: "radial-gradient(ellipse 80% 80% at 0% 100%, black, transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-56 w-72 opacity-[0.18]"
        aria-hidden
      >
        <svg viewBox="0 0 280 180" className="h-full w-full" fill="none" preserveAspectRatio="none">
          <path
            d="M0 120C40 90 80 140 120 110s80-30 120 10 40 50 40 50"
            stroke="#9a9288"
            strokeWidth="1"
          />
          <path
            d="M0 150C50 120 100 160 150 130s90-20 130 20"
            stroke="#9a9288"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12 xl:gap-16">
          <div
            id="hakkimizda"
            className="scroll-mt-28 flex w-full min-w-0 flex-col items-start gap-8 md:gap-9 lg:h-full lg:justify-between lg:gap-0"
          >
            <div className="w-full space-y-7 md:space-y-8">
            <p className="flex w-full items-center gap-2.5 text-left text-[10px] font-semibold tracking-[0.28em] text-bahen-primary uppercase">
              <span className="h-px w-8 shrink-0 bg-bahen-primary/80" aria-hidden />
              Neyi farklı yapıyoruz
            </p>

            <h2 className="navbar-wordmark max-w-xl text-left text-balance text-[1.65rem] leading-[1.18] font-semibold tracking-[-0.03em] text-bahen-ink md:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.14]">
              Tasarım ve <span className="text-bahen-primary">uygulamayı</span> ayrık değil,{" "}
              <span className="block sm:inline">tek operasyon modeli olarak ele alıyoruz.</span>
            </h2>

            <p className="max-w-md text-left text-[15px] leading-relaxed text-bahen-muted md:text-base">
              Tek sorumluluk merkezi, sahayla uyumlu dokümantasyon ve ölçülebilir performans
              hedefleri.
            </p>
            </div>

            <ul className="grid w-full max-w-xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:py-6">
              {highlights.map((item) => (
                <li key={item.title} className="flex min-w-0 items-start gap-2.5 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-bahen-border/80 bg-bahen-surface text-bahen-muted">
                    {item.icon}
                  </span>
                  <div className="min-w-0 space-y-0.5 pt-0.5">
                    <p className="text-[13px] font-semibold leading-snug text-bahen-ink">{item.title}</p>
                    <p className="text-[12px] leading-snug text-bahen-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex w-full flex-wrap items-center gap-4 lg:pt-2">
              <a
                href="#projeler"
                className="inline-flex items-center gap-2 rounded-full bg-bahen-ink px-6 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-neutral-900"
              >
                Projeleri incele
                <span aria-hidden>→</span>
              </a>
              <a
                href="#surec"
                className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.14em] text-bahen-muted uppercase transition hover:text-bahen-ink"
              >
                Nasıl çalışıyoruz
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bahen-border bg-bahen-surface text-bahen-muted">
                  <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden>
                    <path d="M5 3.5v9l7-4.5-7-4.5Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-4 lg:grid lg:h-full lg:grid-rows-3 lg:gap-4">
            {services.map((service, idx) => (
              <motion.article
                key={service.title}
                className="flex w-full flex-1 items-center gap-4 rounded-2xl border border-bahen-border/70 bg-bahen-surface px-5 py-4 shadow-[0_8px_28px_-12px_rgba(28,24,20,0.12)] md:gap-5 md:px-6 md:py-5 lg:min-h-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
              >
                <div className="flex w-[3.25rem] shrink-0 items-center justify-end gap-3 md:w-[3.5rem] md:gap-4">
                  <span className="w-full text-right text-[2.15rem] font-light leading-none tabular-nums text-slate-300 md:text-[2.5rem]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="h-10 w-px shrink-0 bg-bahen-border" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <div className="min-w-0 space-y-1 text-left">
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-bahen-ink md:text-base">
                      {service.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-bahen-muted">{service.hint}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-bahen-muted">
                    {service.icon}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
