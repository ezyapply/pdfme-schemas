import { GroupedItems, GroupedListSchema } from "./types";
import { TableSchema } from "../tables/types";
export declare const getBody: (value: string | GroupedItems[]) => GroupedItems[];
export declare const getBodyWithRange: (value: string | GroupedItems[], range?: {
    start: number;
    end?: number | undefined;
}) => GroupedItems[];
export declare const makeTableSchema: (main: TableSchema, partial: Partial<TableSchema>) => TableSchema;
export declare function groupBody(arg: {
    schema: GroupedListSchema;
    value: string;
}): {
    inputs: {
        head: string[][];
        items: string[][];
    }[];
    headSchema: TableSchema;
    itemsSchema: TableSchema;
};
export declare const createDiv: (schema: TableSchema, height: number, rowOffsetY: number) => HTMLDivElement;
