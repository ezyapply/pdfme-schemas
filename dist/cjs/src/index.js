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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableUIRender = exports.tablePdfRender = exports.select = exports.time = exports.date = exports.dateTime = exports.ellipse = exports.rectangle = exports.line = exports.barcodes = exports.table = exports.svg = exports.image = exports.multiVariableText = exports.text = exports.builtInPlugins = void 0;
const index_js_1 = __importDefault(require("./multiVariableText/index.js"));
exports.multiVariableText = index_js_1.default;
const index_js_2 = __importDefault(require("./text/index.js"));
exports.text = index_js_2.default;
const image_js_1 = __importDefault(require("./graphics/image.js"));
exports.image = image_js_1.default;
const svg_js_1 = __importDefault(require("./graphics/svg.js"));
exports.svg = svg_js_1.default;
const index_js_3 = __importDefault(require("./barcodes/index.js"));
exports.barcodes = index_js_3.default;
const line_js_1 = __importDefault(require("./shapes/line.js"));
exports.line = line_js_1.default;
const index_js_4 = __importStar(require("./tables/index.js"));
exports.table = index_js_4.default;
Object.defineProperty(exports, "tablePdfRender", { enumerable: true, get: function () { return index_js_4.tablePdfRender; } });
Object.defineProperty(exports, "tableUIRender", { enumerable: true, get: function () { return index_js_4.tableUIRender; } });
const rectAndEllipse_js_1 = require("./shapes/rectAndEllipse.js");
Object.defineProperty(exports, "ellipse", { enumerable: true, get: function () { return rectAndEllipse_js_1.ellipse; } });
Object.defineProperty(exports, "rectangle", { enumerable: true, get: function () { return rectAndEllipse_js_1.rectangle; } });
const dateTime_js_1 = __importDefault(require("./date/dateTime.js"));
exports.dateTime = dateTime_js_1.default;
const date_js_1 = __importDefault(require("./date/date.js"));
exports.date = date_js_1.default;
const time_js_1 = __importDefault(require("./date/time.js"));
exports.time = time_js_1.default;
const index_js_5 = __importDefault(require("./select/index.js"));
exports.select = index_js_5.default;
const builtInPlugins = { Text: index_js_2.default };
exports.builtInPlugins = builtInPlugins;
//# sourceMappingURL=index.js.map