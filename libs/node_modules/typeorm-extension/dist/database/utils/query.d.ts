import { SelectQueryBuilder } from 'typeorm';
export declare function existsQuery<T>(builder: SelectQueryBuilder<T>, inverse?: boolean): string;
