<template>
  <div class="notification is-danger is-light" v-if="alert">
    <button class="delete" @click="clear"></button>
    {{alert}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      alert: 'alert/message'
    })
  },
  methods: {
    ...mapActions({
      clear: 'alert/clear'
    })
  }
}
</script>