"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBody = exports.getBodyWithRange = exports.getBody = void 0;
const common_1 = require("@pdfme/common");
function groupElements(arr, groupSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
    }
    return result;
}
const getBody = (value, groupSize, bulletSymbol) => {
    if (typeof value === 'string') {
        const parsed = JSON.parse(value || '[]');
        if (parsed.find(s => s.length !== groupSize)) {
            return groupElements(parsed.flat().map(s => `${bulletSymbol} \t ${s}`), groupSize);
        }
        return parsed;
    }
    else {
        return value || [];
    }
};
exports.getBody = getBody;
const getBodyWithRange = (value, groupSize, bulletSymbol, range) => {
    const body = (0, exports.getBody)(value, groupSize, bulletSymbol);
    if (!range)
        return body;
    return body.slice(range.start, range.end);
};
exports.getBodyWithRange = getBodyWithRange;
function groupBody(arg) {
    const { schema, value } = arg;
    const body = (0, exports.getBodyWithRange)(value, schema.columnGroups, schema.bulletSymbol || '•', schema.__bodyRange);
    const tableSchema = (0, common_1.cloneDeep)(schema);
    tableSchema.head = [...new Array(schema.columnGroups).keys()].map((u, i) => `Col ${i}`);
    tableSchema.type = "table";
    tableSchema.showHead = false;
    tableSchema.headWidthPercentages = [...new Array(schema.columnGroups).keys()].map(_ => Math.floor(100 / schema.columnGroups));
    return { body, tableSchema };
}
exports.groupBody = groupBody;
//# sourceMappingURL=helper.js.map