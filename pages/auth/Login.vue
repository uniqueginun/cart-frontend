<template>
  <div class="container">
    <div class="coulmns is-hcentered is-desktop is-vcentered">
      <div class="column is-three-fifths">
        <form @submit.prevent="login">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                v-model="form.email"
                placeholder="Email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                v-model="form.password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  middleware: [
    'redirectIfAuthenticated'
  ],
  data() {
    return {
      form: {
        email: 'uniqueginun@gmail.com',
        password: 'password'
      }
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form
        })

        if (this.$route.query.redirect) {
          this.$router.replace(this.$route.query.redirect)
          return
        }

        this.$router.replace('/cart')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="css">
.coulmns {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
</style>
