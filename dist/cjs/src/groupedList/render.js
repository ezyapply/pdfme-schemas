"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const common_1 = require("@pdfme/common");
const helper_1 = require("./helper");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const tableHelper_1 = require("../tables/tableHelper");
const uiRender = async (arg) => {
    const { rootElement } = arg;
    rootElement.innerHTML = '';
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        let height = await getHeight(input.head, arg, headSchema);
        let div = (0, helper_1.createDiv)(headSchema, height, y);
        rootElement.appendChild(div);
        await (0, uiRender_1.uiRender)({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y, height),
            value: JSON.stringify(input.head)
        });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        div = (0, helper_1.createDiv)(itemsSchema, height, y);
        rootElement.appendChild(div);
        await (0, uiRender_1.uiRender)({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y, height),
            value: JSON.stringify(input.items)
        });
        y += height;
    }
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        let height = await getHeight(input.head, arg, headSchema);
        await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(headSchema, y, height), value: JSON.stringify(input.head) });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(itemsSchema, y, height), value: JSON.stringify(input.items) });
        y += height;
    }
};
exports.pdfRender = pdfRender;
async function getHeight(input, arg, schema) {
    return (await (0, tableHelper_1.createSingleTable)(input, { ...arg, schema })).allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y, height) {
    const tableSchema = (0, common_1.cloneDeep)(schema);
    tableSchema.position.y = y;
    tableSchema.height = height;
    return tableSchema;
}
//# sourceMappingURL=render.js.map