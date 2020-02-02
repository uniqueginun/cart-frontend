export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || 'Cart Platform',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
      }
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3/'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'red'
  },
  /*
   ** Global CSS
   */
  css: ['bulma', '@/assets/styles/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/guide/setup.html
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://codecourse-ecommerce-be.test/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: false
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/dashboard'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
