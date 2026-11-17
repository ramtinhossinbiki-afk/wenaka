import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  Monitor,
  Play,
  RotateCcw,
  Smartphone,
} from 'lucide-react';
import { LAB_TEMPLATES, Lang, UI_COPY } from '../data/webakData';

interface HtmlLabSectionProps {
  lang: Lang;
}

export function HtmlLabSection({ lang }: HtmlLabSectionProps) {
  const t = UI_COPY[lang];
  const [templateId, setTemplateId] = useState(LAB_TEMPLATES[0].id);
  const [code, setCode] = useState(LAB_TEMPLATES[0].code);
  const [liveSrcDoc, setLiveSrcDoc] = useState(LAB_TEMPLATES[0].code);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLiveSrcDoc(code);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [code]);

  const handleSelectTemplate = (id: string) => {
    const tpl = LAB_TEMPLATES.find((item) => item.id === id);
    if (!tpl) return;
    setTemplateId(tpl.id);
    setCode(tpl.code);
    setLiveSrcDoc(tpl.code);
  };

  const handleReset = () => {
    const tpl =
      LAB_TEMPLATES.find((item) => item.id === templateId) ?? LAB_TEMPLATES[0];
    setCode(tpl.code);
    setLiveSrcDoc(tpl.code);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore if clipboard unavailable
    }
  };

  return (
    <section id="html-lab" className="py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.labKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.labTitle1}{' '}
            <span className="text-[var(--accent)]">{t.labTitleAccent}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.labDesc}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6">
          {/* Toolbar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {LAB_TEMPLATES.map((tpl) => {
                const active = tpl.id === templateId;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tpl.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-text)]'
                        : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {lang === 'fa' ? tpl.labelFa : tpl.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-1">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewport === 'desktop'
                    ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>{t.labDesktop}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewport === 'mobile'
                    ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>{t.labMobile}</span>
              </button>
            </div>
          </div>

          {/* Split Editor + Live Preview */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#090d14]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold text-slate-400">
                <span className="font-mono-num">HTML / CSS / JS</span>
                <span>EDITOR</span>
              </div>
              <textarea
                dir="ltr"
                spellCheck={false}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-label="HTML Lab Editor"
                className="font-mono-num block h-[340px] w-full resize-none border-0 bg-transparent p-4 text-left text-[13px] leading-relaxed text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-[11px] font-semibold text-[var(--text-secondary)]">
                <span>PREVIEW</span>
                <span className="font-mono-num">
                  {viewport === 'mobile' ? '360px' : '100%'}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center bg-[var(--bg)] p-2">
                <iframe
                  title="WEBAK HTML Preview"
                  sandbox="allow-scripts"
                  srcDoc={liveSrcDoc}
                  className={`h-[324px] rounded-lg border border-[var(--border)] bg-white transition-all duration-300 ${
                    viewport === 'mobile' ? 'w-[360px] max-w-full' : 'w-full'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLiveSrcDoc(code)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              <Play className="h-3.5 w-3.5" />
              <span>{t.labRun}</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? t.labCopied : t.labCopy}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.labReset}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
