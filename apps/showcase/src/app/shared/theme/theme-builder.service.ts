import { Injectable, signal, inject, effect } from '@angular/core';
import { ThemeService, ThemeMode } from '@shared/theme/theme.service';

const STORAGE_KEY = 'theme-builder';
const DRAWER_OPEN_KEY = 'theme-builder-drawer-open';
const DRAWER_MODE_KEY = 'theme-builder-mode';

export type ThemeBuilderMode = 'simple' | 'advanced';

export interface ThemeBuilderSimpleState {
  baseColor: string;
  hueTorsion: number;
  vibrancy: number;
}

export type ThemeBuilderAdvancedState = Record<string, string>;

export interface ThemeBuilderState {
  mode: ThemeBuilderMode;
  simple: ThemeBuilderSimpleState;
  advanced: ThemeBuilderAdvancedState;
}

const DEFAULT_SIMPLE: ThemeBuilderSimpleState = {
  baseColor: '#0078d4',
  hueTorsion: 0,
  vibrancy: 0
};

const BRAND_SHADES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160] as const;

const CSS_VAR_KEYS = [
  '--color-brand-primary',
  '--color-brand-primary-hover',
  '--color-brand-primary-pressed',
  '--color-brand-primary-selected',
  '--color-brand-foreground',
  '--color-brand-foreground-hover',
  '--color-brand-foreground-pressed',
  '--color-compound-brand-background',
  '--color-compound-brand-background-hover',
  '--color-compound-brand-background-pressed',
  '--color-compound-brand-foreground',
  '--color-compound-brand-foreground-hover',
  '--color-compound-brand-foreground-pressed',
  '--color-compound-brand-stroke',
  '--color-compound-brand-stroke-hover',
  '--color-compound-brand-stroke-pressed',
  '--color-accent-primary',
  '--color-accent-primary-hover',
  '--color-accent-primary-pressed',
  '--color-accent-primary-selected',
  '--color-neutral-foreground-rest',
  '--color-neutral-foreground-hover',
  '--color-neutral-foreground-pressed',
  '--color-neutral-foreground-disabled',
  '--color-neutral-foreground-on-brand',
  '--color-neutral-foreground-selected',
  '--color-neutral-foreground2-rest',
  '--color-neutral-foreground2-hover',
  '--color-neutral-foreground2-pressed',
  '--color-neutral-foreground2-selected',
  '--color-neutral-foreground2-brand-hover',
  '--color-neutral-foreground2-brand-pressed',
  '--color-neutral-foreground2-brand-selected',
  '--color-neutral-foreground3-rest',
  '--color-neutral-foreground3-hover',
  '--color-neutral-foreground3-pressed',
  '--color-neutral-foreground3-selected',
  '--color-neutral-foreground3-brand-hover',
  '--color-neutral-foreground3-brand-pressed',
  '--color-neutral-foreground3-brand-selected',
  '--color-neutral-foreground4-rest',
  '--color-neutral-background-rest',
  '--color-neutral-background-selected',
  '--color-neutral-background-hover',
  '--color-neutral-background-pressed',
  '--color-neutral-background-disabled',
  '--color-neutral-background-brand-selected',
  '--color-neutral-background-brand-hover',
  '--color-neutral-background-brand-pressed',
  '--color-neutral-background2-rest',
  '--color-neutral-background2-hover',
  '--color-neutral-background2-pressed',
  '--color-neutral-background2-selected',
  '--color-neutral-background3-rest',
  '--color-neutral-background3-hover',
  '--color-neutral-background3-pressed',
  '--color-neutral-background3-selected',
  '--color-subtle-background-hover',
  '--color-subtle-background-pressed',
  '--color-subtle-background-selected',
  '--color-neutral-stroke-rest',
  '--color-neutral-stroke-hover',
  '--color-neutral-stroke-pressed',
  '--color-neutral-stroke-selected',
  '--color-neutral-stroke-disabled',
  '--color-neutral-stroke-accessible',
  '--color-neutral-stroke-accessible-hover',
  '--color-neutral-stroke-accessible-pressed',
  '--color-neutral-stroke-accessible-selected',
  '--color-brand-stroke-rest',
  '--color-brand-stroke-hover',
  '--color-brand-stroke-pressed',
  '--color-brand-stroke-selected',
  '--color-shared-red-foreground',
  '--color-shared-red-foreground-hover',
  '--color-shared-red-foreground-pressed',
  '--color-shared-red-foreground-selected',
  '--color-shared-red-background',
  '--color-shared-red-border',
  '--color-shared-orange-foreground',
  '--color-shared-orange-foreground-hover',
  '--color-shared-orange-foreground-pressed',
  '--color-shared-orange-foreground-selected',
  '--color-shared-orange-background',
  '--color-shared-orange-border',
  '--color-shared-yellow-foreground',
  '--color-shared-yellow-background',
  '--color-shared-yellow-border',
  '--color-shared-green-foreground',
  '--color-shared-green-foreground-hover',
  '--color-shared-green-foreground-pressed',
  '--color-shared-green-foreground-selected',
  '--color-shared-green-background',
  '--color-shared-green-border',
  '--color-shared-cyan-foreground',
  '--color-shared-cyan-background',
  '--color-shared-cyan-border',
  '--color-shared-blue-foreground',
  '--color-shared-blue-foreground-hover',
  '--color-shared-blue-foreground-pressed',
  '--color-shared-blue-foreground-selected',
  '--color-shared-blue-background',
  '--color-shared-blue-border',
  '--color-shared-purple-foreground',
  '--color-shared-purple-background',
  '--color-shared-purple-border',
  '--color-shared-pink-foreground',
  '--color-shared-pink-background',
  '--color-shared-pink-border',
  '--border-radius-400',
  '--spacing-horizontal-xxs',
  '--spacing-horizontal-xs',
  '--spacing-horizontal-s',
  '--spacing-horizontal-m',
  '--spacing-horizontal-l',
  '--spacing-vertical-xxs',
  '--spacing-vertical-xs',
  '--spacing-vertical-s',
  '--spacing-vertical-m',
  '--spacing-vertical-l',
  '--color-focus-border'
];

