import { UUID_PATTERN } from '../constants';

export class HelperService {
  static isValidUuid(value: string) {
    return UUID_PATTERN.test(value);
  }

  static camelCaseToSnakeCase(key: string) {
    var result = key.replace(/([A-Z])/g, ' $1');
    return result.split(' ').join('_').toLowerCase();
  }
}
