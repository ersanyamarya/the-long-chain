import { Logger } from 'winston'

let logger: Logger

export function setLogger(l: Logger) {
  logger = l
}

export default logger
