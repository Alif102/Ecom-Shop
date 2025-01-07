import daisyui from 'daisyui';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
    },
  },
  plugins: [
    daisyui,
    aspectRatio,
  ],
  daisyui: {
    themes: ["light", "cupcake"],
  }
};
