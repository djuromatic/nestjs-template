import { LocatorInfo, LocatorOptions } from './type';
export declare function locateFiles(pattern: string | string[], options?: Partial<LocatorOptions>): Promise<LocatorInfo[]>;
export declare function locateFile(pattern: string | string[], options?: Partial<LocatorOptions>): Promise<LocatorInfo | undefined>;
