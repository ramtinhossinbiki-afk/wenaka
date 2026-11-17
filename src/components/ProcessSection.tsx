import { Lang, PROCESS_STEPS, UI_COPY } from '../data/webakData';

interface ProcessSectionProps {
  lang: Lang;
}

export function ProcessSection({ lang }: ProcessSectionProps) {
  const t = UI_COPY[lang];

  return (
    <section id="process" className="py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.processKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.processTitle1}{' '}
            <span className="text-[var(--accent)]">
              {t.processTitleAccent}
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.processDesc}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="group grid grid-cols-1 gap-4 py-8 transition-colors sm:grid-cols-[96px_1fr] sm:items-start sm:gap-8"
            >
              <div className="font-mono-num flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-sm font-bold text-[var(--text-secondary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                {step.num}
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[var(--text-primary)] sm:text-xl">
                  {lang === 'fa' ? step.titleFa : step.titleEn}
                </h3>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                  {lang === 'fa' ? step.descFa : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
