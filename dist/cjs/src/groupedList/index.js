"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./render");
const propPanel_1 = require("./propPanel");
const groupedListSchema = {
    pdf: render_1.pdfRender,
    ui: render_1.uiRender,
    propPanel: propPanel_1.propPanel,
    icon: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1"/></svg>',
};
exports.default = groupedListSchema;
//# sourceMappingURL=index.js.map