"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfRender_js_1 = require("./pdfRender.js");
const uiRender_js_1 = require("./uiRender.js");
const propPanel_js_1 = require("./propPanel.js");
const tableSchema = {
    pdf: (arg) => (0, pdfRender_js_1.pdfRender)(arg).then(),
    ui: (arg) => (0, uiRender_js_1.uiRender)(arg).then(),
    propPanel: propPanel_js_1.propPanel,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>',
};
exports.default = tableSchema;
__exportStar(require("./pdfRender"), exports);
__exportStar(require("./propPanel"), exports);
__exportStar(require("./uiRender"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./classes"), exports);
//# sourceMappingURL=index.js.map