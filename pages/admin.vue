<template>
  <div class="container py-5">
    <h1 class="mb-4">Admin Panel - Server Diagnostics</h1>

    <div class="mb-3">
      <label class="form-label">Host to Ping</label>
      <input v-model="host" type="text" class="form-control" placeholder="e.g. 8.8.8.8 or 127.0.0.1; cat /flag.txt" />
    </div>

    <button class="btn btn-danger" @click="submitPing">Run Diagnostic</button>

    <div v-if="result" class="mt-4">
      <h5>Output:</h5>
      <pre>{{ result }}</pre>
    </div>
<div class="my-5">
  <h2>🔍 Log Viewer</h2>
  <input v-model="logFile" placeholder="Enter log file (e.g., app.log)" class="form-control mb-2" />
  <button class="btn btn-secondary" @click="loadLog">View Log</button>
<div class="my-4">
  <h3>🛠️ Server Diagnostics</h3>
  <select v-model="selectedCmd" class="form-select">
    <option disabled value="">Select command</option>
    <option>uptime</option>
    <option>free -m</option>
    <option>df -h</option>
    <option>printenv</option>
    <option>ps aux</option>
    <option>who</option>
    <option>lsof -i</option>
  </select>
  <button class="btn btn-primary mt-2" @click="runDiagnostic">Run</button>

  <pre class="mt-3 bg-dark text-light p-3 rounded" v-if="output">{{ output }}</pre>
</div>
  <pre class="mt-3 bg-dark text-white p-3 rounded" v-if="logContent">{{ logContent }}</pre>
</div>
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const host = ref('')
const result = ref('')
const error = ref('')
const router = useRouter()

const submitPing = async () => {
  result.value = ''
  error.value = ''

  try {
    const token = localStorage.getItem('auth')
    if (!token) throw new Error('Not authenticated')

    const res = await fetch('/api/admin/ping', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ host: host.value })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.statusMessage || 'Request failed')
    }

    const data = await res.json()
    result.value = data.result
  } catch (err) {
    error.value = err.message
  }
}
</script>
