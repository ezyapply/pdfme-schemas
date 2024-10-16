"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicHeightsForTable = void 0;
const tableHelper_1 = require("./tableHelper");
const helper_js_1 = require("./helper.js");
const dynamicHeights_1 = require("../columnList/dynamicHeights");
const dynamicHeights_2 = require("../groupedList/dynamicHeights");
const getDynamicHeightsForTable = async (value, args) => {
    if (args.schema.type == 'table') {
        const schema = args.schema;
        const body = schema.__bodyRange?.start === 0 ? (0, helper_js_1.getBody)(value) : (0, helper_js_1.getBodyWithRange)(value, schema.__bodyRange);
        const table = await (0, tableHelper_1.createSingleTable)(body, args);
        return table.allRows().map((row) => row.height);
    }
    else if (args.schema.type == 'columnList') {
        return await (0, dynamicHeights_1.dynamicHeights)(args, value);
    }
    else if (args.schema.type == 'groupedList') {
        return await (0, dynamicHeights_2.dynamicHeights)(args, value);
    }
    return Promise.resolve([args.schema.height]);
};
exports.getDynamicHeightsForTable = getDynamicHeightsForTable;
//# sourceMappingURL=dynamicTemplate.js.map