import jwt from 'jsonwebtoken'
import { useDB } from '@/server/database/db'
import { hashPassword } from '@/server/utils/hashs'


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const jwtSecret = config.jwtSecret
  try {
    const { username, password } = await readBody(event)

    if (!username || !password) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Username and password are required.' }))
    }

    const db = await useDB()
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username])

    if (!user) {
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid credentials.' }))
    }

    const hashedInputPassword = hashPassword(password)
    if (hashedInputPassword !== user.password) {
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid credentials.' }))
    }

    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' })

    return {
      username: user.username,
      token
    }

  } catch (error) {
    console.error('Login error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Login failed' }))
  }
})
