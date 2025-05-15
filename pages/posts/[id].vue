<template>
  <div class="container py-5">
    <div v-if="post" class="card shadow rounded-4 border-0 mx-auto" style="max-width: 800px;">
      <img :src="post.image" class="card-img-top rounded-top-4" alt="Post image" />
      <div class="card-body p-4">
        <h2 class="card-title text-primary mb-4">{{ post.title }}</h2>
        <p class="card-text fs-5 text-secondary">{{ post.content }}</p>
        <NuxtLink to="/" class="btn btn-outline-primary mt-4">← Back to Posts</NuxtLink>
      </div>
    </div>
    <div v-else-if="loading" class="text-center text-muted">Loading post...</div>
    <div v-else class="text-center text-muted">Post not found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      error: null,
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const postId = this.$route.params.id
      const res = await fetch(`/api/posts/${postId}`)
      if(res.status === 404) {
        throw new Error('Post not found')
      }
      if (!res.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await res.json()
      this.post = data
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}
</script>

  