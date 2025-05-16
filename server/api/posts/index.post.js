import { useDB } from '@/server/database/db'  

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { title, content, image } = body

    if (!title || !content) {
      return createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
      })
    }

    const db = await useDB()

    const result = await db.run(
      'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)',
      [title, content, image || null]
    )

    // result.lastID contains the new post id
    return {
      success: true,
      post: {
        id: result.lastID,
        title,
        content,
        image: image || null
      }
    }
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to create post',
      data: error.message
    })
  }
})
