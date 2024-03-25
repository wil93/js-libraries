const plugin = require("tailwindcss/plugin");
const daisyThemes = require("daisyui/src/theming/themes");

/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        "2xs": "384px",
        xs: "512px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...daisyThemes["cupcake"],
          "--rounded-btn": "0.625rem",
        },
      },
      {
        dark: {
          ...daisyThemes["dark"],
          "--rounded-btn": "0.625rem",
        },
      },
    ],
    logs: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(({ addVariant }) => {
      addVariant("screen", "@media screen");
    }),
  ],
};
