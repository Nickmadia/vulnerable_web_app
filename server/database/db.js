import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const useDB = async () => {
  try {
    const db = await open({
      filename: './server/database/app.db',
      driver: sqlite3.Database
    })
    return db
  } catch (error) {
    console.error('Database connection error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Database connection failed' })
  }
}
