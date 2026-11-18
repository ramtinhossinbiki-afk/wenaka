import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownLeft, ArrowUpRight, Layers } from 'lucide-react';
import { Lang, UI_COPY } from '../data/webakData';
import { initHeroCanvas } from '../webgl/heroCanvas';

interface HeroSectionProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = UI_COPY[lang];
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanupGl = initHeroCanvas(heroCanvasRef.current);
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let velX = 0;
    let velY = 0;
    let tickerFn: (() => void) | null = null;

    const stage = stageRef.current;
    const onMove = (e: PointerEvent) => {
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = nx * 13;
      targetRotX = -ny * 10;
    };
    const onLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    if (stage && tiltRef.current && !prefersReduced) {
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
      tickerFn = () => {
        const ax = (targetRotX - curRotX) * 0.08;
        const ay = (targetRotY - curRotY) * 0.08;
        velX = (velX + ax) * 0.82;
        velY = (velY + ay) * 0.82;
        curRotX += velX;
        curRotY += velY;
        if (tiltRef.current) {
          tiltRef.current.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
        }
        if (shadowRef.current) {
          shadowRef.current.style.transform = `translateX(${(-curRotY * 1.3).toFixed(1)}px) scale(${1 - Math.abs(curRotX) * 0.01})`;
        }
      };
      gsap.ticker.add(tickerFn);
    }

    return () => {
      cleanupGl();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      stage?.removeEventListener('pointermove', onMove);
      stage?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const CtaArrow = lang === 'fa' ? ArrowDownLeft : ArrowUpRight;

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[92dvh] items-center overflow-hidden pt-28 pb-16 lg:min-h-screen lg:pt-24"
      >
        <canvas
          ref={heroCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
          {/* Editorial Copy */}
          <div className="lg:col-span-7">
            <p className="mb-5 text-xs font-semibold tracking-wider text-[var(--accent)]">
              {t.heroKicker}
            </p>

            <h1 className="headline-balance text-4xl font-black leading-[1.14] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.75rem]">
              {t.heroTitle1}{' '}
              <span className="bg-gradient-to-l from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                {t.heroTitleAccent}
              </span>{' '}
              {t.heroTitle2}
            </h1>

            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {t.heroDesc}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#estimator"
                className="inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-xl bg-[var(--accent)] px-6 text-sm font-bold text-[var(--accent-text)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
              >
                <span>{t.heroPrimaryCta}</span>
                <CtaArrow className="h-4 w-4" />
              </a>

              <a
                href="#services"
                className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/80 px-5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                <Layers className="h-4 w-4 text-[var(--accent)]" />
                <span>{t.heroSecondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Perspective Tilt Emblem Stage */}
          <div
            ref={stageRef}
            className="flex flex-col items-center justify-center lg:col-span-5"
            style={{ perspective: '1100px' }}
          >
            <div
              ref={tiltRef}
              className="relative flex aspect-square w-full max-w-[380px] items-center justify-center rounded-[32px] border border-[var(--border-strong)] bg-[var(--surface)]/65 p-10 shadow-[var(--shadow-card)] backdrop-blur-xl will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Subtle radial glow behind emblem */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-8 rounded-full opacity-25 blur-3xl"
                style={{ backgroundColor: 'var(--accent)' }}
              />

              {/* Orbital vector rings */}
              <div
                aria-hidden="true"
                className="animate-orbital-slow pointer-events-none absolute inset-6 rounded-full border border-dashed border-[var(--border-strong)]"
              />
              <div
                aria-hidden="true"
                className="animate-orbital-reverse pointer-events-none absolute inset-14 rounded-full border border-[var(--accent)]/30"
              />

              <img
                src="https://raw.githubusercontent.com/ramtinhossinbiki-afk/wenaka/refs/heads/main/public/assets/aistudio/webaklogo-removebg-preview__1__d6dccabe_d6dccabe.png"
                alt="WEBAK Studio Emblem"
                draggable={false}
                className="animate-logo-float relative z-10 w-[56%] max-w-[205px] select-none object-contain"
                style={{
                  transform: 'translateZ(36px)',
                  filter: 'drop-shadow(0 18px 36px rgba(255, 107, 0, 0.34))',
                }}
              />

              {/* Clean bottom metadata caption inside stage */}
              <div
                className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[11px] font-medium text-[var(--text-secondary)]"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span>{t.stageCaption1}</span>
                <span className="font-mono-num text-[var(--accent)]">
                  {t.stageCaption2}
                </span>
              </div>
            </div>

            <div
              ref={shadowRef}
              aria-hidden="true"
              className="mt-4 h-4 w-44 rounded-full bg-black/35 blur-md"
            />
          </div>
        </div>
      </section>

      {/* 4-Column Studio Pillars Strip */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)]/75 backdrop-blur-sm">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse">
          {[
            { num: t.pillar1Num, label: t.pillar1Label },
            { num: t.pillar2Num, label: t.pillar2Label },
            { num: t.pillar3Num, label: t.pillar3Label },
            { num: t.pillar4Num, label: t.pillar4Label },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center px-4 py-6 text-center"
            >
              <span className="font-mono-num text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                {item.num}
              </span>
              <span className="mt-1 text-xs text-[var(--text-secondary)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
