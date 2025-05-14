import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const useDB = async () => {
  return open({
    filename: './server/database/app.db', // make sure this path is correct
    driver: sqlite3.Database
  })
}
