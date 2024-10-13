import { TableSchema } from "../tables/types";
export interface GroupedListSchema extends TableSchema {
    groupedListHeadStyles: Partial<TableSchema>;
    groupedListItemStyles: Partial<TableSchema>;
    bulletSymbol: string;
}
export interface GroupedItems {
    head: string[][];
    items: string[];
}
