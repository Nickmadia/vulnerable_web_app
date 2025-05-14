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
      <div v-else class="text-center text-muted">Post not found.</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: null
      }
    },
    async created() {
      const route = useRoute()
      const id = parseInt(route.params.id)
  
      // Simulated fetch from local/fake data
      const posts = [
        {
          id: 1,
          title: 'First Post',
          content: 'This is the full content of the first post.',
          image: 'https://picsum.photos/seed/1/800/400'
        },
        {
          id: 2,
          title: 'Second Post',
          content: 'Detailed content for the second post.',
          image: 'https://picsum.photos/seed/2/800/400'
        },
        {
          id: 3,
          title: 'Third Post',
          content: 'Expanded third post content here.',
          image: 'https://picsum.photos/seed/3/800/400'
        },
        {
          id: 4,
          title: 'Fourth Post',
          content: 'More about the fourth post in detail.',
          image: 'https://picsum.photos/seed/4/800/400'
        }
      ]
  
      this.post = posts.find(p => p.id === id)
    }
  }
  </script>
  