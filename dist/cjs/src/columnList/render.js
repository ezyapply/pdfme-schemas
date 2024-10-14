"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = exports.uiRender = void 0;
const helper_1 = require("./helper");
const uiRender_1 = require("../tables/uiRender");
const pdfRender_1 = require("../tables/pdfRender");
const helper_2 = require("../groupedList/helper");
const tableHelper_1 = require("../tables/tableHelper");
const uiRender = async (arg) => {
    const { rootElement } = arg;
    rootElement.innerHTML = '';
    const { body, tableSchema } = (0, helper_1.groupBody)(arg);
    const table = await (0, tableHelper_1.createSingleTable)(body, { ...arg, schema: tableSchema });
    const div = (0, helper_2.createDiv)(tableSchema, table.getHeight(), tableSchema.position.y);
    rootElement.appendChild(div);
    await (0, uiRender_1.uiRender)({ ...arg, rootElement: div, schema: tableSchema, value: JSON.stringify(body) });
};
exports.uiRender = uiRender;
const pdfRender = async (arg) => {
    const { body, tableSchema } = (0, helper_1.groupBody)(arg);
    await (0, pdfRender_1.pdfRender)({ ...arg, schema: tableSchema, value: JSON.stringify(body) });
};
exports.pdfRender = pdfRender;
//# sourceMappingURL=render.js.map