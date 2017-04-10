import winston from 'winston'
import path from 'path'

const basePath = process.cwd() + '/app/logs/'

const logger = new (winston.Logger) ({
  transports: [
    new (winston.transports.File) ({
      name: 'error',
      filename: basePath + '/error.log',
      level: 'error',
    }),
    new (winston.transports.File) ({
      name: 'info',
      filename: basePath + '/info.log',
      level: 'info',
    }),
    new (winston.transports.File) ({
      name: 'debug',
      filename: basePath + '/debug.log',
      level: 'debug',
    })
  ]
})

logger.info('New session initiated: ' + new Date())

export default logger
