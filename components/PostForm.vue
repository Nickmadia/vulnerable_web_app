<template>
  <div class="card shadow rounded-4 border-0 p-4">
    <h3 class="mb-4 text-primary">Create New Post</h3>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="Title"
          required
        />
      </div>
      <div class="mb-3">
        <textarea
          v-model="content"
          class="form-control"
          rows="5"
          placeholder="Content"
          required
        ></textarea>
      </div>
     
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      image: '',
    }
  },
  methods: {
    async submit() {
      try {
        const token = localStorage.getItem('auth') // Get JWT from storage
        if (!token) throw new Error('User not authenticated')

        const res = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify({
            title: this.title,
            content: this.content,
            // image: this.image || 'https://picsum.photos/600/300', // if supported
          }),
        })

        if (!res.ok) {
          const errData = await res.json()
          throw new Error(errData.statusMessage || 'Failed to create post')
        }

        const newPost = await res.json()
        this.$emit('post-created', newPost)

        // Reset form
        this.title = ''
        this.content = ''
        this.image = ''
      } catch (err) {
        alert(err.message)
      }
    }
  }
}
</script>
