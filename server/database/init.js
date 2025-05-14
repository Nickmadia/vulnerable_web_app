import { useDB } from './db.js'

export async function initDB() {
  const db = await useDB()

  // Create posts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `)

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL -- store hashed passwords ideally
    );
  `)

  // Optional: insert a test user if none exists
  const existing = await db.get(`SELECT COUNT(*) as count FROM users`)
  if (existing.count === 0) {
    await db.run(`
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `, ['admin', 'admin']) // ⚠️ Use hashed password in production!
    console.log('🧪 Inserted test user: admin / admin')
  }
// Seed posts if in dev mode
if (process.env.NODE_ENV === 'development') {
    const postCount = await db.get(`SELECT COUNT(*) as count FROM posts`)
    if (postCount.count === 0) {
      const posts = [
        ['Welcome to the blog', 'This is the first post.'],
        ['Post 2', 'Another test post.'],
        ['Post 3', 'Yet another post.'],
        ['Post 4', 'Final test post.']
      ]
      for (const [title, content] of posts) {
        await db.run(
          `INSERT INTO posts (title, content) VALUES (?, ?)`,
          [title, content]
        )
      }
      console.log('🧪 Inserted 4 test posts.')
    }
}
  await db.close()
  console.log('✅ Database schema initialized.')
}
