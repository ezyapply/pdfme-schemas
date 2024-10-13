import {TableSchema} from "../tables/types";

export interface ColumnListSchema extends TableSchema {
  columnGroups : number
  //e.g - •
  bulletSymbol : string
}
