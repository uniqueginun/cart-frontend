<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
      <CartOverviewItem v-for="product in products" :key="product.id" :product="product" />
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <p class="has-text-weight-bold">Subtotal</p>
        </td>
        <td>
          <p>{{ subTotal }}</p>
        </td>
      </tr>
      <slot name="rows" />
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import CartOverviewItem from '@/components/cart/CartOverviewItem'
export default {
  computed: {
    ...mapGetters({
      products: 'cart/products',
      subTotal: 'cart/subTotal',
      total: 'cart/total'
    })
  },
  components: {
    CartOverviewItem
  }
}
</script>
