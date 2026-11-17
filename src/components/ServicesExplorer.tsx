import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Check,
  Code2,
  Cpu,
  Globe,
  Image,
  Layout,
  Palette,
  Plus,
  Presentation,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { CAPABILITIES, CapabilityItem, Lang, UI_COPY } from '../data/webakData';
import { initSpecsCanvas } from '../webgl/specsCanvas';

interface ServicesExplorerProps {
  lang: Lang;
  selectedServices: string[];
  onToggleService: (id: string) => void;
}

function CapabilityIcon({
  name,
  className,
}: {
  name: CapabilityItem['icon'];
  className?: string;
}) {
  switch (name) {
    case 'bot':
      return <Bot className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'smartphone':
      return <Smartphone className={className} />;
    case 'palette':
      return <Palette className={className} />;
    case 'presentation':
      return <Presentation className={className} />;
    case 'code':
      return <Code2 className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'layout':
      return <Layout className={className} />;
    case 'image':
      return <Image className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
  }
}

export function ServicesExplorer({
  lang,
  selectedServices,
  onToggleService,
}: ServicesExplorerProps) {
  const t = UI_COPY[lang];
  const [activeId, setActiveId] = useState<string>(CAPABILITIES[0].id);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cleanup = initSpecsCanvas(canvasRef.current);
    return cleanup;
  }, []);

  const active =
    CAPABILITIES.find((item) => item.id === activeId) ?? CAPABILITIES[0];
  const isSelectedForBrief = selectedServices.includes(active.id);

  const marqueeItems = [...CAPABILITIES, ...CAPABILITIES];

  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)]">
            {t.servicesKicker}
          </p>
          <h2 className="headline-balance mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]">
            {t.servicesTitle1}{' '}
            <span className="text-[var(--accent)]">{t.servicesTitleAccent}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {t.servicesDesc}
          </p>
        </div>

        {/* Continuous Marquee Strip (LTR track for smooth directional loop) */}
        <div
          dir="ltr"
          className="webak-marquee-wrap relative mt-10 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        >
          <div className="webak-marquee-track gap-2.5">
            {marqueeItems.map((cap, idx) => {
              const isAct = cap.id === active.id;
              return (
                <button
                  key={`${cap.id}-${idx}`}
                  type="button"
                  onClick={() => setActiveId(cap.id)}
                  className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isAct
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-text)]'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <CapabilityIcon name={cap.icon} className="h-4 w-4 shrink-0" />
                  <span>{lang === 'fa' ? cap.titleFa : cap.titleEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric 2-Column Interactive Capability Inspector */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Inspector Detail Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono-num text-sm font-bold text-[var(--accent)]">
                  {active.index}
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  {active.stack.join(' · ')}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--accent-soft)] text-[var(--accent)]">
                  <CapabilityIcon name={active.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)] sm:text-2xl">
                  {lang === 'fa' ? active.titleFa : active.titleEn}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-loose text-[var(--text-secondary)] sm:text-base">
                {lang === 'fa' ? active.detailFa : active.detailEn}
              </p>

              {/* Deliverables */}
              <div className="mt-7 border-t border-[var(--border)] pt-6">
                <div className="text-xs font-bold text-[var(--text-secondary)]">
                  {t.deliverablesLabel}
                </div>
                <ul className="mt-3 grid gap-2.5">
                  {(lang === 'fa'
                    ? active.deliverablesFa
                    : active.deliverablesEn
                  ).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
              <div>
                <div className="text-xs text-[var(--text-muted)]">
                  {t.timelineLabel}
                </div>
                <div className="font-mono-num mt-0.5 text-base font-bold text-[var(--text-primary)]">
                  {active.estDaysMin}–{active.estDaysMax} {t.daysUnit}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onToggleService(active.id)}
                  className={`inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-xl border px-4 text-xs font-bold transition-all ${
                    isSelectedForBrief
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)]'
                  }`}
                >
                  {isSelectedForBrief ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  <span>
                    {isSelectedForBrief ? t.addedToBrief : t.addToBrief}
                  </span>
                </button>

                <a
                  href="#estimator"
                  className="inline-flex h-11 items-center whitespace-nowrap rounded-xl bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  {t.goToBrief}
                </a>
              </div>
            </div>
          </div>

          {/* 3D Orbital Wireframe Architecture Stage */}
          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 lg:col-span-5">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />

            <div className="relative z-10 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="font-mono-num font-bold text-[var(--accent)]">
                WEBAK · {active.index}
              </span>
              <span className="font-display-en">3D WIREFRAME</span>
            </div>

            <div className="relative z-10 mt-auto rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] p-4 backdrop-blur-md">
              <div className="text-xs font-bold text-[var(--text-primary)]">
                {lang === 'fa' ? active.titleFa : active.titleEn}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {lang === 'fa' ? active.shortFa : active.shortEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
