<template>
    <table class="table is-hoverable is-fullwidth">
      <tbody>
        <tr v-for="address in addresses" :key="address.id">
          <td>
            <p :class="{ 'has-text-weight-bold' : address.id == selectedAddress.id }">
              {{address.name}}<br />
              {{address.address_1}}<br />
              {{address.city}}, {{selectedAddress.country.name}}<br />
              {{address.postal_code}}<br />
            </p>
          </td>
          <td>
            <a href="#" @click="$emit('newAddressSelected', address)" class="button is-info">Ship here</a>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
  export default {
    name: 'ShippingAddressSelector',
    props: {
      addresses: {
        required: true,
        type: Array
      },
      selectedAddress: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>

</style>
