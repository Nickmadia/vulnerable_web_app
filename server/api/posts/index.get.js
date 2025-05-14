import { useDB } from '~/server/database/db'

export default defineEventHandler(async () => {
  const db = await useDB()

  const posts = await db.all(`SELECT id, title, content FROM posts ORDER BY id DESC`)

  return posts
})
