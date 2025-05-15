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
          <p class="mt-3 text-center">Already have an account? <NuxtLink to="/login" class="text-decoration-none">Login here</NuxtLink></p>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const username = ref('')

  const password = ref('')
  const confirmPassword = ref('')
  
  const handleRegister = () => {
    // Here you will handle the registration logic, such as calling an API to create the user.
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match!')
      return
    }
  
    // For now, just logging the registration data
    console.log({ username: username.value, email: email.value, password: password.value })
    // TODO call API and make api to register 
  }
  </script>
  