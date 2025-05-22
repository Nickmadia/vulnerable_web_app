<template>
  <div class="container py-5">
    <h1 class="mb-4">Admin Panel - Server Diagnostics</h1>
<div class="my-4">
  <h3>🛠️ Server Diagnostics</h3>
  <select v-model="selectedCmd" class="form-select">
    <option disabled value="">Select command</option>
    <option>uptime</option>
    <option>free -m</option>
    <option>df -h</option>
    <option>ps aux</option>
    <option>who</option>
  </select>
    <button class="btn btn-primary mt-2" @click="runDiagnostic" :disabled="loading">
      {{ loading ? 'Running...' : 'Run Diagnostic' }}
    </button>
  <div v-if="error" class="text-danger mt-2">{{ error }}</div> 
  <pre class="mt-3 bg-dark text-light p-3 rounded" v-if="output">{{ output }}</pre>
</div>
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const selectedCmd = ref('')
const output = ref('')
const error = ref('')
const loading = ref(false)

const runDiagnostic = async () => {
  const token = localStorage.getItem('auth')
  const cmd = encodeURIComponent(selectedCmd.value)

  loading.value = true
  error.value = ''
  output.value = ''

  try {
    const res = await fetch(`/api/diagnostics?cmd=${cmd}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.statusMessage || 'Unknown error')
    }

    output.value = data.output || 'No output'
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: 'admin-only'
})
</script>

