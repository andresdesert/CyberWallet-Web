// src/types/mui.d.ts
import '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { getCustomColors } from '@/components/theme/theme';

declare module '@mui/material/styles' {
  interface Palette {
    custom: ReturnType<typeof getCustomColors>;
  }

  interface PaletteOptions {
    custom?: ReturnType<typeof getCustomColors>;
  }

  interface Theme {
    designTokens: {
      opacity: {
        glassDefault: number;
        glassLight: number;
        glassHeavy: number;
      };
      blur: {
        soft: string;
        medium: string;
        strong: string;
      };
      radius: {
        sharp: string;
        default: string;
        rounded: string;
        pill: string;
      };
    };
    isComfort: boolean;
    styles: {
      generateGlass: (options?: {
        opacityKey?: keyof typeof import('@/components/theme/theme').designTokens['opacity'];
        blurKey?: keyof typeof import('@/components/theme/theme').designTokens['blur'];
        radiusKey?: keyof typeof import('@/components/theme/theme').designTokens['radius'];
      }) => Record<string, unknown>;
      getGlow: () => Record<string, unknown>;
      getBlobStyle: () => Record<string, unknown>;
    };
  }

  interface ThemeOptions {
    designTokens?: {
      opacity?: {
        glassDefault?: number;
        glassLight?: number;
        glassHeavy?: number;
      };
      blur?: {
        soft?: string;
        medium?: string;
        strong?: string;
      };
      radius?: {
        sharp?: string;
        default?: string;
        rounded?: string;
        pill?: string;
      };
    };
    isComfort?: boolean;
    styles?: {
      generateGlass?: (options?: {
        opacityKey?: keyof typeof import('@/components/theme/theme').designTokens['opacity'];
        blurKey?: keyof typeof import('@/components/theme/theme').designTokens['blur'];
        radiusKey?: keyof typeof import('@/components/theme/theme').designTokens['radius'];
      }) => Record<string, unknown>;
      getGlow?: () => Record<string, unknown>;
      getBlobStyle?: () => Record<string, unknown>;
    };
  }
}