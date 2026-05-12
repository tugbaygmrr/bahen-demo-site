"use client";

import { motion, useScroll } from "framer-motion";
import { CtaPlayfulBackdrop } from "@/components/CtaPlayfulBackdrop";
import { HakkimizdaScrollSplit } from "@/components/HakkimizdaScrollSplit";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import { Navbar } from "@/components/Navbar";
import { ShowcaseStageSection } from "@/components/ShowcaseStageSection";

const services = [
  {
    title: "Mekanik Proje ve Tasarım",
    hint: "Sistem seçimi, hesap ve üretime hazır dokümantasyon.",
  },
  {
    title: "Mekanik Uygulama",
    hint: "Sahada koordinasyon, kalite ve devreye alma disiplini.",
  },
  {
    title: "İnşai Proje - İnşai Uygulama",
    hint: "Mekanik ile uyumlu inşai çözümler ve uygulama takibi.",
  },
] as const;

const projects = [
  {
    name: "Yüksek Yoğunluklu Karma Yapı",
    tag: "Devam Eden Proje",
  },
  {
    name: "Endüstri Tesisi Modernizasyonu",
    tag: "Tamamlanan Proje",
  },
  {
    name: "Kurumsal Kampüs Mekanik Altyapı",
    tag: "Devam Eden Proje",
  },
];

const bahenMarqueeRepeat = 10;

