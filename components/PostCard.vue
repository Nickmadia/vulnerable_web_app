<template>
  <div class="card shadow-lg border-light mb-4 rounded-3">
    <img v-if="post.image" :src="post.image" class="card-img-top rounded-top-3" alt="Post image" />
    <div class="card-body">
      <h5 class="card-title text-primary fw-bold">{{ post.title }}</h5>
      <p class="card-text text-muted" :title="post.content">{{ post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}</p>
      <a :href="'/posts/' + post.id" class="btn btn-dark d-inline-block mt-3 w-100">Read More</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
.card {
  max-width: 500px; /* Larger size */
  transition: transform 0.3s ease-in-out;
  margin: 0 auto; /* Center the card horizontally */
  border: 1px solid #ddd;
}

.card:hover {
  transform: translateY(-15px); /* Increase hover lift */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Stronger hover shadow */
}

.card-img-top {
  height: 300px; /* Larger image */
  object-fit: cover;
  border-radius: 0.375rem 0.375rem 0 0;
}

.card-body {
  padding: 1.5rem; /* Increased padding */
  background-color: #f8f9fa; /* Light background color */
}

.card-title {
  font-size: 1.5rem;
  color: #007bff; /* Primary color for title */
}

.card-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d; /* Muted text color */
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card:hover .card-title {
  color: #0056b3; /* Darker blue on hover */
}

.btn-dark {
  background-color: #343a40; /* Dark button color */
  border-color: #343a40;
}

.btn-dark:hover {
  background-color: #23272b; /* Darker on hover */
  border-color: #23272b;
}

.card-body .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
</style>
