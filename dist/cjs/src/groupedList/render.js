"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const common_1 = require("@pdfme/common");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const helper_1 = require("./helper");
const uiRender = async (arg) => {
    const { rootElement } = arg;
    rootElement.innerHTML = '';
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    let rowOffSetY = 0;
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit;
        let div = document.createElement('div');
        rootElement.appendChild(div);
        const headTable = await (0, uiRender_1.uiRender)({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y),
            value: JSON.stringify(input.head),
        });
        let height = await getHeight(headTable);
        setDivWidth(div, headSchema, height, rowOffSetY);
        y += height;
        rowOffSetY += height;
        div = document.createElement('div');
        rootElement.appendChild(div);
        const itemsTable = await (0, uiRender_1.uiRender)({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y),
            value: JSON.stringify(input.items),
        });
        height = await getHeight(itemsTable);
        setDivWidth(div, itemsSchema, height, rowOffSetY);
        y += height;
        rowOffSetY += height;
    }
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit;
        const headTable = await (0, pdfRender_1.pdfRender)({
            ...arg,
            schema: addPosition(headSchema, y),
            value: JSON.stringify(input.head),
        });
        y += await getHeight(headTable);
        const itemsTable = await (0, pdfRender_1.pdfRender)({
            ...arg,
            schema: addPosition(itemsSchema, y),
            value: JSON.stringify(input.items),
        });
        y += await getHeight(itemsTable);
    }
};
exports.pdfRender = pdfRender;
async function getHeight(table) {
    return table
        .allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y) {
    const tableSchema = (0, common_1.cloneDeep)(schema);
    tableSchema.position.y = y;
    return tableSchema;
}
const setDivWidth = (div, schema, height, rowOffsetY) => {
    div.style.position = 'absolute';
    div.style.top = `${rowOffsetY}mm`;
    div.style.left = `${0}mm`;
    div.style.width = `${schema.width}mm`;
    div.style.height = `${height}mm`;
    div.style.boxSizing = 'border-box';
    return div;
};
//# sourceMappingURL=render.js.map