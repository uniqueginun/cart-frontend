<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="{ name: 'index }">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </nuxt-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">Home</nuxt-link>

        <template v-for="category in categories">
          <div
            v-if="category.children.length"
            :key="category.slug"
            class="navbar-item has-dropdown is-hoverable"
          >
            <nuxt-link
              :to="{ name: 'categories-slug', params: { slug: category.slug } }"
              class="navbar-link"
            >{{ category.name }}</nuxt-link>

            <div v-for="child in category.children" :key="child.slug" class="navbar-dropdown">
              <nuxt-link
                :to="{ name: 'categories-slug', params: { slug: child.slug } }"
                class="navbar-item"
              >{{ child.name }}</nuxt-link>
            </div>
          </div>
          <nuxt-link
            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
            v-else
            :key="category.slug"
            class="navbar-item"
          >{{ category.name }}</nuxt-link>
        </template>
      </div>

      <div class="navbar-end">
        <template v-if="!$auth.loggedIn">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <nuxt-link to="/auth/login" class="button is-light">Log in</nuxt-link>
            </div>
          </div>
        </template>
        <template v-else>
          <nuxt-link to="/" class="navbar-item">{{ $auth.user.data.name }}</nuxt-link>
          <nuxt-link :to="{ name: 'cart' }" class="navbar-item">Cart ({{cartCount}})</nuxt-link>
          <nuxt-link :to="{ name: 'orders' }" class="navbar-item">Orders</nuxt-link>
          <a href="#" @click="logout()" class="navbar-item">Logout</a>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      categories: 'categories',
      cartCount: 'cart/count'
    })
  },

  methods: {
    async logout() {

      try {
        await this.$auth.logout()

        this.$route.replace({
          name: 'auth-login'
        })

      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
