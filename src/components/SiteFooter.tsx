"use client";

const FOOTER_NAVY = "#0A1A2F";

const SOCIAL = {
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
} as const;

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.7H3.8V20h3.14V8.7ZM5.37 3.2a1.81 1.81 0 1 0 0 3.62 1.81 1.81 0 0 0 0-3.62ZM20 13.23c0-2.93-.63-5.18-4.1-5.18-1.66 0-2.78.91-3.24 1.77h-.05V8.7H9.6V20h3.14v-5.59c0-1.32.25-2.6 1.89-2.6 1.61 0 1.63 1.5 1.63 2.67V20H20v-6.77Z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.805 4.805 0 0 0 12 7.2Zm0 7.85A3.05 3.05 0 1 1 15.05 12 3.053 3.053 0 0 1 12 15.05ZM16.93 5.9a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12Z"
        fill="currentColor"
      />
      <path
        d="M12 2c2.717 0 3.056.01 4.123.06 1.064.05 1.79.217 2.427.465.654.255 1.21.598 1.76 1.15.552.55.894 1.105 1.15 1.759.247.636.414 1.363.465 2.427.048 1.067.06 1.406.06 4.123s-.012 3.056-.06 4.123c-.05 1.064-.218 1.79-.465 2.427a4.72 4.72 0 0 1-1.15 1.76c-.55.551-1.106.893-1.76 1.148-.636.249-1.363.416-2.427.466-1.067.048-1.406.06-4.123.06s-3.056-.012-4.123-.06c-1.064-.05-1.79-.218-2.427-.465a4.72 4.72 0 0 1-1.76-1.15 4.72 4.72 0 0 1-1.148-1.759c-.249-.637-.416-1.364-.466-2.428C2.013 15.056 2 14.717 2 12s.012-3.056.06-4.122c.05-1.064.217-1.79.465-2.428.255-.653.598-1.209 1.15-1.759.55-.552 1.105-.894 1.759-1.149.637-.248 1.364-.415 2.428-.465C8.944 2.012 9.283 2 12 2Zm0 1.802c-2.67 0-2.987.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041s.01 2.986.058 4.04c.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344a3.1 3.1 0 0 0 1.15-.748c.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041s-.01-2.986-.058-4.04c-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.9 3.6 12 3.6 12 3.6s-7.9 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.5.5 9.4.5 9.4.5s7.9 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.7 31.7 0 0 0 .5-5.8 31.7 31.7 0 0 0-.5-5.8ZM9.6 15.4V8.6L15.8 12 9.6 15.4Z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v12H4V6Zm2 2 6 4 6-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a14.6 14.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 3.7 3.7 0 0 0 1.15.18 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 0 0 0 .18 1.15 1 1 0 0 1-.25 1l-2.2 2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.7 7-11a7 7 0 1 0-14 0c0 6.3 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const linkMuted = "text-[#666666] text-sm transition hover:text-[#0A1A2F]";
const heading = "navbar-wordmark text-[12px] font-bold tracking-[0.18em] text-[#0A1A2F] uppercase";

const socialBtn =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0A1A2F] text-white transition hover:opacity-90";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bahen-border bg-bahen-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_auto_repeat(4,minmax(0,1fr))] lg:gap-x-10 lg:gap-y-0">
          {/* Marka */}
          <div className="space-y-5">
            <div>
              <p className="navbar-wordmark text-xl font-bold tracking-tight text-[#0A1A2F] sm:text-[1.35rem]">
                BAHEN
              </p>
              <p className="mt-0.5 text-[11px] font-semibold tracking-[0.22em] text-[#888888] uppercase sm:text-xs">
                Mekanik Tesisat
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#666666]">
              Bahen Mekanik, mekanik tesisat alanında mühendislik, uygulama ve danışmanlık hizmetleri sunan
              güvenilir çözüm ortağınızdır.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Instagram"
              >
                <IconInstagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="YouTube"
              >
                <IconYouTube className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div
            className="hidden w-px shrink-0 self-stretch bg-[#d9d9d3] lg:block"
            aria-hidden
          />

          <div className="space-y-4">
            <p className={heading}>Kurumsal</p>
            <nav className="flex flex-col gap-2.5" aria-label="Kurumsal">
              <a className={linkMuted} href="#hakkimizda">
                Hakkımızda
              </a>
              <a className={linkMuted} href="#kurumsal">
                Vizyon &amp; Misyon
              </a>
              <a className={linkMuted} href="#kurumsal">
                Kalite politikamız
              </a>
              <a className={linkMuted} href="#iletisim">
                İnsan kaynakları
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <p className={heading}>Hizmetler</p>
            <nav className="flex flex-col gap-2.5" aria-label="Hizmetler">
              <a className={linkMuted} href="#kurumsal">
                Endüstriyel tesisat
              </a>
              <a className={linkMuted} href="#kurumsal">
                Su ve atık su tesisatı
              </a>
              <a className={linkMuted} href="#kurumsal">
                Proje ve danışmanlık
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <p className={heading}>Projeler</p>
            <nav className="flex flex-col gap-2.5" aria-label="Projeler">
              <a className={linkMuted} href="#projeler">
                Tamamlanan projeler
              </a>
              <a className={linkMuted} href="#projeler">
                Devam eden projeler
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <p className={heading}>İletişim</p>
            <ul className="flex flex-col gap-4 text-sm text-[#666666]">
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#0A1A2F]" aria-hidden>
                  <IconMail className="h-[18px] w-[18px]" />
                </span>
                <a className="transition hover:text-[#0A1A2F]" href="mailto:info@bahen.com.tr">
                  info@bahen.com.tr
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#0A1A2F]" aria-hidden>
                  <IconPhone className="h-[18px] w-[18px]" />
                </span>
                <a className="transition hover:text-[#0A1A2F]" href="tel:+902121234567">
                  +90 212 123 45 67
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[#0A1A2F]" aria-hidden>
                  <IconMap className="h-[18px] w-[18px]" />
                </span>
                <span className="leading-snug">
                  Küçükbakkalköy Mah., Kayışdağı Cad. No 69/4 Ataşehir – İstanbul
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-white/10 text-white" style={{ backgroundColor: FOOTER_NAVY }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 text-[12px] text-white/75 md:flex-row md:items-center md:justify-between md:px-10 md:py-5">
          <p className="shrink-0">© {year} Bahen Mekanik. Tüm hakları saklıdır.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <nav
              className="flex flex-wrap items-center gap-x-2 gap-y-1"
              aria-label="Yasal"
            >
              <a className="transition hover:text-white" href="#">
                KVKK
              </a>
              <span className="text-white/35" aria-hidden>
                |
              </span>
              <a className="transition hover:text-white" href="#">
                Gizlilik politikası
              </a>
              <span className="text-white/35" aria-hidden>
                |
              </span>
              <a className="transition hover:text-white" href="#">
                Çerez politikası
              </a>
            </nav>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-md bg-bahen-surface sm:self-center"
              aria-label="Yukarı çık"
              onClick={() => {
                const hero = document.getElementById("hero");
                if (hero) hero.scrollIntoView({ behavior: "smooth" });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <svg
                className="h-4 w-4 text-[#0A1A2F]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
