// middleware/adminOnly.js
import {useAuth} from '@/composables/useAuth'
export default defineNuxtRouteMiddleware((to, from) => {

  const auth = useAuth()
  console.log(auth)
  if (!auth.loggedIn) {
    return navigateTo('/login')
  }

  try {
    if (!auth.isAdmin()) {
      return navigateTo('/')
    }
  } catch (e) {
    return navigateTo('/login')
  }
})
