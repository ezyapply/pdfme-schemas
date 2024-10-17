import { ColumnListSchema } from './types';
import { TableSchema } from '../tables/types';
export declare const getBody: (value: string | string[][], groupSize: number, bulletSymbol: string) => string[][];
export declare const getBodyWithRange: (value: string | string[][], groupSize: number, bulletSymbol: string, range?: {
    start: number;
    end?: number | undefined;
}) => string[][];
export declare function groupBody(arg: {
    schema: ColumnListSchema;
    value: string;
}): {
    body: string[][];
    tableSchema: TableSchema;
};
