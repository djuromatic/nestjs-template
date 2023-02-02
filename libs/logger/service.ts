import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ILoggerService } from './adapter';
import { MessageType, ErrorType, LogLevels } from './type';
import { DateFormats } from '../../utils';

@Injectable()
export class LoggerService implements ILoggerService {
  private logger: winston.Logger;

  constructor(log_level: string, node_env: string) {
    this.logger = winston.createLogger({
      levels: winston.config.npm.levels,
      level: log_level,
    });

    this.logger.add(this.transport(this.getFormats(node_env)));
  }

  log(log): void {
    this.logger.log(LogLevels.INFO, { message: log });
  }

  info({ message, context, obj }: MessageType): void {
    this.logger.info(LogLevels.INFO, { message, context, obj });
  }
  warn({ message, context, obj }: MessageType): void {
    this.logger.warn(LogLevels.WARN, { message, context, obj });
  }
  debug({ message, context, obj }: MessageType): void {
    this.logger.debug(LogLevels.DEBUG, { message, context, obj });
  }
  error(error: ErrorType, message?: string, context?: string): void {
    this.logger.error(LogLevels.ERROR, { message, context, error });
  }

  private transport(formats: winston.Logform.Format[]) {
    return new winston.transports.Console({
      format: winston.format.combine(...formats),
    });
  }

  private getFormats(node_env: string) {
    const formats = [];

    const timestampFormat = winston.format.combine(
      winston.format.timestamp({
        format: DateFormats.DATE_WITH_TIME_LOGGER,
      }),
    );

    const colorize = winston.format.colorize({
      colors: {
        info: 'cyan',
        debug: 'blue',
        error: 'red',
        warn: 'yellow',
      },
    });

    const printf = winston.format.printf((info) => {
      let message = `${info.timestamp} [${info.level}] `;
      if (info.context) message += `${info.context} `;
      message += `${info.message} `;
      if (info.obj) message += `${JSON.stringify(info.obj)}`;
      if (info.error) message += `${JSON.stringify(info.error)}`;

      return message;
    });

    if (node_env === 'local') formats.push(colorize);
    formats.push(timestampFormat, printf);

    return formats;
  }
}
