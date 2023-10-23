import { Logger, createLogger } from 'winston'

let logger: Logger = createLogger({
  level: 'debug',
})

export function setCodeNameLangChainLogger(l: Logger) {
  logger = l
}

export { logger }
