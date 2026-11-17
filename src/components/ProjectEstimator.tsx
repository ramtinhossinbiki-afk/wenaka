import { useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { CAPABILITIES, Lang, UI_COPY } from '../data/webakData';

interface ProjectEstimatorProps {
  lang: Lang;
  selectedServices: string[];
  onToggleService: (id: string) => void;
}

export function ProjectEstimator({
  lang,
  selectedServices,
  onToggleService,
}: ProjectEstimatorProps) {
  const t = UI_COPY[lang];
  const [scaleId, setScaleId] = useState<'starter' | 'standard' | 'flagship'>(
    'standard'
  );
  const [paceId, setPaceId] = useState<'flexible' | 'standard' | 'priority'>(
    'standard'
  );
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedCaps = CAPABILITIES.filter((c) =>
    selectedServices.includes(c.id)
  );
  const scaleObj =
    t.scales.find((s) => s.id === scaleId) ?? t.scales[1];
  const paceObj =
    t.paces.find((p) => p.id === paceId) ?? t.paces[1];

  const baseMin = selectedCaps.reduce((acc, c) => acc + c.estDaysMin, 0);
  const baseMax = selectedCaps.reduce((acc, c) => acc + c.estDaysMax, 0);

  // Parallel execution discount when bundling multiple disciplines
  const bundleFactor = selectedCaps.length > 1 ? 0.78 : 1;
  const estMin = Math.max(
    1,
    Math.round(baseMin * bundleFactor * scaleObj.mult * paceObj.mult)
  );
  const estMax = Math.max(
    estMin + 1,
    Math.round(baseMax * bundleFactor * scaleObj.mult * paceObj.mult)
  );

  const formattedBrief =
    selectedCaps.length === 0
      ? ''
      : lang === 'fa'
        ? `📋 سفارش پروژه به تیم WEBAK

🔹 خدمات انتخاب‌شده:
${selectedCaps.map((c) => `• ${c.titleFa}`).join('\n')}

📐 مقیاس پروژه: ${scaleObj.label}
⚡ سرعت تحویل: ${paceObj.label}
⏱️ بازه زمانی تخمینی: ${estMin} تا ${estMax} روز کاری

💬 توضیحات ایده:
${notes.trim() || 'ثبت نشده (هماهنگی در گفتگو)'}

🚀 ارسال‌شده از سازنده سفارش سایت WEBAK`
        : `📋 Project Brief for WEBAK Studio

🔹 Selected Capabilities:
${selectedCaps.map((c) => `• ${c.titleEn}`).join('\n')}

📐 Project Scale: ${scaleObj.label}
⚡ Delivery Pace: ${paceObj.label}
⏱️ Estimated Window: ${estMin}–${estMax} business days

💬 Project Notes:
${notes.trim() || 'To be discussed on discovery chat'}

🚀 Built with WEBAK Interactive Scope Builder`;

  const handleCopyBrief = async () => {
    if (!formattedBrief) return;
    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const mailtoHref = formattedBrief
    ? `mailto:ramtinbiki@gmail.com?subject=${encodeURIComponent(
        lang === 'fa' ? 'درخواست سفارش پروژه WEBAK' : 'WEBAK Project Brief'
      )}&body=${encodeURIComponent(formattedBrief)}`
    : 'mailto:ramtinbiki@gmail.com';

  return (
    <section
      id="estimator"
      className="border-y border-[var(--border)] bg-[var(--surface)]/45 py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.estimatorKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.estimatorTitle1}{' '}
            <span className="text-[var(--accent)]">
              {t.estimatorTitleAccent}
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.estimatorDesc}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Configurator Steps */}
          <div className="space-y-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:col-span-7">
            {/* Step 1: Capabilities */}
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {t.stepServices}
              </h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {CAPABILITIES.map((cap) => {
                  const active = selectedServices.includes(cap.id);
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => onToggleService(cap.id)}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all ${
                        active
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-text)]'
                          : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                      <span>{lang === 'fa' ? cap.titleFa : cap.titleEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Scale */}
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {t.stepScale}
              </h3>
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {t.scales.map((sc) => {
                  const active = scaleId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() =>
                        setScaleId(
                          sc.id as 'starter' | 'standard' | 'flagship'
                        )
                      }
                      className={`flex flex-col items-start rounded-xl border p-3.5 text-start transition-all ${
                        active
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                          : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {sc.label}
                      </span>
                      <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
                        {sc.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Pace */}
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {t.stepPace}
              </h3>
              <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-xl bg-[var(--bg)] p-1.5">
                {t.paces.map((pc) => {
                  const active = paceId === pc.id;
                  return (
                    <button
                      key={pc.id}
                      type="button"
                      onClick={() =>
                        setPaceId(
                          pc.id as 'flexible' | 'standard' | 'priority'
                        )
                      }
                      className={`rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[var(--accent)] text-[var(--accent-text)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {pc.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Notes */}
            <div className="border-t border-[var(--border)] pt-6">
              <label
                htmlFor="estimator-notes"
                className="block text-sm font-bold text-[var(--text-primary)]"
              >
                {t.stepNotes}
              </label>
              <textarea
                id="estimator-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Live Formatted Output & Direct Send */}
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
              <div>
                <div className="text-xs text-[var(--text-muted)]">
                  {t.estRangeLabel}
                </div>
                <div className="font-mono-num mt-1 text-2xl font-extrabold text-[var(--text-primary)]">
                  {selectedCaps.length > 0
                    ? `${estMin}–${estMax} ${t.daysUnit}`
                    : '—'}
                </div>
              </div>
              <div className="text-end">
                <div className="text-xs text-[var(--text-muted)]">
                  {t.selectedCountLabel}
                </div>
                <div className="font-mono-num mt-1 text-2xl font-extrabold text-[var(--accent)]">
                  {selectedCaps.length}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2.5 text-xs font-bold text-[var(--text-secondary)]">
                {t.briefPreviewTitle}
              </div>

              {selectedCaps.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg)]/60 p-6 text-center text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.emptySelectionMsg}
                </div>
              ) : (
                <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-xs leading-relaxed text-[var(--text-primary)]">
                  {formattedBrief}
                </pre>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                disabled={selectedCaps.length === 0}
                onClick={handleCopyBrief}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? t.copiedBriefBtn : t.copyBriefBtn}</span>
              </button>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href="https://splus.ir/RAMtinHB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <Send className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="truncate">{t.sendSoroushBtn}</span>
                </a>

                <a
                  href={mailtoHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <Mail className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="truncate">{t.sendEmailBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
