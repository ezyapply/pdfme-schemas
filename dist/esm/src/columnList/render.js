import { groupBody } from "./helper";
import { uiRender as tableUIRender } from "../tables/uiRender";
import { pdfRender as tablePdfRender } from "../tables/pdfRender";
export const uiRender = async (arg) => {
    const { body, tableSchema } = groupBody(arg);
    await tableUIRender({ ...arg, schema: tableSchema, value: JSON.stringify(body) });
};
export const pdfRender = async (arg) => {
    const { body, tableSchema } = groupBody(arg);
    await tablePdfRender({ ...arg, schema: tableSchema, value: JSON.stringify(body) });
};
//# sourceMappingURL=render.js.map