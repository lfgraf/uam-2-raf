// Design tokens extracted from tokens-2.json
export const tokens = {
  colors: {
    // Core colors
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

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
  },

  borderRadius: {
    sm: '4px',
    lg: '8px',
    xl: '16px',
  },

  fontSizes: {
    xs: '10px',
    sm: '14px',
    body: '16px',
    h6: '16px',
    h5: '20px',
    h4: '25px',
    h3: '31px',
    h2: '39px',
    h1: '49px',
  },

  fontFamilies: {
    default: 'CoFo Sans',
  },

  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600', // For hierarchy shifts
  },

  lineHeights: {
    heading: '110%',
    body: '140%',
  },
}

// FREEQ Theme-specific tokens
export const darkTheme = {
  // Dark theme is canonical - uses Graphite scale
  fg: {
    default: tokens.colors.graphite[100], // Primary text
    muted: tokens.colors.graphite[300],   // Supporting copy
    subtle: tokens.colors.graphite[500],  // Secondary text
  },
  bg: {
    default: tokens.colors.graphite[900], // Primary background
    canvas: tokens.colors.graphite[950],  // Full-bleed backdrop
    elevated: tokens.colors.graphite[850], // Elevated rows
    muted: tokens.colors.graphite[800],   // Input fills
    subtle: tokens.colors.graphite[700],  // Borders
  },
  accent: {
    default: tokens.colors.acid[500],     // Primary interaction
    hover: tokens.colors.acid[400],       // Hover states
    active: tokens.colors.acid[600],      // Active states
    onAccent: tokens.colors.graphite[950], // Text on acid
  },
}

export const lightTheme = {
  // Light theme uses Gray scale
  fg: {
    default: tokens.colors.black,
    muted: tokens.colors.gray[700],
    subtle: tokens.colors.gray[500],
  },
  bg: {
    default: tokens.colors.white,
    canvas: tokens.colors.gray[100],
    elevated: tokens.colors.white,
    muted: tokens.colors.gray[100],
    subtle: tokens.colors.gray[200],
  },
  accent: {
    default: tokens.colors.indigo[600],
    hover: tokens.colors.indigo[400],
    active: tokens.colors.indigo[600],
    onAccent: tokens.colors.white,
  },
}