function BahenMarqueeStrip({ reverse }: { reverse?: boolean }) {
  const items = Array.from({ length: bahenMarqueeRepeat }, (_, i) => (
    <span key={`a-${i}`}>Bahen.</span>
  ));
  const itemsDup = Array.from({ length: bahenMarqueeRepeat }, (_, i) => (
    <span key={`b-${i}`}>Bahen.</span>
  ));

  return (
    <div
      className={
        reverse
          ? "bahen-marquee-strip bahen-marquee-strip-reverse"
          : "bahen-marquee-strip"
      }
    >
      <div className="bahen-marquee-track">{items}</div>
      <div className="bahen-marquee-track" aria-hidden="true">
        {itemsDup}
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "Proje süreciniz nasıl ilerliyor?",
    answer:
      "Süreci keşif, strateji, tasarım ve uygulama olmak üzere dört aşamada yönetiyoruz. Her aşamada teknik ihtiyaçları netleştirip onay mekanizmasıyla ilerliyoruz.",
  },
  {
    question: "Hangi tür yapılara hizmet veriyorsunuz?",
    answer:
      "Bina projeleri, endüstri tesisleri, kampüs yapıları ve teknik altyapı gerektiren karma yapılara özel mekanik mühendislik çözümleri sunuyoruz.",
  },
  {
    question: "Sadece proje mi çiziyorsunuz, uygulama da yapıyor musunuz?",
    answer:
      "Hem mekanik proje ve tasarım hem de sahada uygulama hizmeti veriyoruz. İhtiyaca göre uçtan uca veya belirli fazlarda destek sağlıyoruz.",
  },
  {
    question: "Teklif almak için hangi bilgiler gerekli?",
    answer:
      "Yapı tipi, metrekare, kullanım amacı, hedef takvim ve varsa mevcut proje dokümanları teklif sürecini hızlandırır.",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-w-0 w-full overflow-x-clip bg-[#050507] text-[#f4f4f4]">
      <Navbar />
      <motion.div className="progress-line" style={{ scaleX: scrollYProgress }} />

      <HeroScrollVideo>
        <div className="max-w-4xl space-y-8 md:space-y-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-white/88 uppercase">
              <span className="h-px w-6 shrink-0 bg-gradient-to-r from-amber-200 to-indigo-300" />
              Mekanik mühendislik
            </p>
            <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden />
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/78 uppercase">
              Daima İstenilen
            </p>
          </div>
          <div className="space-y-4 md:space-y-5">
            <h1 className="navbar-wordmark text-balance text-[1.75rem] leading-[1.12] font-bold tracking-[-0.03em] text-white md:text-[2.35rem] md:leading-[1.1] lg:text-[2.75rem] lg:leading-[1.08]">
              <span
                className="bg-gradient-to-br from-[#fff4dc] via-white to-[#d0dcff] bg-clip-text text-transparent"
                style={{
                  filter:
                    "drop-shadow(0 1px 0 rgba(0,0,0,0.28)) drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
                }}
              >
                Tasarımı, sahayı ve ölçülebilir performansı
              </span>{" "}
              <span className="mt-1.5 block md:mt-2">
                <span
                  className="bg-gradient-to-r from-white via-white to-white/92 bg-clip-text text-transparent"
                  style={{
                    filter:
                      "drop-shadow(0 1px 0 rgba(0,0,0,0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
                  }}
                >
                  tek bir mühendislik akışında
                </span>{" "}
                <span className="text-white [text-shadow:0_1px_0_rgba(0,0,0,0.35),0_2px_12px_rgba(0,0,0,0.2)]">
                  birleştiriyoruz.
                </span>
              </span>
            </h1>
            <p className="max-w-lg font-sans text-[16px] font-semibold leading-relaxed tracking-[-0.01em] text-white md:text-[17px] md:leading-[1.65] [text-shadow:0_1px_0_rgba(0,0,0,0.45),0_2px_14px_rgba(0,0,0,0.35),0_0_1px_rgba(0,0,0,0.6)]">
              Karma yapılardan endüstri tesislerine: enerji, konfor ve güvenilirlik
              hedeflerinizi netleştirip uygulamaya taşıyoruz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            <a
              href="#iletisim"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-white to-white/95 px-7 py-2.5 font-sans text-sm font-bold text-[#050507] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition hover:to-white"
            >
              Birlikte planlayalım
            </a>
            <a
              href="#kurumsal"
              className="inline-flex items-center justify-center rounded-full border border-white/28 bg-white/[0.14] px-6 py-2.5 font-sans text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/[0.2]"
            >
              Nasıl çalışıyoruz
            </a>
          </div>
        </div>
      </HeroScrollVideo>

      <section
        id="kurumsal"
        className="relative overflow-hidden border-b border-white/[0.06]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_15%_20%,rgba(127,155,255,0.09),transparent_55%),radial-gradient(ellipse_60%_45%_at_85%_75%,rgba(245,215,138,0.05),transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-20 lg:items-start">
            <div id="hakkimizda" className="scroll-mt-0 space-y-7">
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-white/45 uppercase">
                <span className="h-px w-6 bg-gradient-to-r from-amber-300/80 to-indigo-400/60" />
                Neyi farklı yapıyoruz
              </p>
              <h2 className="navbar-wordmark text-balance text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white md:text-[2.35rem] lg:text-[2.65rem]">
                <span
                  className="bg-gradient-to-br from-[#f5d78a] via-[#f5f5f5] to-[#8aa3ff] bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.35))" }}
                >
                  Tasarım ve uygulamayı
                </span>{" "}
                <span className="text-white/78">ayrık değil,</span>
                <span className="mt-1 block text-white/[0.94] md:mt-1.5">
                  <span className="bg-gradient-to-r from-white via-white to-white/75 bg-clip-text text-transparent">
                    tek operasyon modeli
                  </span>{" "}
                  olarak ele alıyoruz.
                </span>
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-white/52 md:text-base">
                Tek sorumluluk merkezi, sahayla uyumlu dokümantasyon ve ölçülebilir
                performans hedefleri.
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              {services.map((service, idx) => (
                <motion.article
                  key={service.title}
                  className="group relative overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.045] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)_inset] md:p-7"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: idx * 0.08, duration: 0.55 }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(138,163,255,0.14),transparent_68%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(245,215,138,0.08),transparent_70%)] opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
                  <div className="relative flex gap-5">
                    <div className="flex shrink-0 pt-0.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-transparent text-[11px] font-bold tabular-nums tracking-wider shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
                        <span className="bg-gradient-to-br from-[#f5d78a] via-[#f0f0f0] to-[#8aa3ff] bg-clip-text text-transparent">
                          0{idx + 1}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                      <h3 className="text-lg font-semibold tracking-tight text-white/95 md:text-xl">
                        {service.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-white/45 md:text-sm">
                        {service.hint}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ShowcaseStageSection />

      <section
        id="surec"
        className="relative overflow-hidden border-y border-white/[0.06]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_85%_15%,rgba(127,155,255,0.08),transparent_55%),radial-gradient(ellipse_55%_45%_at_10%_80%,rgba(245,215,138,0.05),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%,rgba(5,5,7,0.4))]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-28 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-max lg:self-start">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-white/45 uppercase">
              <span className="h-px w-6 bg-gradient-to-r from-amber-300/80 to-indigo-400/60" />
              Süreç
            </p>
            <h2 className="navbar-wordmark mt-6 text-balance text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white md:text-[2.15rem] lg:text-[2.45rem]">
              <span
                className="bg-gradient-to-br from-[#f5d78a] via-[#f5f5f5] to-[#8aa3ff] bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.35))" }}
              >
                Keşif, strateji,
              </span>
              <span className="mt-1 block text-white/[0.92] md:mt-1.5">
                tasarım ve uygulama.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/50 md:text-[15px]">
              Dört fazda tek çizgide ilerliyoruz; her adımda net çıktı ve onay noktası.
            </p>
          </div>

          <div className="relative space-y-4 md:space-y-3.5">
            <div
              className="absolute top-3 bottom-3 left-[15px] hidden w-px md:block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245,215,138,0.35) 0%, rgba(138,163,255,0.35) 50%, rgba(255,255,255,0.06) 100%)",
              }}
              aria-hidden
            />
            {[
              "Keşif ve araştırma ile yapıya özel teknik ihtiyaçların netleştirilmesi.",
              "Ölçülebilir hedeflerle sistem stratejisinin belirlenmesi.",
              "Üretime hazır mekanik proje dokümantasyonunun oluşturulması.",
              "Sahada disiplinli uygulama, test ve devreye alma.",
            ].map((item, idx) => (
              <motion.article
                key={item}
                className="group relative overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-white/[0.025] py-6 pr-5 pl-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.07)_inset] md:pl-16"
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
                  aria-hidden
                />
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(138,163,255,0.12),transparent_65%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                <span className="absolute top-[2.15rem] left-[15px] hidden -translate-x-1/2 md:block">
                  <span className="relative flex h-3 w-3 rounded-full border border-white/30 bg-[#050507] shadow-[0_0_14px_rgba(245,215,138,0.4)]">
                    <span className="absolute inset-0.5 rounded-full bg-gradient-to-br from-amber-200/90 to-indigo-400/85" />
                  </span>
                </span>
                <p className="mb-2.5 text-[10px] font-semibold tracking-[0.2em] text-white/42 uppercase md:mb-3">
                  Adım 0{idx + 1}
                </p>
                <p className="text-[15px] leading-relaxed text-white/[0.88] md:text-[17px] md:leading-relaxed">
                  {item}
                </p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-amber-200/40 to-indigo-400/35 transition-all duration-500 group-hover:w-full md:mt-5" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <HakkimizdaScrollSplit />

      <section
        id="projeler"
        className="relative z-[1] scroll-mt-20 overflow-hidden bg-[#050507]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(127,155,255,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,215,138,0.07),transparent_68%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/42 uppercase">
                <span className="h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-amber-300 to-indigo-400" />
                Seçili projeler
              </p>
              <h2 className="navbar-wordmark mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:tracking-[-0.04em]">
                <span className="text-white">Platform, tesis, </span>
                <span className="bg-gradient-to-br from-[#f5d78a] via-white to-[#8aa3ff] bg-clip-text text-transparent">
                  yapı.
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-white/48 md:text-[15px]">
                Karma kullanım, endüstri ve kampüs ölçeğinde referans
                çalışmalarımızdan seçilmiş örnekler.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {projects.map((project, idx) => {
              const isCompleted = project.tag.toLowerCase().includes("tamamlanan");
              return (
                <motion.article
                  key={project.name}
                  className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.038] hover:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)_inset] md:min-h-[240px] md:p-7"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: idx * 0.09 }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(138,163,255,0.15),transparent_62%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(245,215,138,0.1),transparent_65%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={
                        isCompleted
                          ? "inline-flex w-fit rounded-full border border-emerald-300/22 bg-emerald-400/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-emerald-100/78 uppercase"
                          : "inline-flex w-fit rounded-full border border-amber-200/22 bg-amber-200/[0.08] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-amber-50/80 uppercase"
                      }
                    >
                      {project.tag}
                    </span>
                    <span className="pt-0.5 text-[11px] font-medium tabular-nums text-white/22">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-auto pt-10 text-xl leading-snug font-medium tracking-[-0.02em] text-white md:pt-12 md:text-[1.35rem]">
                    {project.name}
                  </h3>

                  <div className="mt-5 h-px w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-0 bg-gradient-to-r from-amber-200/55 to-indigo-400/45 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="sss"
        className="faq-section px-5 py-12 pb-16 md:px-10 md:py-16 md:pb-24"
      >
        <img
          src="/faq-bg.png?v=2"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          loading="eager"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.48] saturate-[0.9] [object-position:78%_42%] md:opacity-[0.52] md:[object-position:82%_38%]"
          aria-hidden
        />
        <div className="faq-bg-wash" aria-hidden="true" />
        <div className="faq-content-wrap mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-white/[0.035] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_32px_90px_-40px_rgba(0,0,0,0.65)] backdrop-blur-md md:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(138,163,255,0.12),transparent_68%)] blur-2xl"
              aria-hidden
            />

            <div className="relative mb-10 max-w-3xl space-y-4 md:mb-12">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/45 uppercase">
                <span className="h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-amber-300 to-indigo-400" />
                Sıkça Sorulan Sorular
              </p>
              <h2 className="navbar-wordmark text-balance text-3xl leading-[1.12] font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08] md:tracking-[-0.04em]">
                <span className="text-white">Süreç ve hizmet modelimiz </span>
                <span className="bg-gradient-to-br from-[#f5d78a] via-white to-[#8aa3ff] bg-clip-text text-transparent">
                  hakkında merak edilenler.
                </span>
              </h2>
              <p className="text-[14px] leading-relaxed text-white/50 md:text-[15px]">
                Aşağıdaki başlıklara tıklayarak yanıtları açabilirsiniz.
              </p>
            </div>

            <div className="relative space-y-3 md:space-y-3.5">
              {faqs.map((faq, idx) => (
                <motion.details
                  key={faq.question}
                  className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition duration-300 hover:border-white/[0.14] hover:from-white/[0.08] open:border-white/[0.13] open:from-white/[0.07] open:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4.5 pr-4 text-left text-[15px] font-medium text-white md:px-6 md:py-5 md:text-[17px] [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1 leading-snug">{faq.question}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[20px] font-light leading-none text-white/55 transition duration-300 group-open:rotate-45 group-open:border-amber-200/25 group-open:bg-amber-200/[0.08] group-open:text-amber-100/90">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-white/[0.07] bg-black/15 px-5 pb-5 pt-1 md:px-6 md:pb-6">
                    <p className="max-w-3xl pt-3 text-sm leading-relaxed text-white/[0.72] md:pt-4 md:text-base md:leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        id="iletisim"
        className="relative overflow-hidden border-t border-white/[0.06] bg-[#060608] px-5 py-24 md:px-10 md:py-32"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(127,155,255,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_100%,rgba(245,215,138,0.06),transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050507]/80 via-transparent to-[#050507]"
          aria-hidden
        />

        <CtaPlayfulBackdrop dark />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-white/45 uppercase">
            Bize ulaşın
          </p>
          <h2 className="navbar-wordmark mt-5 text-balance text-[2rem] leading-[1.12] font-bold tracking-[-0.03em] text-white sm:text-4xl md:mt-6 md:text-5xl md:leading-[1.08] lg:text-[3.25rem]">
            Yeni bir proje başlatalım,
            <br />
            <span className="bg-gradient-to-br from-[#f5d78a] via-white to-[#a8b8ff] bg-clip-text text-transparent">
              mevcut yapınızı birlikte güçlendirelim.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/58 md:mt-8 md:text-lg md:leading-relaxed">
            Mekanik proje ve uygulama ihtiyaçlarınız için keşiften devreye almaya kadar
            uçtan uca destek sunuyoruz; bir e-posta ile süreci başlatabilirsiniz.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-12">
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-b from-[#FFEB7A] to-[#E8C030] px-8 py-3.5 text-sm font-bold text-[#12131A] shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition hover:brightness-[1.05] sm:w-auto"
              href="mailto:info@bahen.com.tr?subject=Teklif%20talebi"
            >
              Teklif al
            </a>
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/18 bg-white/[0.05] px-8 py-3.5 text-sm font-semibold text-white/92 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:border-white/28 hover:bg-white/[0.09] sm:w-auto"
              href="mailto:info@bahen.com.tr"
            >
              E-posta gönder
            </a>
          </div>

          <p className="mt-8 text-sm text-white/45 md:mt-10">
            <span className="font-medium text-white/65">info@bahen.com.tr</span>
            <span className="mx-2 text-white/30" aria-hidden>
              ·
            </span>
            İstanbul / Türkiye
          </p>
        </div>
      </motion.section>

      <section id="proje-gorselleri" className="bahen-signature-wrap">
        <div className="bahen-marquee bahen-marquee-top" aria-hidden="true">
          <BahenMarqueeStrip />
        </div>

        <div className="bahen-marquee bahen-marquee-bottom" aria-hidden="true">
          <BahenMarqueeStrip reverse />
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-gradient-to-b from-black/55 to-[#050507]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-3 md:gap-16 md:px-10 md:py-16">
          <div className="space-y-4">
            <p className="navbar-wordmark text-sm font-semibold tracking-tight text-white">Bahen.</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Bina ve endüstri tesislerine yönelik mekanik tesisat mühendisliği
              danışmanlık, tasarım ve uygulama hizmetleri.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/38 uppercase">
              Hızlı erişim
            </p>
            <nav className="flex flex-col gap-2.5 text-sm text-white/72" aria-label="Alt bilgi">
              <a className="transition hover:text-white" href="#hero">
                Ana sayfa
              </a>
              <a className="transition hover:text-white" href="#kurumsal">
                Kurumsal
              </a>
              <a className="transition hover:text-white" href="#hakkimizda">
                Hakkımızda
              </a>
              <a className="transition hover:text-white" href="#proje-gorselleri">
                Proje görselleri
              </a>
              <a className="transition hover:text-white" href="#proje-sahnesi">
                Proje sahnesi
              </a>
              <a className="transition hover:text-white" href="#projeler">
                Projeler
              </a>
              <a className="transition hover:text-white" href="#iletisim">
                İletişim
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-white/38 uppercase">
              İletişim
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/72">
              <a className="transition hover:text-white" href="mailto:info@bahen.com.tr">
                info@bahen.com.tr
              </a>
              <a className="transition hover:text-white" href="tel:+902120000000">
                +90 (212) 000 00 00
              </a>
              <p className="text-white/50">İstanbul / Türkiye</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[12px] text-white/45 md:flex-row md:items-center md:justify-between md:px-10">
            <p>© {new Date().getFullYear()} Bahen Mühendislik. Tüm hakları saklıdır.</p>
            <p className="text-white/40">Daima İstenilen.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
