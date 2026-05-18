"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { seciliProjeler, type SeciliProje } from "@/data/secili-projeler";

function proxyImage(url: string) {
  return `/api/img?url=${encodeURIComponent(url)}`;
}

function ProjectIcon({ type }: { type: SeciliProje["icon"] }) {
  if (type === "factory") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 20V10l4-2v12M10 20V6l4-2v16M16 20v-8l4-2v10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M3 20h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "campus") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M6 20V8l6-4 6 4v12M9 20v-5h6v5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 20h6M12 18v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 12h8M8 9h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function SeciliProjelerSection() {
  return (
    <section
      id="projeler"
      className="relative scroll-mt-20 overflow-hidden border-b border-bahen-border bg-bahen-surface-muted"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(42%,320px)] opacity-[0.35] [background-image:radial-gradient(circle,rgba(30,58,95,0.22)_1px,transparent_1px)] [background-size:22px_22px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <header className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.28em] text-bahen-primary uppercase">
            <span className="h-px w-8 shrink-0 bg-bahen-primary/80" aria-hidden />
            Seçili projeler
          </p>
          <h2 className="navbar-wordmark mt-6 text-balance text-[1.85rem] font-semibold leading-[1.14] tracking-[-0.03em] text-bahen-ink md:mt-7 md:text-[2.65rem] lg:text-[2.85rem]">
            Platform, tesis,{" "}
            <span className="text-bahen-primary">yapı.</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-bahen-muted md:text-base">
            Karma kullanım, endüstri ve kampüs ölçeğinde referans çalışmalarımızdan
            seçilmiş örnekler.
          </p>
          <span className="mt-5 block h-px w-10 bg-bahen-primary/70" aria-hidden />
        </header>

        <ul className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {seciliProjeler.map((project, idx) => {
            const isCompleted = project.tag === "Tamamlanan Proje";
            return (
              <li key={project.name} className="flex">
                <motion.article
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-bahen-border/80 bg-bahen-surface shadow-[0_10px_36px_-18px_rgba(10,15,20,0.14)] transition duration-300 hover:-translate-y-0.5 hover:border-bahen-primary/20 hover:shadow-[0_16px_44px_-16px_rgba(10,15,20,0.18)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                    <Image
                      src={proxyImage(project.imageUrl)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,20,0.35)_0%,transparent_42%,rgba(10,15,20,0.2)_100%)]"
                      aria-hidden
                    />
                    <span
                      className={
                        isCompleted
                          ? "absolute top-3 left-3 rounded-full border border-emerald-200/80 bg-emerald-50/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-emerald-900 uppercase backdrop-blur-sm md:px-3 md:text-[10px]"
                          : "absolute top-3 left-3 rounded-full border border-white/50 bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-bahen-ink uppercase backdrop-blur-sm md:px-3 md:text-[10px]"
                      }
                    >
                      {project.tag.toUpperCase()}
                    </span>
                    <span className="absolute top-3 right-3 text-[11px] font-semibold tabular-nums text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
                    <span
                      className={
                        isCompleted
                          ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"
                          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bahen-primary/10 text-bahen-primary"
                      }
                    >
                      <ProjectIcon type={project.icon} />
                    </span>
                    <h3 className="navbar-wordmark mt-4 min-h-[2.65rem] line-clamp-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-bahen-ink md:min-h-[2.85rem] md:text-[1.15rem]">
                      {project.name}
                    </h3>
                    <p className="mt-2 min-h-[3.75rem] flex-1 text-[13px] leading-relaxed text-bahen-muted line-clamp-3 md:min-h-[4rem] md:text-[14px]">
                      {project.description}
                    </p>
                    <a
                      href="#iletisim"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-bold tracking-[0.18em] text-bahen-primary uppercase transition group-hover:gap-2.5"
                    >
                      Detayları görüntüle
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </motion.article>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-3 text-center md:mt-16">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bahen-border bg-bahen-surface text-bahen-primary shadow-sm"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M6 20V9l6-4 6 4v11M9 20v-4h6v4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M4 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <p className="max-w-md text-[14px] leading-relaxed text-bahen-muted">
            Daha fazla proje için bizimle{" "}
            <a
              href="#iletisim"
              className="font-semibold text-bahen-primary underline decoration-bahen-primary/40 underline-offset-2 transition hover:decoration-bahen-primary"
            >
              iletişime geçin
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
