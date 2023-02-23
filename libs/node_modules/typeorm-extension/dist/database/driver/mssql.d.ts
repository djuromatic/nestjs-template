import { SqlServerDriver } from 'typeorm/driver/sqlserver/SqlServerDriver';
import { DatabaseCreateContext, DatabaseDropContext } from '../type';
import { DriverOptions } from './type';
export declare function createSimpleMsSQLConnection(driver: SqlServerDriver, options: DriverOptions): Promise<any>;
export declare function createMsSQLDatabase(context?: DatabaseCreateContext): Promise<any>;
export declare function dropMsSQLDatabase(context?: DatabaseDropContext): Promise<any>;
