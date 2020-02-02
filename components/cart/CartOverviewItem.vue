<template>
  <tr>
    <td width="120">
      <img src="https://via.placeholder.com/60" :alt="product.name" />
    </td>
    <td>{{ product.product.name + ' / ' + product.type + ' ' + product.name }}</td>
    <td>{{ product.price }}</td>
    <td width="160">
      <div class="field">
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="quantity">
              <option v-if="product.quantity == 0" value="0">0</option>
              <option
                :selected="product.quantity == x"
                v-for="x in product.stock_count"
                :key="x"
                :value="x"
              >{{ x }}</option>
            </select>
          </div>
        </div>
      </div>
    </td>
    <td>{{ product.total }}</td>
    <td>
      <button type="button" @click="destroy(product.id)" class="button is-danger is-outlined">
        <span>Delete</span>
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    quantity: {
      get() {
        return this.product.quantity
      },

      set(quantity) {
        this.update({
          productId: this.product.id,
          quantity
        })
      }
    }
  },

  props: {
    product: {
      required: true,
      type: Object
    }
  },

  methods: {
    ...mapActions({
      destroy: 'cart/destroy',
      update: 'cart/update'
    })
  }
}
</script>
