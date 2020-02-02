<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div class="colum is-one-third" v-for="product in products" :key="product.id">
          <product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/products/Product'
export default {
  data() {
    return {
      products: []
    }
  },

  components: {
    Product
  },

  async asyncData({ params, app }) {
    const { data } = await app.$axios.$get(`products?category=${params.slug}`)
    return { products: data }
  }
}
</script>
