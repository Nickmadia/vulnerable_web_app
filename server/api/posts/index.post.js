import { useDB } from '@/server/database/db'  

import jwt from 'jsonwebtoken'

const SECRET_KEY = 'secret-key' // ideally from runtime config

export default defineEventHandler(async (event) => {
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
      decoded = jwt.verify(token, SECRET_KEY)
    } catch (err) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      })
    }

    // 🧠 You now have access to decoded user info
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
