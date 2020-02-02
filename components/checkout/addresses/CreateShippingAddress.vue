<template>
  <div>
    <form @submit.prevent="store">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.name" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Address 1</label>
            <div class="control">
              <input class="input" type="text" v-model="form.address_1" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Postal code</label>
            <div class="control">
              <input class="input" type="text" v-model="form.postal_code" />
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">City</label>
            <div class="control">
              <input class="input" type="text" v-model="form.city" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Country</label>
            <p class="control has-icons-left">
                <span class="select  is-fullwidth">
                  <CountriesDropdown @updateCountry="updateCountry" />
                </span>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button type="submit" class="button is-primary">
            Save Address
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
  import CountriesDropdown from '../../form/CountriesDropdown'

  export default {
    name: 'CreateShippingAddress',
    components: { CountriesDropdown },
    data() {
      return {
        form: {
          name: '',
          address_1: '',
          postal_code: '',
          city: '',
          country_id: '',
          default: true
        }
      }
    },
    methods: {
      async store() {
        const {data} = await this.$axios.$post('addresses', this.form);
        this.resetForm()
        this.$emit('created', data)
      },
      resetForm() {
        this.form = {
          name: '',
          address_1: '',
          postal_code: '',
          city: '',
          country_id: '',
          default: true
        }
      },

      updateCountry(id) {
        this.form.country_id = id;
      }
    }
  }
</script>

<style scoped>

</style>
