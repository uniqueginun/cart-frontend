<template>
  <div>
    <form @submit.prevent="store">
      <div class="field">
        <div id="card-element"></div>
      </div>

      <div class="field is-grouped">
        <p class="control">
          <button type="submit" :disabled="storing" class="button is-primary">
            Store Card
          </button>
        </p>
        <p class="control">
          <a @click="$emit('cancel')" class="button is-light">
            Cancel
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
          stripe: null,
          card: null,
          storing: false
      }
    },
    methods: {
      async store() {
        this.storing = true
        const {token, error} = await this.stripe.createToken(this.card)
        if(error) {

        } else {
          const {data} = await this.$axios.$post('payment-methods', {
            token: token.id
          });
          this.$emit('created', data)
        }
        this.storing = false
      }
    },
    mounted() {
      let stripe = Stripe('pk_test_gS9NIrtDVzQA0veYEJTW7JMU');
      this.stripe = stripe
      this.card = this.stripe.elements().create('card', {
        style: {
          base: {
            fontSize: '16px'
          }
        }
      })
      this.card.mount('#card-element')
    }
  }
</script>

<style scoped>

</style>
