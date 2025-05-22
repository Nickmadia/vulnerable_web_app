import { useDB } from '@/server/database/db'  

import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const jwtSecret = config.jwtSecret
  try {
    // 🔐 Get token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Missing or invalid Authorization header'
      })
    }

    const token = authHeader.split(' ')[1]

    // ✅ Verify JWT
    let decoded
    try {
      decoded = jwt.verify(token, jwtSecret)
    } catch (err) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      })
    }

    const body = await readBody(event)
    const { title, content } = body

    if (!title || !content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
      })
    }

    const db = await useDB()

    const result = await db.run(
      'INSERT INTO posts (title, content) VALUES (?, ? )',
      [title, content, decoded.userId] // store author ID
    )

    return {
      
        id: result.lastID,
        title,
        content
      
    }

  } catch (error) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create post',
      data: error.data || error.message
    })
  }
})
