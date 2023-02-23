import { DatabaseCreateContext } from './type';
/**
 * Create database for specified driver in ConnectionOptions.
 *
 * @throws NotSupportedDriver
 *
 * @param context
 */
export declare function createDatabase(context?: DatabaseCreateContext): Promise<any>;
