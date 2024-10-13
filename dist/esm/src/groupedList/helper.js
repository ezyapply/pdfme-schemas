export const getBody = (value) => {
    if (typeof value === 'string') {
        return JSON.parse(value || '[]');
    }
    return value || [];
};
export const getBodyWithRange = (value, range) => {
    const body = getBody(value);
    if (!range)
        return body;
    return body.slice(range.start, range.end);
};
const toTable = (value, bulletSymbol) => {
    return value.map(u => {
        const { head = [], items = [] } = u;
        return { head, items: items.map(item => [bulletSymbol, item]) };
    });
};
export const makeTableSchema = (main, partial) => {
    return Object.assign({}, main, partial, { position: main.position, type: "table", __bodyRange: undefined });
};
export function groupBody(arg) {
    const { schema, value } = arg;
    const bodyWidthRange = getBodyWithRange(getBody(value), schema.__bodyRange);
    const inputs = toTable(bodyWidthRange, schema.bulletSymbol || '•');
    const headSchema = makeTableSchema(schema, schema.groupedListHeadStyles);
    const itemsSchema = makeTableSchema(schema, schema.groupedListItemStyles);
    const itemsColumns = inputs.length && inputs[0].items.length ? inputs[0].items[0].length : 0;
    itemsSchema.head = [...new Array(itemsColumns).keys()].map((u, i) => `Col ${i}`);
    itemsSchema.showHead = false;
    const columnsLength = itemsSchema.headWidthPercentages.length;
    const spread = 5 / columnsLength;
    itemsSchema.headWidthPercentages = [...new Array(itemsColumns).keys()].map((u, index) => index == 0 ? 5 : columnsLength > index - 1 ? itemsSchema.headWidthPercentages[index - 1] - spread : 95);
    return { inputs, headSchema, itemsSchema };
}
//# sourceMappingURL=helper.js.map