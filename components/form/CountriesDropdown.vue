<template>
  <select @change="updateCountry">
    <option>Please select</option>
    <option :value="country.id" :key="country.id" v-for="country in countries">
      {{ country.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'CountriesDropdown',
    data() {
      return {
        countries: []
      }
    },

    methods: {
      async fetchCountries() {
        const {data} = await this.$axios.get('countries');
        this.countries = data.data
      },

      updateCountry($even) {
        this.$emit('updateCountry', $even.target.value)
      }
    },

    created() {
      this.fetchCountries()
    }
  }
</script>

<style scoped>

</style>
