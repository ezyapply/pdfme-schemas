import {GroupedItems, GroupedListSchema} from "./types";
import {TableSchema} from "../tables/types";

export const getBody = (value: string | GroupedItems[]): GroupedItems[] => {
  if (typeof value === 'string') {
    return JSON.parse(value || '[]') as GroupedItems[];
  }
  return value || [];
};

export const getBodyWithRange = (
  value: string | GroupedItems[],
  range?: { start: number; end?: number | undefined }
) => {
  const body = getBody(value);
  if (!range) return body;
  return body.slice(range.start, range.end);
};

const toTable = (value: GroupedItems[], bulletSymbol: string): {
  head: string[][],
  items: string[][]
}[] => {
  return value.map(u => {
    const {head = [], items = []} = u;
    return {head, items: items.map(item => [bulletSymbol, item])}
  })
}

export const makeTableSchema = (main: TableSchema, partial: Partial<TableSchema>): TableSchema => {
  return Object.assign({}, main, partial, {position: main.position, type: "table", __bodyRange: undefined})
}


export function groupBody(arg: { schema: GroupedListSchema, value: string }) {
  const {schema, value} = arg;
  const bodyWidthRange = getBodyWithRange(getBody(value), schema.__bodyRange);
  const inputs = toTable(bodyWidthRange, schema.bulletSymbol || '•')
  const headSchema = makeTableSchema(schema, schema.groupedListHeadStyles)
  const itemsSchema = makeTableSchema(schema, schema.groupedListItemStyles)
  const itemsColumns = inputs.length && inputs[0].items.length ? inputs[0].items[0].length : 0
  itemsSchema.head = [...new Array(itemsColumns).keys()].map((u, i) => `Col ${i}`)
  itemsSchema.showHead = false
  const columnsLength = itemsSchema.headWidthPercentages.length
  const spread = 5 / columnsLength;
  itemsSchema.headWidthPercentages = [...new Array(itemsColumns).keys()].map((u, index) => index == 0 ? 5 : columnsLength > index - 1 ? itemsSchema.headWidthPercentages[index - 1] - spread : 95)
  return {inputs, headSchema, itemsSchema};
}