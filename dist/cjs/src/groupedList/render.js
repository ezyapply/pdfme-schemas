"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const common_1 = require("@pdfme/common");
const helper_1 = require("./helper");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const tableHelper_1 = require("../tables/tableHelper");
const uiRender = async (arg) => {
    console.log(arg.schema.__bodyRange);
    arg.schema.__bodyRange = undefined;
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        await (0, uiRender_1.uiRender)({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await getHeight(input.head, arg, headSchema);
        await (0, uiRender_1.uiRender)({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
        y += await getHeight(input.items, arg, itemsSchema);
    }
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await getHeight(input.head, arg, headSchema);
        await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
        y += await getHeight(input.items, arg, itemsSchema);
    }
};
exports.pdfRender = pdfRender;
async function getHeight(input, arg, schema) {
    return (await (0, tableHelper_1.createSingleTable)(input, { ...arg, schema })).allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y) {
    const tableSchema = (0, common_1.cloneDeep)(schema);
    tableSchema.position.y = y;
    return tableSchema;
}
//# sourceMappingURL=render.js.map