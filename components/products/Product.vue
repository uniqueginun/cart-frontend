<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is4by3">
        <nuxt-link :to="link">
          <img src="https://via.placeholder.com/340" alt="Placeholder image" />
        </nuxt-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <nuxt-link :to="link">
            <p class="title is-4">{{ product.name }}</p>
          </nuxt-link>
        </div>
      </div>

      <div class="content">
        {{ product.description }}
        <br />
        <br />
        <div class="tag is-primary is-rounded">$ {{ product.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
      type: Object
    }
  },

  computed: {
    link() {
      return { name: 'products-slug', params: { slug: this.product.slug } }
    }
  }
}
</script>
