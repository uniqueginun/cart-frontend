<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <h1 class="title is-4">Your cart</h1>
          <article class="message">
            <CartOverview v-if="products.length" />
            <h1 v-else class="title is-5">Your cart is empty</h1>
          </article>
          <nuxt-link to="/checkout" v-if="!isEmpty" :disabled="loading" :class="[loading ? ' is-loading ' : '', ' button is-fullwidth is-info ']">Checkout</nuxt-link>
          <h1 v-else class="title is-5">Your cart is technically empty</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOverview from '@/components/cart/CartOverview'
import { mapGetters } from 'vuex'
export default {
  components: {
    CartOverview
  },

  computed: {
    ...mapGetters({
      isEmpty: 'cart/isEmpty',
      products: 'cart/products',
      loading: 'cart/loading'
    })
  }
}
</script>
