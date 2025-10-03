import type { Config } from 'tailwindcss'
import { tokens, semanticColors } from './src/lib/tokens'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // FREEQ Graphite Neutrals (raw tokens - use sparingly)
        graphite: {
          950: tokens.colors.graphite[950],
          900: tokens.colors.graphite[900],
          850: tokens.colors.graphite[850],
          800: tokens.colors.graphite[800],
          700: tokens.colors.graphite[700],
          650: tokens.colors.graphite[650],
          500: tokens.colors.graphite[500],
          300: tokens.colors.graphite[300],
          100: tokens.colors.graphite[100],
        },
        // Acid Accent Band
        acid: {
          400: tokens.colors.acid[400],
          500: tokens.colors.acid[500],
          600: tokens.colors.acid[600],
          DEFAULT: tokens.colors.acid[500],
        },
        // Heat Accents
        heat: {
          500: tokens.colors.heat[500],
          700: tokens.colors.heat[700],
          DEFAULT: tokens.colors.heat[500],
        },
        // Auxiliary colors
        blue: {
          500: tokens.colors.blue[500],
        },
        // Gray scale (Light theme - use sparingly)
        gray: {
          50: tokens.colors.gray[100],
          100: tokens.colors.gray[100],
          200: tokens.colors.gray[200],
          300: tokens.colors.gray[300],
          400: tokens.colors.gray[400],
          500: tokens.colors.gray[500],
          600: tokens.colors.gray[600],
          700: tokens.colors.gray[700],
          800: tokens.colors.gray[800],
          900: tokens.colors.gray[900],
        },
        // Indigo (Light theme accent)
        indigo: {
          400: tokens.colors.indigo[400],
          600: tokens.colors.indigo[600],
        },

        // ===== SEMANTIC TOKENS (Preferred - theme-aware) =====
        // These automatically switch between light/dark themes via CSS variables

        // Foreground (text) tokens
        'fg-default': semanticColors['fg-default'],      // Primary text
        'fg-muted': semanticColors['fg-muted'],          // Supporting copy
        'fg-subtle': semanticColors['fg-subtle'],        // Secondary text

        // Background tokens
        'bg-default': semanticColors['bg-default'],      // Primary background
        'bg-canvas': semanticColors['bg-canvas'],        // Full-bleed backdrop
        'bg-elevated': semanticColors['bg-elevated'],    // Elevated rows, cards
        'bg-muted': semanticColors['bg-muted'],          // Input fills, subdued panels
        'bg-subtle': semanticColors['bg-subtle'],        // Very subtle backgrounds

        // Border tokens
        'border-default': semanticColors['border-default'], // Borders, separators
        'border-subtle': semanticColors['border-subtle'],   // Subdued borders

        // Accent tokens
        'accent': semanticColors['accent-default'],      // Primary CTAs
        'accent-hover': semanticColors['accent-hover'],  // Hover states
        'accent-active': semanticColors['accent-active'], // Active states
        'accent-fg': semanticColors['accent-fg'],        // Text on accent backgrounds

        // Legacy/compatibility
        brand: {
          DEFAULT: tokens.colors.acid[500], // Map to acid for CTAs
        },
        // Semantic colors
        success: tokens.colors.green[500],
        warning: tokens.colors.yellow[500],
        error: tokens.colors.red[500],
      },
      fontFamily: {
        sans: ['CoFo Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: tokens.fontSizes.xs,
        sm: tokens.fontSizes.sm,
        base: tokens.fontSizes.body,
        lg: tokens.fontSizes.h6,
        xl: tokens.fontSizes.h5,
        '2xl': tokens.fontSizes.h4,
        '3xl': tokens.fontSizes.h3,
        '4xl': tokens.fontSizes.h2,
        '5xl': tokens.fontSizes.h1,
      },
      spacing: {
        xs: tokens.spacing.xs,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
        xl: tokens.spacing.xl,
      },
      borderRadius: {
        sm: tokens.borderRadius.sm,
        lg: tokens.borderRadius.lg,
        xl: tokens.borderRadius.xl,
      },
      lineHeight: {
        heading: tokens.lineHeights.heading,
        body: tokens.lineHeights.body,
      },
    },
  },
  plugins: [],
}

export default config