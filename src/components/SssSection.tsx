"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { sssItems, type SssIcon } from "@/data/sss-icerik";

function FaqIcon({ type }: { type: SssIcon }) {
  const cls = "h-5 w-5";
  switch (type) {
    case "helmet":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M12 4c-4 0-7 2-7 5v2c0 1 2 2 4 2h6c2 0 4-1 4-2V9c0-3-3-5-7-5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M5 11v2c0 3 3 5 7 5s7-2 7-5v-2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M12 21c-4-3-6-7-6-11a6 6 0 0 1 12 0c0 4-2 8-6 11Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M12 21V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M4 19c0-2.5 2-4 5-4M13 19c0-1.8 1.5-3 3.5-3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
          <path
            d="M8 4h8l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M14 4v4h4M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
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
}

export function SssSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="sss"
      className="scroll-mt-20 border-b border-bahen-border bg-bahen-surface-muted"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12 xl:gap-14">
          <div className="space-y-8 lg:sticky lg:top-28">
            <header className="max-w-md">
              <p className="flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.28em] text-bahen-primary uppercase">
                <span className="h-px w-8 shrink-0 bg-bahen-primary/80" aria-hidden />
                Sıkça sorulan sorular
              </p>
              <h2 className="navbar-wordmark mt-6 text-balance text-[1.85rem] font-semibold leading-[1.14] tracking-[-0.03em] text-bahen-ink md:text-[2.35rem] lg:text-[2.5rem]">
                Merak ettikleriniz, net cevaplar.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-bahen-muted md:text-base">
                Projelerimiz, süreçlerimiz ve hizmetlerimizle ilgili en çok merak edilen
                soruları sizin için derledik.
              </p>
              <span className="mt-5 block h-px w-10 bg-bahen-primary/70" aria-hidden />
            </header>

            <div className="relative overflow-hidden rounded-2xl border border-bahen-border/80 bg-bahen-surface p-6 shadow-[0_10px_36px_-18px_rgba(10,15,20,0.1)] md:p-7">
              <div
                className="pointer-events-none absolute top-0 right-0 h-24 w-24 opacity-40 [background-image:radial-gradient(circle,rgba(30,58,95,0.2)_1px,transparent_1px)] [background-size:14px_14px]"
                aria-hidden
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-bahen-primary/10 text-bahen-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M12 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12 6.75a3.25 3.25 0 0 0-3.25 3.25c0 .6.49 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.2-.86 2.2-2 2.43V15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <h3 className="navbar-wordmark relative mt-5 text-[1.1rem] font-semibold text-bahen-ink md:text-[1.15rem]">
                Başka sorunuz mu var?
              </h3>
              <p className="relative mt-2 text-[14px] leading-relaxed text-bahen-muted">
                Ekibimiz size yardımcı olmaktan memnuniyet duyar.
              </p>
              <a
                href="#iletisim"
                className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-bahen-primary px-5 py-3.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase transition hover:bg-bahen-primary-hover"
              >
                Bize ulaşın
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-3 md:gap-3.5">
            {sssItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <li key={item.question}>
                  <motion.div
                    className={`overflow-hidden rounded-2xl border bg-bahen-surface shadow-[0_6px_24px_-14px_rgba(10,15,20,0.1)] transition-colors ${
                      isOpen
                        ? "border-bahen-primary/25"
                        : "border-bahen-border/80 hover:border-bahen-primary/15"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-4 text-left md:gap-4 md:px-5 md:py-4.5"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bahen-primary/10 text-bahen-primary">
                        <FaqIcon type={item.icon} />
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-bahen-ink md:text-[15px]">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[18px] font-light leading-none transition ${
                          isOpen
                            ? "border-bahen-primary/30 bg-bahen-primary/10 text-bahen-primary"
                            : "border-bahen-border bg-bahen-surface-muted text-bahen-muted"
                        }`}
                        aria-hidden
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-bahen-border/70 bg-bahen-surface-muted/80 px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pl-[4.25rem]">
                        <p className="text-[13px] leading-relaxed text-bahen-muted md:text-[14px] md:leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ) : null}
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-bahen-border/80 bg-bahen-surface px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:px-6 md:mt-12 md:py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bahen-primary/10 text-bahen-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M8.5 5.5 6 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-2.5-2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9 5.5h6M10 11h4M10 14h2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-bahen-ink">
              Hızlıca yanıt almak mı istiyorsunuz?
            </p>
            <p className="mt-0.5 text-[13px] text-bahen-muted md:text-[14px]">
              Ekibimiz size en kısa sürede dönüş yapacaktır.
            </p>
          </div>
          <span className="hidden h-10 w-px shrink-0 bg-bahen-border sm:block" aria-hidden />
          <a
            href="#iletisim"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-bahen-ink/25 bg-transparent px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-bahen-ink uppercase transition hover:border-bahen-primary hover:text-bahen-primary sm:ml-auto"
          >
            İletişime geç
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
