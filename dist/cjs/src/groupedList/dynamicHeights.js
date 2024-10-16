"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicHeights = void 0;
const helper_1 = require("./helper");
const tableHelper_1 = require("../tables/tableHelper");
async function dynamicHeights(args, value) {
    const schema = args.schema;
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)({ schema, value });
    const heights = [];
    for (const input of inputs) {
        const head = await (0, tableHelper_1.createSingleTable)(input.head, { ...args, schema: headSchema });
        const items = await (0, tableHelper_1.createSingleTable)(input.items, { ...args, schema: itemsSchema });
        heights.push(...head.allRows());
        heights.push(...items.allRows());
    }
    return heights.map((row) => row.height);
}
exports.dynamicHeights = dynamicHeights;
//# sourceMappingURL=dynamicHeights.js.map