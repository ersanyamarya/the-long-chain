import { Logger, createLogger } from 'winston'

let logger: Logger = createLogger({
  level: 'debug',
})

export function setServerEssentialsLogger(l: Logger) {
  logger = l
}

export { logger }
