export const state = () => ({
  products: [],
  empty: true,
  subTotal: 0.00,
  total: 0.00,
  changed: false,
  loading: false,
  shipping: null
})


export const getters = {
  products(state) {
    return state.products
  },
  count(state) {
    return state.products.length
  },
  isEmpty(state) {
    return state.empty
  },
  subTotal(state) {
    return state.subTotal
  },
  total(state) {
    return state.total
  },
  changed(state) {
    return state.changed
  },
  loading(state) {
    return state.loading
  },
  shipping(state) {
    return state.shipping
  }
}


export const mutations = {
  SET_PRODUCT: (state, payload) => state.products = payload,
  SET_EMPTY: (state, payload) => state.empty = payload,
  SET_SUBTOTAL: (state, payload) => state.subTotal = payload,
  SET_TOTAL: (state, payload) => state.total = payload,
  SET_CHANGED: (state, payload) => state.changed = payload,
  SET_LOADING: (state, payload) => state.loading = payload,
  SET_SHIPPING: (state, payload) => state.shipping = payload
}


export const actions = {

  async getCart({
    commit, state
  }) {

    let url = 'cart'

    if(state.shipping) {
      url = url + '?shipping_method_id=' + state.shipping.id;
    }

    const response = await this.$axios.$get(url)

    commit('SET_PRODUCT', response.data.products)
    commit('SET_EMPTY', response.empty)
    commit('SET_SUBTOTAL', response.subTotal)
    commit('SET_TOTAL', response.total)
    commit('SET_CHANGED', response.changed)
    commit('SET_LOADING', false)
    return response
  },

  async destroy({
    dispatch, commit
  }, productId) {
    commit('SET_LOADING', true)
    const response = await this.$axios.$delete(`cart/${productId}`)
    dispatch('getCart')
  },

  async update({
    dispatch, commit
  }, {
    productId,
    quantity
  }) {
    commit('SET_LOADING', true)
    const response = await this.$axios.$patch(`cart/${productId}`, {
      quantity
    })
    dispatch('getCart')
  },

  async store({
                  dispatch, commit
                }, products) {
    commit('SET_LOADING', true)
    const response = await this.$axios.$post(`cart`, {
      products
    })
    dispatch('getCart')
  },

  async setShipping({commit, dispatch}, shipping) {
    commit('SET_SHIPPING', shipping)
  },

}
