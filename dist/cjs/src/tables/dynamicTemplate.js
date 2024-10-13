"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicHeightsForTable = void 0;
const tableHelper_1 = require("./tableHelper");
const helper_js_1 = require("./helper.js");
const helper_js_2 = require("../columnList/helper.js");
const helper_1 = require("../groupedList/helper");
const getDynamicHeightsForTable = async (value, args) => {
    if (args.schema.type == 'table') {
        const schema = args.schema;
        const body = schema.__bodyRange?.start === 0 ? (0, helper_js_1.getBody)(value) : (0, helper_js_1.getBodyWithRange)(value, schema.__bodyRange);
        const table = await (0, tableHelper_1.createSingleTable)(body, args);
        return table.allRows().map((row) => row.height);
    }
    else if (args.schema.type == 'columnList') {
        const schema = args.schema;
        const { body, tableSchema } = (0, helper_js_2.groupBody)({ schema, value });
        const table = await (0, tableHelper_1.createSingleTable)(body, { ...args, schema: tableSchema });
        return table.allRows().map((row) => row.height);
    }
    else if (args.schema.type == 'groupedList') {
        const schema = args.schema;
        const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)({ schema, value });
        const tables = [];
        for (const input of inputs) {
            tables.push(await (0, tableHelper_1.createSingleTable)(input.head, { ...args, schema: headSchema }));
            tables.push(await (0, tableHelper_1.createSingleTable)(input.items, { ...args, schema: itemsSchema }));
        }
        return tables.flatMap(u => u.allRows()).map((row) => row.height);
    }
    return Promise.resolve([args.schema.height]);
};
exports.getDynamicHeightsForTable = getDynamicHeightsForTable;
//# sourceMappingURL=dynamicTemplate.js.map