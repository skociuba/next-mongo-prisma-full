import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-grey': '#1f2937',
        'custom-light-grey': '#374151',
        'custom-purple': '#500724',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
};
export default config;
