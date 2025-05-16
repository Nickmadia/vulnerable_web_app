<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand">MyBlog</NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav ms-auto">

            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            </li>

            <!-- Not Logged In -->
            <template v-if="!loggedIn">
              <li class="nav-item">
                <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/register" class="nav-link">Register</NuxtLink>
              </li>
            </template>

            <!-- Logged In -->
            <template v-else>
              <li class="nav-item d-flex align-items-center">
                <span class="nav-link text-white fw-bold me-2">{{ username}}</span>
                <button class="btn btn-outline-light btn-sm" @click="handleLogout">
                  Logout
                </button>
              </li>
            </template>
            <button @click="test">ciaaoo </button>
          </ul>
        </div>
      </div>
    </nav>

    <main class="pt-4">
      <slot />
    </main>
  </div>
</template>

<script>
import { useAuth } from '~/composables/useAuth'

export default {
  data() {

    return {
    }
  },
  computed: {
    loggedIn() {
      return useAuth().loggedIn?.value || false
    },
    username() {
      return useAuth().username?.value || ''
    }
  },
  methods: {
    handleLogout() {
      useAuth().logout()
    },
    test() {
      console.log(useAuth().loggedIn.value)
      console.log(useAuth().username.value)
    }
  }
}
</script>