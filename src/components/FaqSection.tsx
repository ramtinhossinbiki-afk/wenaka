import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS, Lang, UI_COPY } from '../data/webakData';

interface FaqSectionProps {
  lang: Lang;
}

export function FaqSection({ lang }: FaqSectionProps) {
  const t = UI_COPY[lang];
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [query, setQuery] = useState('');

  const filtered = FAQ_ITEMS.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const text =
      lang === 'fa'
        ? `${item.qFa} ${item.aFa}`
        : `${item.qEn} ${item.aEn}`;
    return text.toLowerCase().includes(q);
  });

  return (
    <section
      id="faq"
      className="border-t border-[var(--border)] bg-[var(--surface)]/35 py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[960px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.faqKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.faqTitle1}{' '}
            <span className="text-[var(--accent)]">{t.faqTitleAccent}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.faqDesc}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mx-auto mt-8 max-w-md">
          <Search
            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)] ${
              lang === 'fa' ? 'right-3.5' : 'left-3.5'
            }`}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.faqSearchPh}
            className={`w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none ${
              lang === 'fa' ? 'pr-10 pl-4' : 'pl-10 pr-4'
            }`}
          />
        </div>

        <div className="mt-8 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border-strong)] p-8 text-center text-sm text-[var(--text-secondary)]">
              {t.faqEmpty}
            </div>
          ) : (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-bold text-[var(--text-primary)] sm:text-base"
                  >
                    <span>{lang === 'fa' ? item.qFa : item.qEn}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[var(--accent)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {lang === 'fa' ? item.aFa : item.aEn}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
