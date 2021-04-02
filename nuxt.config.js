import { ESBuildPlugin, ESBuildMinifyPlugin } from 'esbuild-loader'

/** @type {import('@nuxt/types').NuxtConfig} */
const config = {
  modern: false,
  router: {
    // Don't forget to change this in docker/nginx.conf and with the head block below
    base: '/',
    middleware: [],
  },
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'VueGround',
    title: 'VueGround',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['nuxt-i18n'],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: './vuetify.options.ts',
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    terser: false,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    babel: {
      presets(_options, [_preset, options]) {
        options.targets = {
          client: {
            chrome: '80',
          },
        }
      },
    },
    additionalExtensions: ['ts', 'tsx'],
    extend(config) {
      config.resolve.extensions.push('.ts', '.tsx')
      const jsxRuleIndex = config.module.rules.findIndex(r => '.jsx'.match(r.test))
      config.plugins.push(new ESBuildPlugin())
      config.plugins.push(new ESBuildMinifyPlugin())
      config.module.rules.splice(jsxRuleIndex, 1, {
        test: /\.((m?jsx?)|(tsx?))$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
            },
          },
        ],
      })

      return config
    },
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.js',
      },

      {
        code: 'en',
        name: 'English',
        file: 'en.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'de',
  },
}

export default config
