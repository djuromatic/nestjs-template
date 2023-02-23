import { DatabaseDropContext } from './type';
/**
 * Drop database for specified driver in ConnectionOptions.
 *
 * @throws NotSupportedDriver
 *
 * @param context
 */
export declare function dropDatabase(context?: DatabaseDropContext): Promise<any>;
