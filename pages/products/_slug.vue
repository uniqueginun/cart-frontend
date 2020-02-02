<template>
  <div class="container">
    <div class="columns has-margin-7">
      <div class="column">
        <img height="620" width="620" src="https://via.placeholder.com/620" />
      </div>
      <div class="column">
        <p class="is-size-3 has-text-weight-bold">{{ product.name }}</p>
        <p class="is-size-6">{{ product.description }}</p>
        <hr />
        <span v-if="!product.in_stock" class="tag is-dark is-medium is-rounded">out of stock</span>
        <span class="tag is-primary">{{ product.price }}</span>
        <br />
        <br />
        <div class="section">
          <form action="" @submit.prevent="add" >
            <product-variations
              v-for="(variations, type) in product.variations"
              :key="type"
              :type="type"
              :variations="variations"
              v-model="form.variation"
            />
            <div v-if="form.variation" class="field has-addons has-margin-top-2">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="form.quantity">
                    <option v-for="x in parseInt(form.variation.stock_count)" :key="x">{{x}}</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <button type="submit" class="button is-info">Add To Cart</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductVariations from '@/components/products/ProductVariations'
import {mapActions} from "vuex"

export default {
  data() {
    return {
      product: null,
      form: {
        variation: '',
        quantity: 1
      }
    }
  },
  async asyncData({ params, app }) {
    const { data } = await app.$axios.$get(`products/${params.slug}`)
    return { product: data }
  },

  watch: {
    'form.variation'() {
      this.form.quantity = 1
    }
  },

  components: {
    ProductVariations
  },

  methods: {
    ...mapActions({
      store: 'cart/store'
    }),

    add() {
      this.store([{
        id: this.form.variation.id,
        quantity: this.form.quantity
      }]).then(() => {
        this.form = {
          variation: '',
          quantity: 1
        }
      })
    }
  }
}
</script>

<style>
.column {
  background: white;
}
</style>
