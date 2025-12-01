import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const customTextPlugin = plugin(function ({ addUtilities }) {
  const textSizes = {
    'display-3xl': '--text-display-3xl',
    'display-2xl': '--text-display-2xl',
    'display-xl': '--text-display-xl',
    'display-lg': '--text-display-lg',
    'display-md': '--text-display-md',
    'display-sm': '--text-display-sm',
    'display-xs': '--text-display-xs',
    xl: '--text-xl',
    lg: '--text-lg',
    md: '--text-md',
    sm: '--text-sm',
    xs: '--text-xs',
  };

  const fontWeights = {
    regular: '--font-weight-regular',
    medium: '--font-weight-medium',
    semibold: '--font-weight-semibold',
    bold: '--font-weight-bold',
    extrabold: '--font-weight-extrabold',
  };

  const utilities: Record<string, any> = {};

  for (const [sizeKey, sizeVar] of Object.entries(textSizes)) {
    for (const [weightKey, weightVar] of Object.entries(fontWeights)) {
      const className = `.text-${sizeKey}-${weightKey}`;

      utilities[className] = {
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${sizeVar}--line-height)`,
        letterSpacing: `var(${sizeVar}--letter-spacing, normal)`,
        fontWeight: `var(${weightVar})`,
      };
    }
  }

  addUtilities(utilities, ['responsive']);
});

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [customTextPlugin],
} satisfies Config;
