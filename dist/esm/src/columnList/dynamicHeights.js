import { groupBody } from './helper';
import { createSingleTable } from '../tables/tableHelper';
export async function dynamicHeights(args, value) {
    const schema = args.schema;
    const { body, tableSchema } = groupBody({ schema, value });
    const table = await createSingleTable(body, { ...args, schema: tableSchema });
    return table.allRows().map((row) => row.height);
}
//# sourceMappingURL=dynamicHeights.js.map