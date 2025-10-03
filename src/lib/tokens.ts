// Design tokens based on tokens-2.json with FREEQ color values
export const tokens = {
  // Core primitive colors
  colors: {
    // Base colors
    black: '#000000',
    white: '#ffffff',

    // FREEQ Graphite Neutrals (Dark theme - canonical palette)
    graphite: {
      950: '#0F1116', // Global backdrop, full-bleed canvas
      900: '#151820', // Primary page background
      850: '#1A1E26', // Elevated rows, navigation rails
      800: '#202530', // Input fills, subdued panels
      700: '#2A303A', // Borders, separators, inactive states
      650: '#313844', // Chips, muted text containers
      500: '#515B6B', // Secondary text, icon strokes
      300: '#A4AEBB', // Supporting copy, helper text
      100: '#E7ECF2', // Primary text, high-emphasis icons
    },

    // Acid Accent Band (electric thread, <5% screen usage)
    acid: {
      400: '#B2F200', // Hover or focus halo—slim highlights
      500: '#C9FF00', // Primary interaction cues (focus ring, key CTA)
      600: '#D7FF3A', // Live motion or peak data points
    },

    // Heat & Auxiliary Accents
    heat: {
      500: '#FF5E86', // Secondary emphasis (warnings, pending)
      700: '#FF4778', // Gradient anchor for momentary attention
    },

    blue: {
      500: '#4299E1', // Cool glow for backgrounds or data lines
    },

    // Gray scale (Light theme scaffold)
    gray: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },

    // Indigo (Light theme accent)
    indigo: {
      400: '#7f9cf5', // Alternate highlight in lighter contexts
      600: '#5a67d8', // Light theme accent default
    },

    // Semantic colors (keep for compatibility)
    red: {
      100: '#fff5f5',
      500: '#f56565',
      600: '#e53e3e',
    },
    green: {
      100: '#f0fff4',
      500: '#48bb78',
      600: '#38a169',
    },
    yellow: {
      100: '#fffff0',
      500: '#ecc94b',
      600: '#d69e2e',
    },
  },

  // Spacing scale (from tokens-2.json)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },

  // Border radius scale (from tokens-2.json)
  borderRadius: {
    sm: '4px',
    lg: '8px',
    xl: '16px',
  },

  // Typography scales (from tokens-2.json)
  fontSizes: {
    xs: '10px',      // body * 0.65
    sm: '14px',      // body * 0.85
    body: '16px',    // base size
    h6: '16px',      // body * 1.25^0
    h5: '20px',      // body * 1.25^1
    h4: '25px',      // body * 1.25^2
    h3: '31px',      // body * 1.25^3
    h2: '39px',      // body * 1.25^4
    h1: '49px',      // body * 1.25^5
  },

  fontFamilies: {
    default: 'CoFo Sans',
    heading: 'CoFo Sans',
    body: 'CoFo Sans',
  },

  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
  },

  lineHeights: {
    heading: '110%',
    body: '140%',
  },

  letterSpacing: {
    default: '0',
    decreased: '-0.05em', // FREEQ refined density for headings
  },
}

// Light theme semantic tokens (from tokens-2.json structure with FREEQ values)
export const lightTheme = {
  fg: {
    default: tokens.colors.gray[900],    // Primary text (not pure black - easier on eyes)
    muted: tokens.colors.gray[600],      // Supporting copy
    subtle: tokens.colors.gray[500],     // Secondary text
  },
  bg: {
    default: tokens.colors.white,        // Primary background
    muted: tokens.colors.gray[100],      // Subdued backgrounds
    subtle: tokens.colors.gray[200],     // Very subtle backgrounds
  },
  accent: {
    default: tokens.colors.indigo[600],  // Light theme uses indigo (not acid)
    onAccent: tokens.colors.white,       // Text on accent
    bg: tokens.colors.indigo[400],       // Accent background variant
  },
  shadows: {
    default: tokens.colors.gray[900],    // Shadow color
  },
}

// Dark theme semantic tokens (FREEQ canonical - uses Graphite/Acid)
export const darkTheme = {
  fg: {
    default: tokens.colors.graphite[100], // Primary text (#E7ECF2 - not pure white)
    muted: tokens.colors.graphite[300],   // Supporting copy
    subtle: tokens.colors.graphite[500],  // Secondary text
  },
  bg: {
    default: tokens.colors.graphite[900], // Primary background (#151820)
    muted: tokens.colors.graphite[800],   // Subdued backgrounds (input fills)
    subtle: tokens.colors.graphite[700],  // Very subtle backgrounds
  },
  accent: {
    default: tokens.colors.acid[500],     // FREEQ Acid accent (#C9FF00)
    onAccent: tokens.colors.graphite[950], // Text on acid (dark for contrast)
    bg: tokens.colors.acid[400],          // Accent background variant (hover)
  },
  shadows: {
    default: 'rgba(0, 0, 0, 0.3)',        // Shadow color for dark mode
  },
}

// Semantic color CSS variable references (theme-aware)
// These automatically switch between light/dark based on .dark class
export const semanticColors = {
  // Foreground (Text) tokens
  'fg-default': 'var(--color-fg-default)',
  'fg-muted': 'var(--color-fg-muted)',
  'fg-subtle': 'var(--color-fg-subtle)',

  // Background tokens
  'bg-default': 'var(--color-bg-default)',
  'bg-muted': 'var(--color-bg-muted)',
  'bg-subtle': 'var(--color-bg-subtle)',

  // Accent tokens
  'accent-default': 'var(--color-accent-default)',
  'accent-on': 'var(--color-accent-on)',       // Text on accent
  'accent-bg': 'var(--color-accent-bg)',       // Accent background variant

  // Shadow tokens
  'shadow-default': 'var(--color-shadow-default)',
}