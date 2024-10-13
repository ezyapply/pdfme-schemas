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
        const height = table.allRows().map((row) => row.height);
        console.log("height", height);
        return height;
    }
    else if (args.schema.type == 'groupedList') {
        const schema = args.schema;
        const { inputs, headSchema, itemsSchema } = groupedListBody({ schema, value });
        const heights = [];
        for (const input of inputs) {
            const table1 = await createSingleTable(input.head, { ...args, schema: headSchema });
            const table2 = await createSingleTable(input.items, { ...args, schema: itemsSchema });
            heights.push(table1.allRows().concat(table2.allRows()).map((row) => row.height).reduce((acc, height) => acc + height, 0));
        }
        console.log("height", heights);
        return heights;
    }
    return Promise.resolve([args.schema.height]);
};
//# sourceMappingURL=dynamicTemplate.js.map