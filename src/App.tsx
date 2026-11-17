import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesExplorer } from './components/ServicesExplorer';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { HtmlLabSection } from './components/HtmlLabSection';
import { FaqSection } from './components/FaqSection';
import { ContactFooter } from './components/ContactFooter';
import { Lang, ThemeMode } from './data/webakData';
import { CUSTOM_THEME_PRESETS, hexToRgbTuple } from './utils/jalali';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('webak-lang');
      return saved === 'en' || saved === 'fa' ? saved : 'fa';
    } catch {
      return 'fa';
    }
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('webak-theme');
      return saved === 'light' || saved === 'dark' || saved === 'custom'
        ? saved
        : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [customPresetId, setCustomPresetId] = useState<string>(() => {
    try {
      return localStorage.getItem('webak-custom-preset') || 'volcanic';
    } catch {
      return 'volcanic';
    }
  });

  const [customHex, setCustomHex] = useState<string>(() => {
    try {
      return localStorage.getItem('webak-custom-hex') || '#ff6b00';
    } catch {
      return '#ff6b00';
    }
  });

  const [useHexOverride, setUseHexOverride] = useState<boolean>(() => {
    try {
      return localStorage.getItem('webak-custom-use-hex') === '1';
    } catch {
      return false;
    }
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(['web']);

  // Sync language & direction
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title =
      lang === 'fa'
        ? 'WEBAK — ایده را به تجربه دیجیتال تبدیل می‌کنیم'
        : 'WEBAK — Turning Ideas into Digital Experiences';
    try {
      localStorage.setItem('webak-lang', lang);
    } catch {
      // Ignore storage failures
    }
  }, [lang]);

  // Sync theme, custom palette variables, and WebGL shader RGB attributes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.setAttribute('data-accent-rgb', '255, 107, 0');
      root.setAttribute('data-bg-rgb', '7, 10, 16');
    } else if (theme === 'light') {
      root.setAttribute('data-accent-rgb', '224, 86, 0');
      root.setAttribute('data-bg-rgb', '246, 247, 250');
    } else {
      const preset =
        CUSTOM_THEME_PRESETS.find((p) => p.id === customPresetId) ??
        CUSTOM_THEME_PRESETS[0];
      const activeAccent = useHexOverride ? customHex : preset.accent;
      const rgb = hexToRgbTuple(activeAccent);

      root.style.setProperty('--custom-accent', activeAccent);
      root.style.setProperty(
        '--custom-accent-hover',
        useHexOverride ? activeAccent : preset.accentHover
      );
      root.style.setProperty(
        '--custom-accent-2',
        useHexOverride ? activeAccent : preset.accentSecondary
      );
      root.style.setProperty('--custom-accent-soft', `rgba(${rgb}, 0.16)`);
      root.style.setProperty('--custom-bg', preset.bg);
      root.style.setProperty('--custom-surface', preset.surface);
      root.style.setProperty('--custom-elevated', preset.elevated);

      root.setAttribute('data-accent-rgb', rgb);
      root.setAttribute('data-bg-rgb', hexToRgbTuple(preset.bg));
    }

    try {
      localStorage.setItem('webak-theme', theme);
      localStorage.setItem('webak-custom-preset', customPresetId);
      localStorage.setItem('webak-custom-hex', customHex);
      localStorage.setItem('webak-custom-use-hex', useHexOverride ? '1' : '0');
    } catch {
      // Ignore storage failures
    }
  }, [theme, customPresetId, customHex, useHexOverride]);

  // Smooth scrolling via Lenis + GSAP ticker
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'fa' ? 'en' : 'fa'))}
        theme={theme}
        onSelectTheme={setTheme}
        customPresetId={customPresetId}
        customHex={customHex}
        onSelectCustomPreset={(presetId) => {
          setUseHexOverride(false);
          setCustomPresetId(presetId);
        }}
        onChangeCustomHex={(hex) => {
          setUseHexOverride(true);
          setCustomHex(hex);
        }}
        briefCount={selectedServices.length}
      />

      <main>
        <HeroSection lang={lang} />
        <ServicesExplorer
          lang={lang}
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />
        <ProjectEstimator
          lang={lang}
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />
        <ProcessSection lang={lang} />
        <TeamSection lang={lang} />
        <HtmlLabSection lang={lang} />
        <FaqSection lang={lang} />
      </main>

      <ContactFooter lang={lang} />
    </div>
  );
}
