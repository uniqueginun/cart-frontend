<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Payment</h1>

      <template v-if="selecting">
        <PaymentMethodsSelector @newMethodSelected="methodChanged" :paymentMethods="paymentMethods" :selected-payment-method="selectedPaymentMethod" />
      </template>
      <template v-else-if="creating">
        <CreatePaymentMethod @cancel="creating = false" @created="methodCreated" />
      </template>
      <template v-else>
        <template v-if="selectedPaymentMethod">
          <p>
            {{selectedPaymentMethod.card_type}} ending {{ selectedPaymentMethod.last_four }}
          </p>
        </template>
        <br />
        <div class="field is-grouped">
          <p class="control" v-if="paymentMethods.length">
            <a href="#" @click="selecting = true" class="button is-info">Change payment method</a>
          </p>
          <p class="control">
            <a href="#" @click="creating = true" class="button is-info">Create payment method</a>
          </p>
        </div>
      </template>

    </div>
  </article>
</template>

<script>
  import PaymentMethodsSelector from './PaymentMethodsSelector'
  import CreatePaymentMethod from './CreatePaymentMethod'

  export default {
    props: {
      paymentMethods: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        localPaymentMethods: this.paymentMethods,
        selectedPaymentMethod: null,
        selecting: false,
        creating: false
      }
    },
    computed: {
      defaultPaymentMethod() {
        const method = this.localPaymentMethods.filter(method => method.default === true)
        return method ? method[0] : this.paymentMethods[0];
      }
    },
    methods: {
      methodCreated(paymentMethod) {
        this.localPaymentMethods.push(paymentMethod)
        this.creating = false
        this.switchPaymentMethods(paymentMethod)
      },
      methodChanged(paymentMethod) {
        this.switchPaymentMethods(paymentMethod)
        this.selecting = false
      },
      switchPaymentMethods(paymentMethod) {
        this.selectedPaymentMethod = paymentMethod
      }
    },
    created() {
      if (this.paymentMethods.length) {
        this.switchPaymentMethods(this.defaultPaymentMethod)
      }
    },
    components: {
      PaymentMethodsSelector,
      CreatePaymentMethod
    },
    watch: {
      selectedPaymentMethod(paymentMethod) {
        this.$emit('input', paymentMethod.id);
      }
    }
  }
</script>

<style scoped>

</style>
