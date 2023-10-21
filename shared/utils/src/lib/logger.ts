import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const { combine, timestamp, printf, colorize, errors, json } = format

const serviceName = process.env['NX_TASK_TARGET_PROJECT'] || '-NA-'

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'debug',

      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        errors({ stack: true }),
        printf(info => {
          let emoji = '🤔'
          const { timestamp, level, message, ...args } = info
          switch (level) {
            case 'error':
              emoji = '🚨'
              break
            case 'warn':
              emoji = '⚠️'
              break
            case 'info':
              emoji = '✅'
              break
            default:
              emoji = '🐛'
              break
          }

          const ts = timestamp.slice(0, 19).replace('T', ' ')

          return `${emoji} ${ts}: ${serviceName}: ${message} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
          }`
        }),
        colorize({ all: true })
      ),
    }),
  ],
})

logger.add(
  new transports.DailyRotateFile({
    filename: `logs/${serviceName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d',
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), json()),
    watchLog: true,
  })
)

export { logger }
