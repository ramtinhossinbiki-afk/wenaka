import { useEffect, useRef, useState } from 'react';
import { Check, Globe, Menu, Moon, Palette, Sun, X } from 'lucide-react';
import { Lang, ThemeMode, UI_COPY } from '../data/webakData';
import { CUSTOM_THEME_PRESETS } from '../utils/jalali';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  theme: ThemeMode;
  onSelectTheme: (t: ThemeMode) => void;
  customPresetId: string;
  customHex: string;
  onSelectCustomPreset: (presetId: string) => void;
  onChangeCustomHex: (hex: string) => void;
  briefCount: number;
}

export function Navbar({
  lang,
  onToggleLang,
  theme,
  onSelectTheme,
  customPresetId,
  customHex,
  onSelectCustomPreset,
  onChangeCustomHex,
  briefCount,
}: NavbarProps) {
  const t = UI_COPY[lang];
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themePopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        themePopRef.current &&
        !themePopRef.current.contains(e.target as Node)
      ) {
        setThemeMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setThemeMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const navLinks = [
    { href: '#services', label: t.navServices },
    { href: '#estimator', label: t.navEstimator },
    { href: '#team', label: t.navTeam },
    { href: '#html-lab', label: t.navLab },
    { href: '#contact', label: t.navContact },
  ];

  const ThemeIcon =
    theme === 'light' ? Sun : theme === 'custom' ? Palette : Moon;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--glass-bg)] py-3 backdrop-blur-xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:rounded-lg"
        >
          <img
            src="/assets/aistudio/webaklogo-removebg-preview__1__d6dccabe_d6dccabe.png"
            alt="WEBAK"
            className="h-8 w-8 object-contain"
          />
          <span className="font-display-en text-lg font-extrabold tracking-[0.18em] text-[var(--text-primary)]">
            WEBAK
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Controls + Primary CTA */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
          >
            <Globe className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="font-display-en">
              {lang === 'fa' ? 'EN' : 'فا'}
            </span>
          </button>

          {/* Theme Switcher (Dark / Light / Custom) */}
          <div className="relative" ref={themePopRef}>
            <button
              type="button"
              onClick={() => setThemeMenuOpen((prev) => !prev)}
              aria-expanded={themeMenuOpen}
              aria-label={t.themeLabel}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
            >
              <ThemeIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">
                {theme === 'dark'
                  ? t.themeDark
                  : theme === 'light'
                    ? t.themeLight
                    : t.themeCustom}
              </span>
            </button>

            {themeMenuOpen && (
              <div
                className={`absolute top-12 z-50 w-64 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-3.5 shadow-[var(--shadow-card)] ${
                  lang === 'fa' ? 'left-0' : 'right-0'
                }`}
              >
                <div className="mb-2.5 text-xs font-semibold text-[var(--text-secondary)]">
                  {t.themeLabel}
                </div>
                <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-[var(--bg)] p-1">
                  <button
                    type="button"
                    onClick={() => onSelectTheme('dark')}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Moon className="h-3.5 w-3.5" />
                    <span>{t.themeDark}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTheme('light')}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors ${
                      theme === 'light'
                        ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                    <span>{t.themeLight}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTheme('custom')}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors ${
                      theme === 'custom'
                        ? 'bg-[var(--accent)] text-[var(--accent-text)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Palette className="h-3.5 w-3.5" />
                    <span>{t.themeCustom}</span>
                  </button>
                </div>

                {/* Custom Studio Palette Controls */}
                <div className="mt-3 border-t border-[var(--border)] pt-3">
                  <div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
                    {t.customPaletteTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CUSTOM_THEME_PRESETS.map((preset) => {
                      const active =
                        theme === 'custom' && customPresetId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            onSelectTheme('custom');
                            onSelectCustomPreset(preset.id);
                          }}
                          className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors ${
                            active
                              ? 'border-[var(--accent)] bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: preset.accent }}
                            />
                            <span className="truncate">
                              {lang === 'fa' ? preset.labelFa : preset.labelEn}
                            </span>
                          </span>
                          {active && (
                            <Check className="h-3 w-3 shrink-0 text-[var(--accent)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <label className="mt-2.5 flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)]">
                    <span>{t.customColorLabel}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono-num text-[11px] uppercase">
                        {customHex}
                      </span>
                      <input
                        type="color"
                        value={customHex}
                        onChange={(e) => {
                          onSelectTheme('custom');
                          onChangeCustomHex(e.target.value);
                        }}
                        className="h-5 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                        aria-label={t.customColorLabel}
                      />
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <a
            href="#estimator"
            className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-text)] transition-colors hover:bg-[var(--accent-hover)] sm:inline-flex"
          >
            <span>{t.navCta}</span>
            {briefCount > 0 && (
              <span className="font-mono-num rounded bg-black/25 px-1.5 py-0.5 text-[11px]">
                {briefCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-text)]"
            >
              {t.navCta}
              {briefCount > 0 ? ` (${briefCount})` : ''}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
