import { useState } from "nuxt/app"

// composables/useAuth.js
export const useAuth = () => {
  const loggedIn = useState('loggedIn', () => false)
  const username = useState('username', () => null)
  const token = useState('token', () => null)
  
  const setAuth = (res ) => {
    try {
      token.value = res.token
      loggedIn.value = true
      username.value = res.username
      localStorage.setItem('auth', res.token )
      localStorage.setItem('username', res.username)
    } catch (e) {
      clearAuth()
    }
  }

  const loadAuthFromStorage = () => {
    return localStorage.getItem('auth')
  }
  
  const loadUsernameFromStorage = () => {
    return localStorage.getItem('username')
  }

  const logout = () => {
    loggedIn.value = false
    username.value = null
    token.value = null
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
  }
// Rehydrate on page load
  /* if (process.client && !loggedIn.value) {
    const saved = localStorage.getItem('auth')
    const uname = localStorage.getItem('username')
    if (saved) {
      loggedIn.value = true
      username.value = uname.username 
      token.value = saved.token
    }
  } */
  return {
    loggedIn,
    username,
    token,
    setAuth,
    loadAuthFromStorage,
    logout,
  }
}
