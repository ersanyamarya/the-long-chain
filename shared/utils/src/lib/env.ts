import { exit } from 'process'
import { logger } from './logger'

/* If the environment variable is not set, exit the process. */
export const readEnvVariable = (name: string): string | null => {
  const value = process.env[name]
  if (!value) {
    logger.error(`Environment variable missing: ${name}`)
    exit(0)
  }
  return value
}
