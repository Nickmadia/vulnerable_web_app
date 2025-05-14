<template>
  <div>
    <!-- Post Grid -->
    <div class="container py-5">
      <h2 class="text-center mb-5">Latest Posts</h2>

      <!-- Loading State -->
      <div v-if="this.loading" class="text-center">Loading posts...</div>

      <!-- Error State -->
      <div v-else-if="this.error" class="text-center text-danger">
        <p>{{ error }}</p>
      </div>

      <!-- Post Grid -->
      <div v-else class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-6" v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostCard from '@/components/PostCard.vue'
import { usePosts } from '@/composables/usePosts'

export default {
  components: { PostCard },
  data() {
    return {
      loggedIn: true,// Simulated login state
      loading: false,
      error: false,
    }
  },
  methods: {
    logout() {
      this.loggedIn = false
      alert('Logged out!')
    }
  },setup() {
    const { posts, fetchPosts } = usePosts()

    // Fetch posts when the component is mounted
    onMounted(fetchPosts)

    return { posts  }
  }
}
</script>
