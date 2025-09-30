import type { Config } from 'tailwindcss'
import { tokens } from './src/lib/tokens'

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
        // Brand colors
        brand: {
          50: tokens.colors.indigo[100],
          100: tokens.colors.indigo[200],
          200: tokens.colors.indigo[300],
          300: tokens.colors.indigo[400],
          400: tokens.colors.indigo[500],
          500: tokens.colors.indigo[600],
          600: tokens.colors.indigo[700],
          700: tokens.colors.indigo[800],
          800: tokens.colors.indigo[900],
          DEFAULT: tokens.colors.indigo[600],
        },
        // Semantic colors
        success: tokens.colors.green[500],
        warning: tokens.colors.yellow[500],
        error: tokens.colors.red[500],
        // Theme colors - using concrete values instead of CSS vars
        foreground: {
          DEFAULT: tokens.colors.gray[900],
          dark: tokens.colors.gray[100],
        },
        background: {
          DEFAULT: tokens.colors.white,
          dark: tokens.colors.gray[900],
        },
        muted: {
          DEFAULT: tokens.colors.gray[100],
          dark: tokens.colors.gray[800],
        },
        accent: {
          DEFAULT: tokens.colors.indigo[50],
          dark: tokens.colors.indigo[900],
        },
        border: {
          DEFAULT: tokens.colors.gray[200],
          dark: tokens.colors.gray[700],
        },
      },
      fontFamily: {
        sans: ['var(--font-cofo-regular)', 'system-ui', 'sans-serif'],
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