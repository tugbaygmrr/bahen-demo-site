"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Keşif ve araştırma",
    description: "Yapıya özel teknik ihtiyaçların netleştirilmesi.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Strateji ve hedefler",
    description: "Ölçülebilir hedeflerle sistem stratejisinin belirlenmesi.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Proje dokümantasyonu",
    description: "Üretime hazır mekanik proje dokümantasyonunun oluşturulması.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M8 4h8l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M14 4v4h4M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Uygulama ve devreye alma",
    description: "Sahada disiplinli uygulama, test ve devreye alma.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 18v-5l4-2 4 2v5M12 18v-5l4-2 4 2v5M8 9V5l4-2 4 2v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export function SurecSection() {
  return (
    <section
      id="surec"
      className="relative z-10 scroll-mt-20 overflow-hidden border-y border-bahen-border bg-bahen-surface-muted"
    >
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex min-w-0 flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <p className="flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.28em] text-bahen-primary uppercase">
                <span className="h-px w-8 shrink-0 bg-bahen-primary/80" aria-hidden />
                Süreç
              </p>

              <h2 className="navbar-wordmark mt-7 max-w-md text-left text-balance text-[1.65rem] leading-[1.18] font-semibold tracking-[-0.03em] text-bahen-ink md:mt-8 md:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.14]">
                Keşif, <span className="text-bahen-primary">strateji</span>,{" "}
                <span className="block sm:inline">tasarım ve uygulama.</span>
              </h2>

              <p className="mt-5 max-w-md text-left text-[15px] leading-relaxed text-bahen-muted md:mt-6 md:text-base">
                Dört fazda tek çizgide ilerliyoruz; her adımda net çıktı ve onay noktası.
              </p>
            </motion.div>

            <div className="relative mt-8 aspect-[5/3] w-full max-w-lg min-h-[200px] overflow-hidden rounded-2xl border border-bahen-border/60 bg-[#d4d5cc] shadow-[0_12px_40px_-16px_rgba(10,15,20,0.2)] md:mt-10">
              <Image
                src="/surec-industrial.png"
                alt="Mekanik tesis boru, vana ve manometre detayı"
                fill
                unoptimized
                className="object-cover object-center contrast-[1.03] saturate-[0.85]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(30,58,95,0.18)_0%,transparent_45%,rgba(10,15,20,0.12)_100%)]"
                aria-hidden
              />
            </div>
          </div>

          <div className="relative min-w-0 pl-0 lg:pl-2">
            <ul className="flex flex-col gap-4">
              {steps.map((step, idx) => (
                <li key={step.title}>
                  <motion.article
                    className="relative overflow-hidden rounded-2xl border border-bahen-border/60 bg-bahen-surface px-5 py-5 shadow-[0_8px_28px_-14px_rgba(10,15,20,0.12)] md:px-6 md:py-6"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                  >
                    <span
                      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 select-none text-[3.25rem] font-light leading-none tabular-nums text-bahen-primary/[0.12] md:right-5 md:text-[3.75rem]"
                      aria-hidden
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex gap-4 pr-10 md:gap-5 md:pr-12">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bahen-primary text-white">
                        {step.icon}
                      </span>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-[10px] font-semibold tracking-[0.22em] text-bahen-primary uppercase">
                          Adım {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-bahen-ink md:text-base">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-bahen-muted md:text-[14px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
