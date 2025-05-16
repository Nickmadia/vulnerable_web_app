<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow p-5 rounded-4" style="min-width: 400px; max-width: 90%;">
        <h2 class="text-center mb-4 text-primary">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="username"
              class="form-control"
              id="username"
              v-model="username"
              required
              placeholder="username"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 py-2">
            Log in
          </button>
          <!-- Error / Success Alerts -->
      <BaseAlert v-if="errorMessage" type="danger" :message="errorMessage" />
      <BaseAlert v-if="successMessage" type="success" :message="successMessage" />
        </form>
        <p class="text-center mt-3 text-muted">Don't have an account? <a href="/register" class="text-decoration-none">Register</a></p>
      </div>
    </div>
  </template>
  
<script>
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'
import { errorMessages } from 'vue/compiler-sfc'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      errorMessage : '',
      successMessage : '',  
    }
  },
  methods: {
    async handleLogin() {

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        })
        const data = await res.json()
        console.log(data)
        if (!res.ok) throw new Error(data.statusMessage || 'Registration failed')
        const { setAuth } = useAuth()
        setAuth(data)
        this.successMessage = 'Login successful!'
        setTimeout( () => {
          this.$router.push("/")

        }, 1000
      )
      } catch (error) {

        this.errorMessage = error.message 
      }
    },
    setup() {
      onMounted(() => {
  if (loggedIn.value) router.push('/')
})
    }
  }
}
</script>