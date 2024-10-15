"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const helper_1 = require("./helper");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const uiRender = async (arg) => {
    const { body, tableSchema } = (0, helper_1.groupBody)(arg);
    await (0, uiRender_1.uiRender)({ ...arg, schema: tableSchema, value: JSON.stringify(body) });
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { body, tableSchema } = (0, helper_1.groupBody)(arg);
    await (0, pdfRender_1.pdfRender)({ ...arg, schema: tableSchema, value: JSON.stringify(body) });
};
exports.pdfRender = pdfRender;
//# sourceMappingURL=render.js.map