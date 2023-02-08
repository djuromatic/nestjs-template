import { UUID_PATTERN } from '../constants';

export class HelperService {
  static isValidUuid(value: string) {
    return UUID_PATTERN.test(value);
  }
}
