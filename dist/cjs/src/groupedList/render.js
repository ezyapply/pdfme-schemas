"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const common_1 = require("@pdfme/common");
const helper_1 = require("./helper");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const uiRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        y += await (0, uiRender_1.uiRender)({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await (0, uiRender_1.uiRender)({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
    }
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { inputs, headSchema, itemsSchema } = (0, helper_1.groupBody)(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        y += await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head) });
        y += await (0, pdfRender_1.pdfRender)({ ...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items) });
    }
};
exports.pdfRender = pdfRender;
function addPosition(schema, y) {
    return Object.assign((0, common_1.cloneDeep)(schema), { position: { x: schema.position.x, y } });
}
//# sourceMappingURL=render.js.map