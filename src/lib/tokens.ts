// Design tokens extracted from tokens-2.json
export const tokens = {
  colors: {
    // Core colors
    black: '#000000',
    white: '#ffffff',

    // Gray scale
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

    // Brand colors
    indigo: {
      50: '#f0f9ff',
      100: '#ebf4ff',
      200: '#c3dafe',
      300: '#a3bffa',
      400: '#7f9cf5',
      500: '#667eea',
      600: '#5a67d8',
      700: '#4c51bf',
      800: '#434190',
      900: '#3c366b',
    },

    // Semantic colors
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
    regular: '400',
    medium: '500',
  },

  lineHeights: {
    heading: '110%',
    body: '140%',
  },
}

// Theme-specific tokens
export const lightTheme = {
  fg: {
    default: tokens.colors.black,
    muted: tokens.colors.gray[700],
    subtle: tokens.colors.gray[500],
  },
  bg: {
    default: tokens.colors.white,
    muted: tokens.colors.gray[100],
    subtle: tokens.colors.gray[200],
  },
  accent: {
    default: tokens.colors.indigo[400],
    onAccent: tokens.colors.white,
    bg: tokens.colors.indigo[200],
  },
}

export const darkTheme = {
  fg: {
    default: tokens.colors.white,
    muted: tokens.colors.gray[300],
    subtle: tokens.colors.gray[500],
  },
  bg: {
    default: tokens.colors.gray[900],
    muted: tokens.colors.gray[700],
    subtle: tokens.colors.gray[600],
  },
  accent: {
    default: tokens.colors.indigo[600],
    onAccent: tokens.colors.white,
    bg: tokens.colors.indigo[800],
  },
}