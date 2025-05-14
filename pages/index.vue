<template>
  <div>
       <!-- Post Grid -->
    <div class="container py-5">
      <h2 class="text-center mb-5">Latest Posts</h2>
      <div class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-6" v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'

export default {
  components: { PostCard },
  data() {
    return {
      loggedIn: true, // Simulated login state
      posts: [
        {
          id: 1,
          title: 'First Post',
          content: 'This is the content of the first post.',
          image: 'https://picsum.photos/seed/1/600/300'
        },
        {
          id: 2,
          title: 'Second Post',
          content: 'Here goes the second post content.',
          image: 'https://picsum.photos/seed/2/600/300'
        },
        {
          id: 3,
          title: 'Third Post',
          content: 'Third post preview goes here.',
          image: 'https://picsum.photos/seed/3/600/300'
        },
        {
          id: 4,
          title: 'Fourth Post',
          content: 'Something about the fourth post.',
          image: 'https://picsum.photos/seed/4/600/300'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.loggedIn = false
      alert('Logged out!')
    }
  }
}
</script>
