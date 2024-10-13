import { cloneDeep } from "@pdfme/common";
function groupElements(arr, groupSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
    }
    return result;
}
export const getBody = (value, groupSize, bulletSymbol) => {
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
export const getBodyWithRange = (value, groupSize, bulletSymbol, range) => {
    const body = getBody(value, groupSize, bulletSymbol);
    if (!range)
        return body;
    return body.slice(range.start, range.end);
};
export function groupBody(arg) {
    const { schema, value } = arg;
    const body = getBodyWithRange(value, schema.columnGroups, schema.bulletSymbol || '•', schema.__bodyRange);
    const tableSchema = cloneDeep(schema);
    tableSchema.head = [...new Array(schema.columnGroups).keys()].map((u, i) => `Col ${i}`);
    tableSchema.type = "table";
    tableSchema.showHead = false;
    tableSchema.headWidthPercentages = [...new Array(schema.columnGroups).keys()].map(_ => Math.floor(100 / schema.columnGroups));
    return { body, tableSchema };
}
//# sourceMappingURL=helper.js.map