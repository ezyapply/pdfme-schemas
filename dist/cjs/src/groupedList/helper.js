"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBody = exports.makeTableSchema = exports.getBodyWithRange = exports.getBody = void 0;
const getBody = (value) => {
    if (typeof value === 'string') {
        return JSON.parse(value || '[]');
    }
    return value || [];
};
exports.getBody = getBody;
const getBodyWithRange = (value, range) => {
    const body = (0, exports.getBody)(value);
    if (!range)
        return body;
    return body.slice(range.start, range.end);
};
exports.getBodyWithRange = getBodyWithRange;
const toTable = (value, bulletSymbol) => {
    return value.map(u => {
        const { head = [], items = [] } = u;
        return { head, items: items.map(item => [bulletSymbol, item]) };
    });
};
const makeTableSchema = (main, partial) => {
    return Object.assign({}, main, partial, { position: main.position, type: "table", __bodyRange: undefined });
};
exports.makeTableSchema = makeTableSchema;
function groupBody(arg) {
    const { schema, value } = arg;
    const bodyWidthRange = (0, exports.getBodyWithRange)((0, exports.getBody)(value), schema.__bodyRange);
    const inputs = toTable(bodyWidthRange, schema.bulletSymbol || '•');
    const headSchema = (0, exports.makeTableSchema)(schema, schema.groupedListHeadStyles);
    const itemsSchema = (0, exports.makeTableSchema)(schema, schema.groupedListItemStyles);
    const itemsColumns = inputs.length && inputs[0].items.length ? inputs[0].items[0].length : 0;
    itemsSchema.head = [...new Array(itemsColumns).keys()].map((u, i) => `Col ${i}`);
    itemsSchema.showHead = false;
    const columns = itemsSchema.headWidthPercentages.length;
    itemsSchema.headWidthPercentages = [...new Array(itemsColumns).keys()].map((u, index) => index == 0 ? 5 : columns > index - 1 ? itemsSchema.headWidthPercentages[index - 1] - (5 / columns) : 95);
    return { inputs, headSchema, itemsSchema };
}
exports.groupBody = groupBody;
//# sourceMappingURL=helper.js.map