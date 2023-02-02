import { HttpException } from '@nestjs/common';
import { ApiException } from '../../utils/exception';

export enum LogLevels {
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
  VERBOSE = 'verbose',
}

export type MessageType = {
  /**
   * message to be logged
   */
  message: string;
  /**
   * method or class that accour message
   */
  context?: string;
  /**
   * addtional object to log
   */
  obj?: object;
};

// here we can add multiple exception type like HttpException | ApiException;
export type ErrorType = HttpException | ApiException;
