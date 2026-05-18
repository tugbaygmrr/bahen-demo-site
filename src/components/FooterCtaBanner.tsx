import Image from "next/image";

const NAVY = "#0A1A2F";

/** Footer üstü: görsel + metin + «Teklif al» CTA (yatay bant). */
export function FooterCtaBanner() {
  return (
    <section
      id="iletisim"
      className="scroll-mt-20 border-b border-bahen-border bg-background px-5 py-10 md:px-10 md:py-14"
      aria-labelledby="footer-cta-heading"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-bahen-surface shadow-[0_8px_30px_-12px_rgba(15,23,41,0.12)] md:rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Sol görsel */}
          <div className="relative h-[200px] w-full shrink-0 lg:h-auto lg:min-h-[280px] lg:w-[min(100%,380px)]">
            <Image
              src="/footer-cta-industrial.png"
              alt="Modern tesiste paslanmaz çelik boru hatları ve enstrümantasyon"
              fill
              className="object-cover object-[45%_center]"
              sizes="(min-width: 1024px) 380px, 100vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35% via-bahen-surface/55 to-bahen-surface lg:from-20% lg:via-bahen-surface/70 lg:to-bahen-surface"
              aria-hidden
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-8 px-6 py-8 md:px-8 md:py-10 lg:flex-row lg:items-center lg:gap-10 lg:py-8 lg:pr-10">
            {/* Metin */}
            <div className="min-w-0 flex-1 space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8a8075] uppercase">
                Birlikte çalışalım
              </p>
              <h2
                id="footer-cta-heading"
                className="text-balance text-[1.4rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem]"
                style={{ color: NAVY }}
              >
                Projeniz için doğru çözümü birlikte tasarlayalım
              </h2>
              <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-[#555555] md:text-base">
                Uzman ekibimiz, projenizin her aşamasında size özel çözümler sunmak için hazır.
              </p>
            </div>

            {/* CTA */}
            <div className="flex shrink-0 items-center lg:justify-end">
              <a
                href="mailto:info@bahen.com.tr?subject=Teklif%20talebi"
                className="inline-flex w-full min-w-0 items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-[13px] font-bold tracking-[0.12em] text-white uppercase shadow-md transition hover:opacity-92 sm:w-auto"
                style={{ backgroundColor: NAVY }}
              >
                Teklif al
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
