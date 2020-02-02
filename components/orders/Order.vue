<template>
  <tr>
    <td>#{{ order.id }}</td>
    <td>{{ order.created_at }}</td>
    <td>
      <div>
        <nuxt-link
          v-for="variation in products"
          :key="variation.id"
          :to="{
              name: 'products-slug',
              params: {
                  slug: variation.product.slug
              }
          }"
        >{{ variation.product.name }} ({{ variation.name }}) - {{ variation.type }}</nuxt-link>
      </div>
      <template v-if="moreProducts > 0">and {{ moreProducts }} more</template>
    </td>
    <td>{{ order.subtotal }}</td>
    <td>
      <component :is="order.status"></component>
    </td>
  </tr>
</template>

<script>
import OrderStatusPaymentFailed from '@/components/orders/statuses/OrderStatus-payment_failed'
import OrderStatusPending from '@/components/orders/statuses/OrderStatus-pending'
import OrderStatusProcessing from '@/components/orders/statuses/OrderStatus-processing'
import OrderStatusCompleted from '@/components/orders/statuses/OrderStatus-completed'

export default {
  components: {
    payment_failed: OrderStatusPaymentFailed,
    pending: OrderStatusPending,
    processing: OrderStatusProcessing,
    completed: OrderStatusCompleted
  },
  data() {
    return {
      maxProducts: 1,
      statusClasses: {
        'is-success': this.order.status === 'completed',
        'is-info':
          this.order.status === 'processing' || this.order.status === 'pending',
        'is-danger': this.order.status === 'payment_failed'
      }
    }
  },
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  computed: {
    products() {
      return this.order.products.slice(0, this.maxProducts)
    },

    moreProducts() {
      return this.order.products.length - this.maxProducts
    }
  }
}
</script>