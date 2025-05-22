import { useDB } from '@/server/database/db'
import jwt from 'jsonwebtoken'


export default defineEventHandler (async (event) => {
  let { id } = event.context.params

  if (!id || isNaN(parseInt(id))) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid post ID' }))
  }

  try {
    // OPTIONAL: JWT Auth
    /* const authHeader = getRequestHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(event, createError({ statusCode: 402, statusMessage: 'Unauthorized' }))
    } */

    /* const token = authHeader.split(' ')[1]
    try {
      jwt.verify(token, SECRET)
    } catch (err) {
      return sendError(event, createError({ statusCode: 403, statusMessage: 'Invalid Token' }))
    } */

    const db = await useDB()

    // safe
/*     const post = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err)
        resolve(row)
      })
    }) */

    id = decodeURIComponent(id)
    const query = `SELECT * FROM posts WHERE id = ${id}` 
    const post = await db.get(query) 
    if (!post) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Post not found' }))
    }

    return post
 } catch (err) {
    console.error('DB Error:', err)
    return sendError(event, createError({ statusCode: 500, statusMessage: `Server Error + ${err}` })) // here we respond with the actual error, usually none would do as it gives 
    // away info on the system, we do that to make it easier to exploit the db
  }
})
