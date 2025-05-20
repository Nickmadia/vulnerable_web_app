<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand">MyBlog</NuxtLink>


        <div  id="navContent">
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
                <NuxtLink to="/admin" v-if="isAdmin" class="nav-link">Admin Panel</NuxtLink>
                <span class="nav-link text-white fw-bold me-2" >{{ username}}</span>
                <button class="btn btn-outline-light btn-sm" @click="handleLogout">
                  Logout
                </button>
              </li>
            </template>
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
    },
    isAdmin(){
      return useAuth().isAdmin() 
    }
  },
  methods: {
    handleLogout() {
      useAuth().logout()
    },
    test() {
      console.log(useAuth().loggedIn.value)
      console.log(useAuth().username.value)
      console.log(useAuth().isAdmin())
      console.log(useAuth().loadAuthFromStorage())
    }
  }
}
</script>