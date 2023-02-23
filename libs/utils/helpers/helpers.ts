import { UUID_PATTERN } from '../constants';

export class HelperService {
  static isValidUuid(value: string) {
    return UUID_PATTERN.test(value);
  }

  /**
   * Creates a snake_case version of the camelCase string key
   * @param key string camelCase expression to be converted
   * @returns string copy of the key in snake_case format
   */
  static camelCaseToSnakeCase(key: string): string {
    var result = key.replace(/([A-Z])/g, ' $1');
    return result.split(' ').join('_').toLowerCase();
  }

  /**
   * Get random integer between the specified values.
   * The value is no lower than min, and is less than (but not equal to) max
   * @param min
   * @param max
   * @returns {number} random integer between min and max
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
