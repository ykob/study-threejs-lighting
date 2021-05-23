import sass from 'sass'

export default {
  server: {
    port: 8080, // デフォルト: 3000,
    host: '0.0.0.0', // デフォルト: localhost
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'study-threejs-lighting',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    '@/assets/css/global.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/webgl'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
    {
      path: '@/components/icon/',
      prefix: 'Icon',
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: sass,
      },
    },
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|fs|vs)$/,
        exclude: /(node_modules)/,
        use: [
          'glslify-import-loader',
          'raw-loader',
          'glslify-loader',
        ],
      })
    },
  },

  styleResources: {
    scss: [
      '@/assets/css/variables.scss',
      '@/assets/css/functions.scss',
      '@/assets/css/mixins.scss',
    ],
  },
}
