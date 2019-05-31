import Vue from 'vue'

export const strict = true

export const state = () => ({
  authUser: { authenticated: false },
  locale: null,
  locales: ['en', 'fr', 'zh'],
  isMenuHidden: false,
  account: null,
  session: null,
  token: null,
  authMenu: []
})

export const mutations = {
  SET_TOKEN(state, token = null) {
    state.token = token
  },
  SET_AUTH_MENU(state, authMenu = []) {
    state.authMenu = authMenu
  },
  SET_USER(state, authUser = null) {
    let values = { authenticated: false }
    if (authUser !== null) {
      values = Object.assign(values, authUser)
    }
    for (const [key, value] of Object.entries(values)) {
      Vue.set(state.authUser, key, value)
    }
  },
  SET_LANG(state, locale) {
    const normalized = locale.toLowerCase().split('-')[0]
    if (state.locales.indexOf(normalized) !== -1) {
      state.locale = normalized
    }
  },
  TOGGLE_MENU_HIDDEN: function(state) {
    state.isMenuHidden = !state.isMenuHidden
  }
}

export const getters = {
  authenticated(state) {
    const hasAuthenticated = Reflect.has(state.authUser, 'authenticated')
    let authenticated = false
    if (hasAuthenticated) {
      authenticated = state.authUser.authenticated
    }
    return authenticated
  },
  userTimeZone(state) {
    const hasTimeZone = Reflect.has(state.authUser, 'tz')
    const timeZone = 'America/New_York' // Default, in case of
    return hasTimeZone ? state.authUser.tz : timeZone
  },
  userLocale(state) {
    const hasLocale = Reflect.has(state.authUser, 'locale')
    const locale = 'en-US' // Default, in case of
    return hasLocale ? state.authUser.locale : locale
  },
  authUser(state) {
    return state.authUser
  },
  isMenuHidden(state) {
    return state.isMenuHidden
  },
  displayName(state) {
    const DispName = `Anonymous`
    const hasDisplayNameProperty = Reflect.has(state.authUser, 'DispName')
    return hasDisplayNameProperty ? state.authUser.DispName : DispName
  }
}

export const actions = {
  /**
   * This is run ONLY from the backend side.
   *
   * > If the action nuxtServerInit is defined in the store, Nuxt.js will call it with the context
   * > (only from the server-side).
   * > It's useful when we have some data on the server we want to give directly to the client-side.
   *
   * https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
   * https://github.com/clarkdo/hare/blob/dev/client/store/index.js
   * https://github.com/nuxt/docs/blob/master/en/guide/vuex-store.md
   */
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.token && req.session.authUser) {
      commit('SET_TOKEN', req.session.token)
      commit('SET_USER', req.session.authUser)
      commit('SET_AUTH_MENU', req.session.authMenu)
    }
  },
  async logout({ commit }, callback) {
    await this.$axios.post('/mpi/auth/logout')
    commit('SET_TOKEN')
    callback()
  },
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU_HIDDEN')
  }
}
