import { Injectable, LoggerService } from '@nestjs/common';
import { ISecretsService } from 'libs/secrets/adapter';
import * as winston from 'winston';

enum LogLevels {
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
  VERBOSE = 'verbose',
}

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize({
      colors: {
        info: 'cyan',
        debug: 'blue',
        error: 'red',
        warn: 'yellow',
      },
    }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${info.context}] ${info.message}`;
    }),
  ),
});

const cloudTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level}] [${info.context}] ${info.message}`;
    }),
  ),
});

@Injectable()
export class Logger implements LoggerService {
  private logger: winston.Logger;

  constructor(secrets: ISecretsService) {
    const env = secrets.global.node_env;
    const level = env === 'local' ? LogLevels.DEBUG : LogLevels.INFO;

    this.logger = winston.createLogger({
      levels: winston.config.npm.levels,
      level,
    });

    if (env !== 'local') {
      this.logger.add(cloudTransport);
    } else this.logger.add(consoleTransport);
  }

  log(message: any, context: string): void {
    this.logger.log(LogLevels.INFO, { message, context });
  }
  error(message: any, context: string): void {
    this.logger.error({ message, context });
  }
  warn(message: any, context: string) {
    this.logger.warn({ message, context });
  }
  debug(message: any, context: string) {
    this.logger.debug({ message, context });
  }
  verbose(message: any, context: string) {
    this.logger.verbose({ message, context });
  }
}
