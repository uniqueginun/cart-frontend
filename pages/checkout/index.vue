<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <ShippingAddress :addresses="addresses" v-model="form.address_id" />

          <PaymentMethods :payment-methods="paymentMethods" v-model="form.method_id" />

          <article class="message" v-if="shippingMethodId">
            <div class="message-body">
              <h1 class="title is-5">Shipping</h1>
              <div class="select is-fullwidth">
                <select v-model="shippingMethodId">
                  <option
                    v-for="method in shippingMethods"
                    :key="method.id"
                    :value="method.id"
                  >{{ method.name }} ({{ method.price }})</option>
                </select>
              </div>
            </div>
          </article>

          <article class="message" v-if="products.length">
            <div class="message-body">
              <h1 class="title is-5">Cart summary</h1>
              <CartOverview>
                <template slot="rows">
                  <tr v-if="shippingMethodId">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="has-text-weight-bold">Shipping</p>
                    </td>
                    <td>
                      <p>{{ shipping.price }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <p class="has-text-weight-bold">Total</p>
                    </td>
                    <td>
                      <p>{{ total }}</p>
                    </td>
                  </tr>
                </template>
              </CartOverview>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <button
                :disabled="empty || submitting"
                @click="order()"
                class="button is-info is-fullwidth is-medium"
              >Place order</button>
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message">
            <div class="message-body">
              <button
                :disabled="empty || submitting"
                @click="order()"
                class="button is-info is-fullwidth is-medium"
              >Place order</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOverview from '../../components/cart/CartOverview'
import ShippingAddress from '../../components/checkout/addresses/ShippingAddress'
import PaymentMethods from '../../components/checkout/paymentMethods/PaymentMethods'

import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: [
    'redirectIfGuest'
  ],
  name: 'index',
  data: () => ({
    submitting: false,
    addresses: [],
    form: {
      address_id: null,
      method_id: null
    },
    shippingMethods: [],
    paymentMethods: [],
  }),
  watch: {
    'form.address_id'(addressId) {
      this.getShippingMethodsForAddress(addressId)
    },
    shippingMethodId() {
      this.getCart()
    }
  },
  components: {
    CartOverview,
    ShippingAddress,
    PaymentMethods
  },
  computed: {
    ...mapGetters({
      total: 'cart/total',
      products: 'cart/products',
      empty: 'cart/isEmpty',
      shipping: 'cart/shipping'
    }),

    shippingMethodId: {
      get() {
        return this.shipping ? this.shipping.id : ''
      },
      set(shippingMethodId) {
        this.setShipping(
          this.shippingMethods.find(item => item.id === shippingMethodId)
        )
      }
    }
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.$get('addresses')
    const response = await app.$axios.$get('payment-methods')
    return {
      addresses: data,
      paymentMethods: response.data
    }
  },
  methods: {
    ...mapActions({
      setShipping: 'cart/setShipping',
      getCart: 'cart/getCart',
      flash: 'alert/flash'
    }),
    async getShippingMethodsForAddress(addressId) {
      const { data } = await this.$axios.get(`addresses/${addressId}/shipping`)
      this.shippingMethods = data.data
      this.setShipping(this.shippingMethods[0])
    },

    async order() {
      this.submitting = true
      let orderInfo = {
        ...this.form,
        shipping_method_id: this.shippingMethodId,
        payment_method_id: this.form.method_id
      }

      try {
        await this.$axios.post('orders', orderInfo)

        await this.getCart()

        this.$router.replace('orders')
      } catch (e) {
        this.flash(e.response.data.message)
        this.getCart()
      }

      this.submitting = false
    }
  }
}
</script>

<style scoped>
</style>
