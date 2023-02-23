import { LocatorInfo, LocatorOptions } from './type';
export declare function locateFilesSync(pattern: string | string[], options?: Partial<LocatorOptions>): LocatorInfo[];
export declare function locateFileSync(pattern: string | string[], options?: Partial<LocatorOptions>): LocatorInfo | undefined;
