import { cloneDeep } from "@pdfme/common";
import { groupBody } from "./helper";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
export const uiRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        y += await tableUIRender({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await tableUIRender({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
    }
};
export const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        y += await tablePdfRender({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await tablePdfRender({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
    }
};
function addPosition(schema, y) {
    return Object.assign(cloneDeep(schema), { position: { x: schema.position.x, y } });
}
//# sourceMappingURL=render.js.map