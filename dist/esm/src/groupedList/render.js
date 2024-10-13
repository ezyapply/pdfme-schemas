import { cloneDeep } from "@pdfme/common";
import { groupBody } from "./helper";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
import { createSingleTable } from "../tables/tableHelper";
export const uiRender = async (arg) => {
    console.log(arg.schema.__bodyRange);
    arg.schema.__bodyRange = undefined;
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        await tableUIRender({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await getHeight(input.head, arg, headSchema);
        await tableUIRender({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
        y += await getHeight(input.items, arg, itemsSchema);
    }
};
export const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        await tablePdfRender({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await getHeight(input.head, arg, headSchema);
        await tablePdfRender({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
        y += await getHeight(input.items, arg, itemsSchema);
    }
};
async function getHeight(input, arg, schema) {
    return (await createSingleTable(input, { ...arg, schema })).allRows()
        .map((row) => row.height)
        .reduce((acc, height) => acc + height, 0);
}
function addPosition(schema, y) {
    const tableSchema = cloneDeep(schema);
    tableSchema.position.y = y;
    return tableSchema;
}
//# sourceMappingURL=render.js.map