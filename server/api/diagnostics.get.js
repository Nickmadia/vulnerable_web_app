import jwt from 'jsonwebtoken'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const jwtSecret = config.jwtSecret
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) 

    if (decoded.id !== 1) {
        console.log(decoded )
      throw createError({ statusCode: 403, statusMessage: 'Admins only' })
    }

    const cmd = getQuery(event).cmd

    if (!cmd) {
      throw createError({ statusCode: 400, statusMessage: 'No command provided' })
    }

    const { stdout, stderr } = await execAsync(cmd)
    return { output: stdout || stderr }

  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Command failed or invalid token',
      data: err.message
    })
  }
})
