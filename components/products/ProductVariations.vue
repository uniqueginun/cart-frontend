<template>
  <div class="field">
    <label class="label">{{ type }}</label>
    <div class="control">
      <div class="select is-success is-fullwidth">
        <select :value="selectedValueId" @change="changed($event, type)">
          <option value>Choose Variation</option>
          <option
            v-for="item in variations"
            :disabled="!item.in_stock"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
            <template v-if="item.price_varies">({{ item.price }})</template>
            <template v-if="!item.in_stock">(out of stock)</template>
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String
    },
    variations: {
      type: Array,
      required: true
    },
    value: {
      required: false,
      default: ''
    }
  },

  computed: {
    selectedValueId() {
      if (!this.findVariationById(this.value.id)) {
        return ''
      }

      return this.value.id
    }
  },

  methods: {
    changed(event, type) {
      this.$emit('input', this.findVariationById(event.target.value))
    },

    findVariationById(id) {
      let variation = this.variations.find(item => item.id == id)
      if (typeof variation === undefined) {
        return null
      }
      return variation
    }
  }
}
</script>