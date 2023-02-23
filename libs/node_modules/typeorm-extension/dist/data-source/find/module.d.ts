import { DataSource } from 'typeorm';
import { DataSourceFindOptions } from './type';
export declare function findDataSource(context?: DataSourceFindOptions): Promise<DataSource | undefined>;
