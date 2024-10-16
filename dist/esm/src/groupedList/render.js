import { cloneDeep } from "@pdfme/common";
import { createDiv, groupBody } from "./helper";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
import { createSingleTable } from "../tables/tableHelper";
export const uiRender = async (arg) => {
    const { rootElement } = arg;
    rootElement.innerHTML = '';
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        let height = await getHeight(input.head, arg, headSchema);
        let div = createDiv(headSchema, height, y - arg.schema.position.y);
        rootElement.appendChild(div);
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y, height, input.__isSplit),
            value: JSON.stringify(input.head)
        });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        div = createDiv(itemsSchema, height, y - arg.schema.position.y);
        rootElement.appendChild(div);
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y, height, input.__isSplit),
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
        await tablePdfRender({
            ...arg,
            schema: addPosition(headSchema, y, height, input.__isSplit),
            value: JSON.stringify(input.head)
        });
        y += height;
        height = await getHeight(input.items, arg, itemsSchema);
        await tablePdfRender({
            ...arg,
            schema: addPosition(itemsSchema, y, height, input.__isSplit),
            value: JSON.stringify(input.items)
        });
        y += height;
    }
};
async function getHeight(input, arg, schema) {
    return (await createSingleTable(input, { ...arg, schema })).allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y, height, __isSplit) {
    const tableSchema = cloneDeep(schema);
    tableSchema.position.y = y;
    tableSchema.height = height;
    tableSchema.showHead = tableSchema.showHead && !__isSplit;
    return tableSchema;
}
//# sourceMappingURL=render.js.map