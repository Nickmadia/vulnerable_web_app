import { useDB } from '@/server/database/db'
import {hashPassword} from '@/server/utils/hashs'
export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    
    if (!username || !password) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Username and password are required.' }))
    }

    const db = await useDB()

    const existing = await db.get('SELECT * FROM users WHERE username = ?', [username])
    if (existing) {
      return sendError(event, createError({ statusCode: 409, statusMessage: 'Username already taken.' }))
    }

    const hashedPassword = hashPassword(password)
// Store hashedPassword in DB
// add salt to make it harder

    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword])

    return { message: 'User registered successfully.' }
  } catch (error) {
    console.error('Register error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Registration failed' }))
  }
})
