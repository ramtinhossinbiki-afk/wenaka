import { useEffect, useState } from 'react';
import {
  ArrowUp,
  Bot,
  Check,
  Code2,
  Copy,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { Lang, UI_COPY } from '../data/webakData';

interface ContactFooterProps {
  lang: Lang;
}

const CONTACT_ICONS = [
  MessageCircle,
  Bot,
  Megaphone,
  Code2,
  Phone,
  Mail,
];

export function ContactFooter({ lang }: ContactFooterProps) {
  const t = UI_COPY[lang];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopy = async (idx: number, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx(null), 1800);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <>
      {/* Conversion CTA Banner */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/30 bg-[var(--surface-elevated)] px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <h2 className="headline-balance relative z-10 text-2xl font-black text-[var(--text-primary)] sm:text-4xl">
              {t.ctaBannerTitle}
            </h2>
            <p className="relative z-10 mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {t.ctaBannerDesc}
            </p>
            <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="https://splus.ir/RAMtinHB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <Send className="h-4 w-4" />
                <span>{t.ctaBannerBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Hub */}
      <section id="contact" className="pb-20 pt-4 lg:pb-28">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
              {t.contactKicker}
            </p>
            <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
              {t.contactTitle1}{' '}
              <span className="text-[var(--accent)]">
                {t.contactTitleAccent}
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {t.contactDesc}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {t.contacts.map((c, idx) => {
              const Icon = CONTACT_ICONS[idx] ?? MessageCircle;
              const isCopied = copiedIdx === idx;
              const isExternal = c.href.startsWith('http');

              return (
                <div
                  key={c.value}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/50"
                >
                  <a
                    href={c.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-[var(--text-muted)]">
                        {c.label}
                      </div>
                      <div
                        dir="ltr"
                        className="font-mono-num truncate text-xs font-bold text-[var(--text-primary)]"
                      >
                        {c.value}
                      </div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(idx, c.copy)}
                    aria-label={`Copy ${c.value}`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="border-t border-[var(--border)] py-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-start">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/webaklogo-removebg-preview__1__d6dccabe_d6dccabe.png"
              alt="WEBAK"
              className="h-6 w-6 object-contain"
            />
            <span className="font-display-en text-sm font-black tracking-[0.18em] text-[var(--text-primary)]">
              WEBAK
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">{t.footerTag}</p>

          <div className="flex items-center gap-5 text-xs text-[var(--text-muted)]">
            <a href="#services" className="hover:text-[var(--accent)]">
              {t.navServices}
            </a>
            <a href="#estimator" className="hover:text-[var(--accent)]">
              {t.navEstimator}
            </a>
            <a href="#team" className="hover:text-[var(--accent)]">
              {t.navTeam}
            </a>
            <a
              href="https://github.com/ramtinhossinbiki-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t.backTop}
          title={t.backTop}
          className={`fixed bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-card)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-[var(--accent-text)] ${
            lang === 'fa' ? 'left-5' : 'right-5'
          }`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
