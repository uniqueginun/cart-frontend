<template>
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Ship to</h1>

      <template v-if="selecting">
        <ShippingAddressSelector @newAddressSelected="addressChanged" :addresses="addresses" :selected-address="selectedAddress" />
      </template>
      <template v-else-if="creating">
        <CreateShippingAddress @cancel="creating = false" @created="addressCreated" />
      </template>
      <template v-else>
        <template v-if="selectedAddress">
          <p>
            {{selectedAddress.name}}<br />
            {{selectedAddress.address_1}}<br />
            {{selectedAddress.city}}, {{selectedAddress.country.name}}<br />
            {{selectedAddress.postal_code}}<br />
          </p>
        </template>
        <br />
        <div class="field is-grouped">
          <p class="control">
            <a href="#" @click="selecting = true" class="button is-info">Change shipping address</a>
          </p>
          <p class="control">
            <a href="#" @click="creating = true" class="button is-info">Create address</a>
          </p>
        </div>
      </template>

    </div>
  </article>
</template>

<script>
  import ShippingAddressSelector from './ShippingAddressSelector'
  import CreateShippingAddress from './CreateShippingAddress'

  export default {
    name: 'ShippingAddress',
    props: {
      addresses: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        localAddresses: this.addresses,
        selectedAddress: null,
        selecting: false,
        creating: false
      }
    },
    computed: {
      defaultAddress() {
        const add = this.localAddresses.filter(add => add.default === true)
        return add ? add[0] : this.addresses[0];
      }
    },
    methods: {
      addressCreated(address) {
        this.localAddresses.push(address)
        this.creating = false
        this.switchAddress(address)
      },
      addressChanged(address) {
        this.switchAddress(address)
        this.selecting = false
      },
      switchAddress(address) {
        this.selectedAddress = address
      }
    },
    created() {
      if (this.addresses.length) {
        this.switchAddress(this.defaultAddress)
      }
    },
    components: {
      ShippingAddressSelector,
      CreateShippingAddress
    },
    watch: {
      selectedAddress(address) {
        this.$emit('input', address.id);
      }
    }
  }
</script>

<style scoped>

</style>
