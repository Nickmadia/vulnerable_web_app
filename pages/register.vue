<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow p-5 rounded-4" style="min-width: 400px; max-width: 90%;">
        <h2 class="text-center mb-4 text-primary">Register</h2>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" id="username" v-model="username" class="form-control" placeholder="Enter your username" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" required />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" placeholder="Confirm your password" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button>
          </form>
          <BaseAlert v-if="errorMessage" type="danger" :message="errorMessage" />
          <BaseAlert v-if="successMessage" type="success" :message="successMessage" />
          <p class="mt-3 text-center">Already have an account? <NuxtLink to="/login" class="text-decoration-none">Login here</NuxtLink></p>

            <!-- Error / Success Alerts -->
        </div>
      </div>
  </template>
  
 <script>
 import BaseAlert from '@/components/BaseAlert.vue'
export default {
  data() {
    return {
      username: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.statusMessage || 'Registration failed')

        this.successMessage = 'Registration successful. You can now log in.'
        this.errorMessage = ''
        this.username = ''
        this.password = ''
        setTimeout( () => {
          this.$router.push("/login")

        }, 1000
      )
      } catch (err) {
        this.errorMessage = err.message
        console.error(err)
      }
    }
  }
}
</script>

  