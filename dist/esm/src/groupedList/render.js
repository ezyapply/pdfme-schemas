import { cloneDeep } from "@pdfme/common";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
import { groupBody } from "./helper";
export const uiRender = async (arg) => {
    const { rootElement } = arg;
    rootElement.innerHTML = '';
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    let rowOffSetY = 0;
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit;
        let div = document.createElement('div');
        rootElement.appendChild(div);
        const headTable = await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y),
            value: JSON.stringify(input.head)
        });
        let height = await getHeight(headTable);
        setDivWidth(div, headSchema, height, rowOffSetY);
        y += height;
        rowOffSetY += height;
        div = document.createElement('div');
        rootElement.appendChild(div);
        const itemsTable = await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y),
            value: JSON.stringify(input.items)
        });
        height = await getHeight(itemsTable);
        setDivWidth(div, itemsSchema, height, rowOffSetY);
        y += height;
        rowOffSetY += height;
    }
};
export const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit;
        const headTable = await tablePdfRender({
            ...arg,
            schema: addPosition(headSchema, y),
            value: JSON.stringify(input.head)
        });
        y += await getHeight(headTable);
        const itemsTable = await tablePdfRender({
            ...arg,
            schema: addPosition(itemsSchema, y),
            value: JSON.stringify(input.items)
        });
        y += await getHeight(itemsTable);
    }
};
async function getHeight(table) {
    return table.allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y) {
    const tableSchema = cloneDeep(schema);
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