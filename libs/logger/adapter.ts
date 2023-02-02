import { LoggerService } from '@nestjs/common';
import { MessageType, ErrorType } from './type';

export abstract class ILoggerService implements LoggerService {
  /**
   * @deprecated The method should be use only in main.ts, nestjs logger needs to have this implementation
   */
  abstract log({ message, context, obj }: MessageType): void;
  abstract info({ message, context, obj }: MessageType): void;
  abstract warn({ message, context, obj }: MessageType): void;
  abstract debug({ message, context, obj }: MessageType): void;
  abstract error(error: ErrorType, message?: string, context?: string): void;
}
