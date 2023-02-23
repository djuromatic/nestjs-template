import { EntitySchema, ObjectType } from 'typeorm';
export declare function getEntityName<O>(entity: ObjectType<O> | EntitySchema<O>): string;
