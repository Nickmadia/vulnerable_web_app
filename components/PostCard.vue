<template>
  <div class="card h-100 shadow-lg rounded-4 border-0">
    <img :src="post.image" class="card-img-top rounded-top-4" alt="Post image" />
    <div class="card-body p-4">
      <h5 class="card-title fs-3 fw-semibold text-primary mb-3">{{ post.title }}</h5>
      <p class="card-text text-secondary fs-5">{{ post.content }}</p>
      <a :href="/posts/ + post.id" class="btn btn-primary mt-3 px-4 py-2">Read more</a>
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