@Injectable({
  providedIn: 'root'
})
export class ThemeBuilderService {
  private themeService = inject(ThemeService);
  private _drawerOpen = signal<boolean>(this.getStoredDrawerOpen());
  private _mode = signal<ThemeBuilderMode>(this.getStoredMode());
  private _simpleState = signal<ThemeBuilderSimpleState>(this.getStoredSimpleState());
  private _advancedState = signal<ThemeBuilderAdvancedState>(this.getStoredAdvancedState());

  readonly drawerOpen = this._drawerOpen.asReadonly();
  readonly mode = this._mode.asReadonly();
  readonly simpleState = this._simpleState.asReadonly();
  readonly advancedState = this._advancedState.asReadonly();

  readonly cssVarKeys = CSS_VAR_KEYS;

  constructor() {
    effect(() => {
      this.themeService.$themeMode();
      if (this._drawerOpen()) {
        this.applyLivePreview();
      }
    });
  }

  toggleDrawer(): void {
    this._drawerOpen.update((v) => !v);
    this.persistDrawerOpen();
    this.applyLivePreview();
  }

  setDrawerOpen(open: boolean): void {
    this._drawerOpen.set(open);
    this.persistDrawerOpen();
    this.applyLivePreview();
  }

  setMode(mode: ThemeBuilderMode): void {
    this._mode.set(mode);
    localStorage.setItem(DRAWER_MODE_KEY, mode);
    if (mode === 'advanced' && Object.keys(this._advancedState()).length === 0) {
      this._advancedState.set(this.getDefaultAdvancedState());
      this.persistAdvancedState();
    }
    this.applyLivePreview();
  }

  setSimpleState(state: Partial<ThemeBuilderSimpleState>): void {
    this._simpleState.update((prev) => ({ ...prev, ...state }));
    this.persistSimpleState();
    if (this._mode() === 'simple') {
      this.applyLivePreview();
    }
  }

