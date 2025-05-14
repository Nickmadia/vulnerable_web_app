<template>
    <div>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <NuxtLink class="navbar-brand fw-bold" to="/">MyBlog</NuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Page Content -->
      <main class="pt-4">
        <slot />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {}
    }
  }
  </script>
  