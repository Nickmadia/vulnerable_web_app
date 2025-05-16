<!-- components/BaseAlert.vue -->
<template>
  <div v-if="show" :class="['alert', alertTypeClass, 'position-fixed', 'bottom-0', 'end-0', 'm-4', 'shadow']" role="alert" style="z-index: 1050; min-width: 300px;">
    {{ message }}
    <button type="button" class="btn-close float-end" aria-label="Close" @click="show = false"></button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success', // 'success', 'danger', 'info', 'warning'
    },
    message: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    alertTypeClass() {
      return `alert-${this.type}`
    },
    mounted() {
  
    setTimeout(() => {
      this.show = false
    }, 2000)
}
  }
}
</script>

<style scoped>
/* Optional fade in/out animation */
.alert {
  transition: opacity 0.3s ease-in-out;
}
.alert.fade-out {
  opacity: 0;
}
</style>
