import { useState } from 'nuxt/app'
import type { Post } from '../types/post'

export const usePosts = () => {
  const posts = useState<Post[]>('posts', () => [])

  const fetchPosts = async () => {
    posts.value = await $fetch('/api/posts/')
  }


  return { posts, fetchPosts }
}
