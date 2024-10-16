import { TableSchema } from "../tables/types";
import type { ALIGNMENT } from "../text";
export interface ColumnListSchema extends TableSchema {
    columnGroups: number;
    bulletSymbol?: string;
    bulletWidth?: number;
    enhancedColumnStyles?: {
        bulletColumn?: ALIGNMENT;
        nonBulletColumn?: ALIGNMENT;
    };
}
