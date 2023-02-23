import { OracleDriver } from 'typeorm/driver/oracle/OracleDriver';
import { DatabaseCreateContext, DatabaseDropContext } from '../type';
import { DriverOptions } from './type';
export declare function createSimpleOracleConnection(driver: OracleDriver, options: DriverOptions): any;
export declare function createOracleDatabase(context?: DatabaseCreateContext): Promise<any>;
export declare function dropOracleDatabase(context?: DatabaseDropContext): Promise<void>;
