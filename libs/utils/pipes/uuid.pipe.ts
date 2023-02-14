import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { INVALID_UUID_FORMAT_ERROR } from '../constants/errors';
import { HelperService } from '../helpers';

@Injectable()
export class UuidValidator implements PipeTransform {
  transform(value: any) {
    if (!HelperService.isValidUuid(value))
      throw new BadRequestException(INVALID_UUID_FORMAT_ERROR);
    return value;
  }
}
