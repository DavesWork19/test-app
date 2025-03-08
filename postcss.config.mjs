/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '480px',
        'mantine-breakpoint-sm': '480px',
        'mantine-breakpoint-md': '768px',
        'mantine-breakpoint-lg': '1280px',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};

export default config;
