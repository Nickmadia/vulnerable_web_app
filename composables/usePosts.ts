import { useState } from 'nuxt/app'
import type { Post } from '../types/post'

export const usePosts = () => {
  const posts = useState<Post[]>('posts', () => [])

  const fetchPosts = async () => {
    posts.value = await $fetch('/api/posts')
  }

  const addPost = async (title: string, content: string) => {
    await $fetch('/api/posts', {
      method: 'POST',
      body: { title, content }
    })
    await fetchPosts()
  }

  return { posts, fetchPosts, addPost }
}
