import { TableSchema } from "../tables/types";
export interface ColumnListSchema extends TableSchema {
    columnGroups: number;
    bulletSymbol: string;
}
