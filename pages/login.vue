<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow p-5 rounded-4" style="min-width: 400px; max-width: 90%;">
        <h2 class="text-center mb-4 text-primary">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              placeholder="you@example.com"
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
        </form>
        <p class="text-center mt-3 text-muted">Don't have an account? <a href="#" class="text-decoration-none">Register</a></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      handleLogin() {
        console.log('Email:', this.email)
        console.log('Password:', this.password)
        // Add your login logic here
      }
    }
  }
  </script>
  