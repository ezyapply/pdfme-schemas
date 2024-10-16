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
    const flattenItems = body.flatMap((group) => {
        return group.head
            .map((head) => ({ row: head, group }))
            .concat(group.items.map((item) => ({ row: item, group })));
    });
    const result = flattenItems.slice(range.start, range.end);
    //recombine result
    // Reconstruct the GroupedItems from the sliced result
    const groupsMap = new Map();
    result.forEach((item) => {
        if (!groupsMap.has(item.group)) {
            groupsMap.set(item.group, []);
        }
        groupsMap.get(item.group).push(item);
    });
    // Build the new GroupedItems array
    const newBody = [];
    groupsMap.forEach((items, group) => {
        const newGroup = { head: [], items: [], __isSplit: false };
        items.forEach((item) => {
            if (Array.isArray(item.row)) {
                if (newGroup.head.length == 0) {
                    newGroup.__isSplit = group.head.length > 0 && group.head[0] != item.row;
                }
                newGroup.head.push(item.row);
            }
            else {
                newGroup.items.push(item.row);
            }
        });
        newBody.push(newGroup);
    });
    return newBody;
};
const toTableData = (value, bulletSymbol) => {
    return value.map((u) => {
        const { head = [], items = [], __isSplit } = u;
        return { head, __isSplit, items: items.map((item) => [bulletSymbol, item]) };
    });
};
export const makeTableSchema = (main, partial) => {
    return Object.assign({}, main, partial, {
        position: main.position,
        type: 'table',
        __bodyRange: undefined,
    });
};
export function groupBody(arg) {
    const { schema, value } = arg;
    const bodyWidthRange = getBodyWithRange(getBody(value), schema.__bodyRange);
    const inputs = toTableData(bodyWidthRange, schema.bulletSymbol || '•');
    const headSchema = makeTableSchema(schema, schema.groupedListHeadStyles);
    const itemsSchema = makeTableSchema(schema, schema.groupedListItemStyles);
    const itemsColumns = inputs.length && inputs[0].items.length ? inputs[0].items[0].length : 0;
    itemsSchema.head = [...new Array(itemsColumns).keys()].map((i) => `Col ${i}`);
    itemsSchema.showHead = false;
    const columnsLength = itemsSchema.headWidthPercentages.length;
    const percentageForBulletWidth = Math.floor((100 * (schema.bulletWidth || 2)) / schema.width);
    const spread = percentageForBulletWidth / columnsLength;
    itemsSchema.headWidthPercentages = [...new Array(itemsColumns).keys()].map((u, index) => index == 0 ? percentageForBulletWidth : itemsSchema.headWidthPercentages[index - 1] - spread);
    return { inputs, headSchema, itemsSchema };
}
//# sourceMappingURL=helper.js.map