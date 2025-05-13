<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-8">Welcome to My Blog</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  const posts = [
  {
    id: 1,
    title: "Understanding Vue 3",
    content: "Vue 3 is a progressive JavaScript framework for building user interfaces. In this post, we'll explore its new features and how to get started."
  },
  {
    id: 2,
    title: "Mastering Nuxt 3",
    content: "Nuxt 3 is a powerful framework built on top of Vue 3. Learn how to create performant and scalable applications with ease."
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    content: "Cybersecurity is critical in today's digital world. This post will cover the fundamentals of protecting data and systems."
  },
  {
    id: 4,
    title: "Building a Blog with Nuxt.js",
    content: "In this tutorial, we will walk through how to build a simple blog using Nuxt.js. This post will help you understand the core concepts of Nuxt.js."
  }
]

  </script>
   <style scoped>
   .container {
     max-width: 1200px;
   }
   
   h1 {
     color: #2d3748;
   }
   
   h2 {
     color: #2d3748;
   }
   
   p {
     color: #4a5568;
   }
   </style> 