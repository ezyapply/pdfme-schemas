import { createSingleTable } from './tableHelper';
import { getBody, getBodyWithRange } from './helper.js';
import { groupBody } from '../columnList/helper.js';
import { groupBody as groupedListBody } from "../groupedList/helper";
export const getDynamicHeightsForTable = async (value, args) => {
    if (args.schema.type == 'table') {
        const schema = args.schema;
        const body = schema.__bodyRange?.start === 0 ? getBody(value) : getBodyWithRange(value, schema.__bodyRange);
        const table = await createSingleTable(body, args);
        return table.allRows().map((row) => row.height);
    }
    else if (args.schema.type == 'columnList') {
        const schema = args.schema;
        const { body, tableSchema } = groupBody({ schema, value });
        const table = await createSingleTable(body, { ...args, schema: tableSchema });
        return table.allRows().map((row) => row.height);
    }
    else if (args.schema.type == 'groupedList') {
        const schema = args.schema;
        const { inputs, headSchema, itemsSchema } = groupedListBody({ schema, value });
        const tables = [];
        for (const input of inputs) {
            tables.push(await createSingleTable(input.head, { ...args, schema: headSchema }));
            tables.push(await createSingleTable(input.items, { ...args, schema: itemsSchema }));
        }
        return tables.flatMap(u => u.allRows()).map((row) => row.height);
    }
    return Promise.resolve([args.schema.height]);
};
//# sourceMappingURL=dynamicTemplate.js.map