import { cloneDeep } from "@pdfme/common";
import { createDiv, groupBody } from "./helper";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
import { createSingleTable } from "../tables/tableHelper";
export const uiRender = async (arg) => {
    const { rootElement } = arg;
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        let height = await getHeight(input.head, arg, headSchema);
        let div = document.createElement('div');
        rootElement.appendChild(createDiv(headSchema, height, y));
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y, height),
            value: JSON.stringify(input.head)
        });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        div = document.createElement('div');
        rootElement.appendChild(div);
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y, height),
            value: JSON.stringify(input.items)
        });
        y += height;
    }
};
export const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        let height = await getHeight(input.head, arg, headSchema);
        await tablePdfRender({ ...arg, schema: addPosition(headSchema, y, height), value: JSON.stringify(input.head) });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        await tablePdfRender({ ...arg, schema: addPosition(itemsSchema, y, height), value: JSON.stringify(input.items) });
        y += height;
    }
};
async function getHeight(input, arg, schema) {
    return (await createSingleTable(input, { ...arg, schema })).allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y, height) {
    const tableSchema = cloneDeep(schema);
    tableSchema.position.y = y;
    tableSchema.height = height;
    return tableSchema;
}
//# sourceMappingURL=render.js.map