  setAdvancedState(state: ThemeBuilderAdvancedState): void {
    this._advancedState.set(state);
    this.persistAdvancedState();
    if (this._mode() === 'advanced') {
      this.applyLivePreview();
    }
  }

  updateAdvancedVar(key: string, value: string): void {
    this._advancedState.update((prev) => ({ ...prev, [key]: value }));
    this.persistAdvancedState();
    if (this._mode() === 'advanced') {
      this.applyLivePreview();
    }
  }

  applyLivePreview(): void {
    if (!this._drawerOpen()) {
      this.clearLivePreview();
      return;
    }

    const root = document.documentElement;
    const isDark = this.themeService.$themeMode() === ThemeMode.Dark;

    if (this._mode() === 'simple') {
      const palette = isDark
        ? this.generateDarkPaletteFromSimple(this._simpleState())
        : this.generatePaletteFromSimple(this._simpleState());
      Object.entries(palette).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    } else {
      const state = this._advancedState();
      Object.entries(state).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }

  clearLivePreview(): void {
    const root = document.documentElement;
    CSS_VAR_KEYS.forEach((key) => root.style.removeProperty(key));
  }

  exportScss(): string {
    const lines: string[] = [];

    if (this._mode() === 'simple') {
      const lightPalette = this.generatePaletteFromSimple(this._simpleState());
      const darkPalette = this.generateDarkPaletteFromSimple(this._simpleState());
      lines.push(':root {');
      Object.entries(lightPalette).forEach(([key, value]) => {
        lines.push(`  ${key}: ${value};`);
      });
      lines.push('}\n\n');
      lines.push(":root[data-theme='dark'],\n:root.dark,\nbody.dark-theme {");
      Object.entries(darkPalette).forEach(([key, value]) => {
        lines.push(`  ${key}: ${value};`);
      });
      lines.push('}');
    } else {
      const state = this._advancedState();
      lines.push(':root {');
      Object.entries(state).forEach(([key, value]) => {
        lines.push(`  ${key}: ${value};`);
      });
      lines.push('}');
    }

    return lines.join('\n');
  }

  importScss(scss: string): void {
    const vars: ThemeBuilderAdvancedState = {};
    const varRegex = /(--[\w-]+)\s*:\s*([^;]+)\s*;/g;
    let match;
    let baseColor: string | null = null;
    while ((match = varRegex.exec(scss)) !== null) {
      const key = match[1];
      const value = match[2].trim();
      vars[key] = value;
      if (!baseColor && key === '--color-brand-primary' && this.isValidHex(value)) {
        baseColor = value;
      }
    }
    if (Object.keys(vars).length === 0) return;
    const hex = baseColor ? (baseColor.startsWith('#') ? baseColor : `#${baseColor}`) : null;
    if (hex) {
      this._mode.set('simple');
      this._simpleState.update((prev) => ({
        ...prev,
        baseColor: hex,
        hueTorsion: 0,
        vibrancy: 0
      }));
      this.persistSimpleState();
      localStorage.setItem(DRAWER_MODE_KEY, 'simple');
    } else {
      this._advancedState.set(vars);
      this._mode.set('advanced');
      this.persistAdvancedState();
      localStorage.setItem(DRAWER_MODE_KEY, 'advanced');
    }
    this.applyLivePreview();
  }

  private isValidHex(value: string): boolean {
    const trimmed = value.trim().replace(/^#/, '');
    return /^[a-f\d]{6}$/i.test(trimmed) || /^[a-f\d]{3}$/i.test(trimmed);
  }

  private generatePaletteFromSimple(state: ThemeBuilderSimpleState): Record<string, string> {
    const ramp = this.generate16ShadeRamp(state);
    const primary = ramp[80];
    const hover = ramp[70];
    const pressed = ramp[50];
    const selected = ramp[60];
    const fgOnBrand = '#ffffff';
    const bgSelected = ramp[150];
    const bgHover = ramp[140];
    const bgPressed = ramp[130];

    return {
      '--color-brand-primary': primary,
      '--color-brand-primary-hover': hover,
      '--color-brand-primary-pressed': pressed,
      '--color-brand-primary-selected': selected,
      '--color-brand-foreground': primary,
      '--color-brand-foreground-hover': hover,
      '--color-brand-foreground-pressed': pressed,
      '--color-compound-brand-background': primary,
      '--color-compound-brand-background-hover': hover,
      '--color-compound-brand-background-pressed': pressed,
      '--color-compound-brand-foreground': primary,
      '--color-compound-brand-foreground-hover': hover,
      '--color-compound-brand-foreground-pressed': pressed,
      '--color-compound-brand-stroke': primary,
      '--color-compound-brand-stroke-hover': hover,
      '--color-compound-brand-stroke-pressed': pressed,
      '--color-accent-primary': primary,
      '--color-accent-primary-hover': hover,
      '--color-accent-primary-pressed': pressed,
      '--color-accent-primary-selected': selected,
      '--color-neutral-foreground-on-brand': fgOnBrand,
      '--color-neutral-foreground2-brand-hover': hover,
      '--color-neutral-foreground2-brand-pressed': pressed,
      '--color-neutral-foreground2-brand-selected': selected,
      '--color-neutral-foreground3-brand-hover': hover,
      '--color-neutral-foreground3-brand-pressed': pressed,
      '--color-neutral-foreground3-brand-selected': selected,
      '--color-neutral-background-brand-selected': bgSelected,
      '--color-neutral-background-brand-hover': bgHover,
      '--color-neutral-background-brand-pressed': bgPressed,
      '--color-brand-stroke-rest': primary,
      '--color-brand-stroke-hover': hover,
      '--color-brand-stroke-pressed': pressed,
      '--color-brand-stroke-selected': selected,
      '--color-neutral-stroke-accessible-selected': primary,
      '--color-focus-border': primary
    };
  }

  private generateDarkPaletteFromSimple(state: ThemeBuilderSimpleState): Record<string, string> {
    const ramp = this.generate16ShadeRamp(state);
    const primary = ramp[60];
    const hover = ramp[70];
    const pressed = ramp[40];
    const selected = ramp[50];
    const fgPrimary = ramp[110];
    const fgHover = ramp[120];
    const fgPressed = ramp[90];
    const compound = ramp[90];
    const compoundHover = ramp[100];
    const compoundPressed = ramp[80];
    const bgSelected = ramp[30];
    const bgHover = ramp[40];
    const bgPressed = ramp[20];
    const stroke = ramp[90];
    const strokeHover = ramp[80];
    const strokePressed = ramp[70];

    return {
      '--color-brand-primary': primary,
      '--color-brand-primary-hover': hover,
      '--color-brand-primary-pressed': pressed,
      '--color-brand-primary-selected': selected,
      '--color-brand-foreground': fgPrimary,
      '--color-brand-foreground-hover': fgHover,
      '--color-brand-foreground-pressed': fgPressed,
      '--color-compound-brand-background': compound,
      '--color-compound-brand-background-hover': compoundHover,
      '--color-compound-brand-background-pressed': compoundPressed,
      '--color-compound-brand-foreground': compound,
      '--color-compound-brand-foreground-hover': compoundHover,
      '--color-compound-brand-foreground-pressed': compoundPressed,
      '--color-compound-brand-stroke': stroke,
      '--color-compound-brand-stroke-hover': strokeHover,
      '--color-compound-brand-stroke-pressed': strokePressed,
      '--color-accent-primary': primary,
      '--color-accent-primary-hover': hover,
      '--color-accent-primary-pressed': pressed,
      '--color-accent-primary-selected': selected,
      '--color-neutral-foreground-on-brand': '#ffffff',
      '--color-neutral-foreground2-brand-hover': compoundHover,
      '--color-neutral-foreground2-brand-pressed': compoundPressed,
      '--color-neutral-foreground2-brand-selected': compound,
      '--color-neutral-foreground3-brand-hover': compoundHover,
      '--color-neutral-foreground3-brand-pressed': compoundPressed,
      '--color-neutral-foreground3-brand-selected': compound,
      '--color-neutral-background-brand-selected': bgSelected,
      '--color-neutral-background-brand-hover': bgHover,
      '--color-neutral-background-brand-pressed': bgPressed,
      '--color-brand-stroke-rest': stroke,
      '--color-brand-stroke-hover': strokeHover,
      '--color-brand-stroke-pressed': strokePressed,
      '--color-brand-stroke-selected': stroke,
      '--color-neutral-stroke-accessible-selected': compound,
      '--color-focus-border': '#ffffff'
    };
  }

  private generate16ShadeRamp(state: ThemeBuilderSimpleState): Record<number, string> {
    const { baseColor, hueTorsion, vibrancy } = state;
    const hsl = this.hexToHsl(baseColor);
    const keyL = hsl.l;
    const effectiveSaturation = Math.min(100, Math.max(0, (hsl.s * (50 + vibrancy)) / 50));
    const hueShiftScale = 0.72;

    const ramp: Record<number, string> = {};
    for (let i = 0; i < 16; i++) {
      const shade = BRAND_SHADES[i];
      let L: number;
      if (i <= 8) {
        L = 2 + ((keyL - 2) * i) / 8;
      } else {
        L = keyL + ((88 - keyL) * (i - 8)) / 7;
      }
      L = Math.max(1, Math.min(98, L));
      const hueShift = ((hueTorsion * (i - 8)) / 8) * hueShiftScale;
      const h = (hsl.h + hueShift + 360) % 360;
      ramp[shade] = this.hslToHex(h, effectiveSaturation, L);
    }
    return ramp;
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 50 };
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return (
      '#' +
      [r, g, b]
        .map((x) =>
          Math.round(x * 255)
            .toString(16)
            .padStart(2, '0')
        )
        .join('')
    );
  }

  private getStoredDrawerOpen(): boolean {
    try {
      return localStorage.getItem(DRAWER_OPEN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private getStoredMode(): ThemeBuilderMode {
    try {
      const m = localStorage.getItem(DRAWER_MODE_KEY);
      return m === 'advanced' ? 'advanced' : 'simple';
    } catch {
      return 'simple';
    }
  }

  private getStoredSimpleState(): ThemeBuilderSimpleState {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}-simple`);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ThemeBuilderSimpleState>;
        const state = { ...DEFAULT_SIMPLE, ...parsed };
        state.hueTorsion = Math.max(-50, Math.min(50, state.hueTorsion));
        state.vibrancy = Math.max(-50, Math.min(50, state.vibrancy));
        return state;
      }
    } catch {
      //
    }
    return { ...DEFAULT_SIMPLE };
  }

  private getStoredAdvancedState(): ThemeBuilderAdvancedState {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}-advanced`);
      if (raw) {
        return JSON.parse(raw) as ThemeBuilderAdvancedState;
      }
    } catch {
      //
    }
    return {};
  }

  private getDefaultAdvancedState(): ThemeBuilderAdvancedState {
    const state: ThemeBuilderAdvancedState = {};
    if (typeof document === 'undefined') return state;
    CSS_VAR_KEYS.forEach((key) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
      if (value) state[key] = value;
    });
    return state;
  }

  private persistDrawerOpen(): void {
    try {
      localStorage.setItem(DRAWER_OPEN_KEY, String(this._drawerOpen()));
    } catch {
      //
    }
  }

  private persistSimpleState(): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}-simple`, JSON.stringify(this._simpleState()));
    } catch {
      //
    }
  }

  private persistAdvancedState(): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}-advanced`, JSON.stringify(this._advancedState()));
    } catch {
      //
    }
  }

  loadDefaultsIntoAdvanced(): void {
    this._advancedState.set(this.getDefaultAdvancedState());
    this.persistAdvancedState();
    this.applyLivePreview();
  }
}
