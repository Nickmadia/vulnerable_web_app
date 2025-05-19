<template>
  <div class="card h-100 shadow-lg rounded-4 border-0">
    <div class="card-body p-4">
      <h5 class="card-title fs-3 fw-semibold text-primary mb-3">{{ post.title }}</h5>
      <p class="card-text text-secondary fs-5">{{ post.content }}</p>
      <NuxtLink :to="`/posts/${post.id}`">Open Post</NuxtLink>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
