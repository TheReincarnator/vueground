/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  displayName: "backoffice",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
    "^vuetify/lib$": "vuetify/dist/vuetify.js",
    "@nuxtjs/composition-api": "@nuxtjs/composition-api/lib/entrypoint.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/pages/**/*.vue", "<rootDir>/components/**/*.vue"],
  globals: {
    "vue-jest": {
      babelConfig: true,
    },
  },
};

module.exports = config;
