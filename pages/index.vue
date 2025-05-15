<template>
  <div>
    <!-- Post Grid -->
    <div class="container py-5">
      <h2 class="text-center mb-5">Latest Posts</h2>

      <!-- Post Grid -->
      <div class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-6" v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
    </div>

    <!-- Floating Post Form Overlay -->
    <div
      v-if="showForm"
      @click.self="showForm = false"
      style="
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;
      "
    >
      <div
        style="
          background: white;
          padding: 40px;
          border-radius: 1rem;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          position: relative;
        "
      >
        <!-- Close button top-right -->
        <button
          @click="showForm = false"
          style="
            position: absolute;
            top: 10px;
            right: 15px;
            border: none;
            background: transparent;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #333;
          "
          aria-label="Close post form"
        >×</button>

        <PostForm />
      </div>
    </div>

    <!-- Floating Button Bottom Right -->
    <button
      @click="showForm = true"
      class="btn btn-primary"
      style="
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        font-size: 28px;
        line-height: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.5);
        z-index: 1200;
      "
      aria-label="Open new post form"
    >
      +
    </button>
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
      showForm: false
    }
  },
  methods: {
    handlePostCreated(newPost) {
      this.posts.unshift(newPost)  // Add new post at the top
      this.showForm = false        // Close the form
    },  
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
