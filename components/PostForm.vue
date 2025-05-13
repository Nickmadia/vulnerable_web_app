<template>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="Title" class="w-full border p-2 mb-2" />
      <textarea v-model="content" placeholder="Content" class="w-full border p-2 mb-2" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue'
import { usePosts } from '../composables/usePosts'

  const title = ref('')
  const content = ref('')
  const { addPost } = usePosts()
  
  const submit = async () => {
    if (!title.value || !content.value) return
    await addPost(title.value, content.value)
    title.value = ''
    content.value = ''
  }
  </script>
  