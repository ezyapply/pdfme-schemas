"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicHeights = void 0;
const helper_1 = require("./helper");
const tableHelper_1 = require("../tables/tableHelper");
async function dynamicHeights(args, value) {
    const schema = args.schema;
    const { body, tableSchema } = (0, helper_1.groupBody)({ schema, value });
    const table = await (0, tableHelper_1.createSingleTable)(body, { ...args, schema: tableSchema });
    return table.allRows().map((row) => row.height);
}
exports.dynamicHeights = dynamicHeights;
//# sourceMappingURL=dynamicHeights.js.map