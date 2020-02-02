<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
    <tr v-for="method in paymentMethods" :key="method.id">
      <td>
        <p :class="{ 'has-text-weight-bold' : method.id == selectedPaymentMethod.id }">
          {{method.card_type}} ending {{ method.last_four }}
        </p>
      </td>
      <td>
        <a href="#" @click="$emit('newMethodSelected', method)" class="button is-info">Pay with</a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      paymentMethods: {
        required: true,
        type: Array
      },
      selectedPaymentMethod: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>

</style>
