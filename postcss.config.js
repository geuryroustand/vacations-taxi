module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: { flexbox: "no-2009" },
        stage: 3,
        features: { "custom-properties": false }
      }
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./node_modules/react-bootstrap/**/*.js"
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ["html", "body"],
          // Bootstrap class to keep it
          deep: [
            /^fade/,
            /^offcanvas-backdrop/,
            /^show/,
            /^offcanvas/,
            /^navbar/,
            /^container/,
            /^modal/,
            /^form-control/,
            /^btn/,
            /^spinner-border/,
            /^invalid-feedback/,
            /^react-datepicker__portal/,
            /^react-datepicker/,
            /^PhoneInput/
          ]
        },
        keyframes: true
        // variables: true,
      }
    ]
  ]
};
// react-datepicker
// react-datepicker__portal
// react-datepicker__input-container
// was-validated
// btn
// mb-3
// form-check
// form-check-input
// form-check-label
// text-muted form-text
// form-control
// invalid-feedback
// visually-hidden form-label

// spinner-border

// "modal show
// fade
// modal-backdrop
