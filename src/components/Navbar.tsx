"use client";

import { useEffect, useRef, useState } from "react";

/** Gerçek hesap URL’lerinizi buraya yazın. */
const SOCIAL = {
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

const MAIL_HREF = "mailto:info@bahen.com.tr";

const navLinks = [
  { href: "#hero", label: "Ana sayfa" },
  { href: "#kurumsal", label: "Kurumsal" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#proje-gorselleri", label: "Proje görselleri" },
  { href: "#iletisim", label: "Bize ulaşın" },
] as const;

const projectsSubmenu = [
  { href: "#projeler", label: "Tüm projeler" },
  { href: "#proje-gorselleri", label: "Proje sahnesi" },
  { href: "#surec", label: "Süreç" },
] as const;

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

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.7H3.8V20h3.14V8.7ZM5.37 3.2a1.81 1.81 0 1 0 0 3.62 1.81 1.81 0 0 0 0-3.62ZM20 13.23c0-2.93-.63-5.18-4.1-5.18-1.66 0-2.78.91-3.24 1.77h-.05V8.7H9.6V20h3.14v-5.59c0-1.32.25-2.6 1.89-2.6 1.61 0 1.63 1.5 1.63 2.67V20H20v-6.77Z" />
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

function ChevronDown({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      className={`${className ?? ""} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const linkClass =
  "inline-flex items-center rounded-md px-2 py-2 text-[11px] font-semibold tracking-[0.12em] text-bahen-muted uppercase transition hover:bg-white hover:text-bahen-ink xl:px-2.5 xl:text-[11.5px]";

const linkClassHero =
  "inline-flex items-center rounded-md px-2 py-2 text-[11px] font-semibold tracking-[0.12em] text-white/88 uppercase transition hover:bg-white/10 hover:text-white xl:px-2.5 xl:text-[11.5px]";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [solidNav, setSolidNav] = useState(false);
  const projectsWrapRef = useRef<HTMLLIElement>(null);

  const effectiveSolid = solidNav || mobileOpen;

  useEffect(() => {
    const section = document.getElementById("kurumsal");
    if (!section) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const top = section.getBoundingClientRect().top;
      setSolidNav(top < 88);
    };
    const onScroll = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!projectsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (projectsWrapRef.current?.contains(e.target as Node)) return;
      setProjectsOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [projectsOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setProjectsOpen(false);
    setMobileProjectsOpen(false);
  };

  const desktopLinkClass = effectiveSolid ? linkClass : linkClassHero;

  const socialBtnClass = effectiveSolid
    ? "flex h-9 w-9 items-center justify-center rounded-lg border border-bahen-border bg-bahen-surface-muted text-bahen-muted transition hover:border-bahen-primary/30 hover:bg-white hover:text-bahen-ink"
    : "flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white transition hover:border-white/40 hover:bg-white/16";

  return (
    <header
      className={
        effectiveSolid
          ? "navbar-shell fixed top-0 right-0 left-0 z-[80] border-b border-bahen-border/90 bg-background/92 backdrop-blur-2xl backdrop-saturate-150"
          : "navbar-shell fixed top-0 right-0 left-0 z-[80] border-b border-white/10 bg-black/8 backdrop-blur-xl"
      }
    >
      <div
        className={
          effectiveSolid
            ? "pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-[#c5c9d0] to-transparent"
            : "pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        }
      />
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10 md:py-3.5"
        aria-label="Ana"
      >
        <a
          href="#hero"
          className={
            effectiveSolid
              ? "navbar-wordmark shrink-0 text-[15px] font-semibold tracking-tight text-bahen-ink transition hover:text-bahen-primary"
              : "navbar-wordmark shrink-0 text-[15px] font-semibold tracking-tight text-white transition hover:text-white/85"
          }
          onClick={closeAll}
        >
          Bahen.
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="flex items-center">
              <a href={href} className={desktopLinkClass}>
                {label}
              </a>
            </li>
          ))}
          <li className="relative flex items-center" ref={projectsWrapRef}>
            <button
              type="button"
              className={`${desktopLinkClass} gap-1`}
              aria-expanded={projectsOpen}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setProjectsOpen((v) => !v);
              }}
            >
              Projeler
              <ChevronDown open={projectsOpen} />
            </button>
            {projectsOpen ? (
              <ul
                className="absolute top-full left-0 z-[90] mt-1 min-w-[12.5rem] rounded-xl border border-bahen-border bg-bahen-surface py-1.5 shadow-[0_16px_40px_-8px_rgba(28,24,20,0.1)] backdrop-blur-xl"
                role="menu"
              >
                {projectsSubmenu.map(({ href, label }) => (
                  <li key={href + label} role="none">
                    <a
                      href={href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-[12px] font-medium tracking-wide text-bahen-muted transition hover:bg-bahen-surface-muted hover:text-bahen-ink"
                      onClick={() => setProjectsOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        </ul>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={MAIL_HREF}
            className="rounded-lg border border-black bg-black px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition hover:border-neutral-950 hover:bg-neutral-950"
          >
            Teklif alın
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={socialBtnClass}
            aria-label="Instagram"
          >
            <IconInstagram className="h-[18px] w-[18px]" />
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={socialBtnClass}
            aria-label="LinkedIn"
          >
            <IconLinkedIn className="h-[17px] w-[17px]" />
          </a>
          <a href={MAIL_HREF} className={socialBtnClass} aria-label="E-posta">
            <IconMail className="h-[18px] w-[18px]" />
          </a>
        </div>

        <button
          type="button"
          className={
            effectiveSolid
              ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bahen-border bg-bahen-surface-muted text-bahen-ink xl:hidden"
              : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white xl:hidden"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`border-t border-bahen-border bg-background/98 backdrop-blur-2xl xl:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-5 py-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="block rounded-xl px-3 py-3 text-[13px] font-semibold tracking-[0.12em] text-bahen-muted uppercase transition hover:bg-bahen-surface-muted hover:text-bahen-ink"
                onClick={closeAll}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[13px] font-semibold tracking-[0.12em] text-bahen-muted uppercase transition hover:bg-bahen-surface-muted hover:text-bahen-ink"
              aria-expanded={mobileProjectsOpen}
              onClick={() => setMobileProjectsOpen((v) => !v)}
            >
              Projeler
              <ChevronDown open={mobileProjectsOpen} className="opacity-70" />
            </button>
            {mobileProjectsOpen ? (
              <ul className="ml-2 border-l border-bahen-border py-1 pl-3">
                {projectsSubmenu.map(({ href, label }) => (
                  <li key={href + label}>
                    <a
                      href={href}
                      className="block rounded-lg py-2 text-[13px] text-bahen-muted transition hover:text-bahen-ink"
                      onClick={closeAll}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
          <li className="pt-2">
            <a
              href={MAIL_HREF}
              className="block rounded-lg border border-black bg-black py-3 text-center text-[13px] font-semibold tracking-[0.1em] text-white uppercase transition hover:border-neutral-950 hover:bg-neutral-950"
              onClick={closeAll}
            >
              Teklif alın
            </a>
          </li>
          <li className="flex justify-center gap-3 pt-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtnClass + " h-11 w-11"}
              aria-label="Instagram"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBtnClass + " h-11 w-11"}
              aria-label="LinkedIn"
            >
              <IconLinkedIn className="h-[19px] w-[19px]" />
            </a>
            <a href={MAIL_HREF} className={socialBtnClass + " h-11 w-11"} aria-label="E-posta">
              <IconMail className="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
