import { cloneDeep } from '@pdfme/common';
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
        return groupElements(parsed.flat().flatMap((s) => [bulletSymbol, s]), groupSize);
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
    const columns = schema.columnGroups * 2;
    const body = getBodyWithRange(value, columns, schema.bulletSymbol || '•', schema.__bodyRange);
    const tableSchema = cloneDeep(schema);
    tableSchema.head = [...new Array(columns).keys()].map((index) => `Col ${index}`);
    tableSchema.type = 'table';
    tableSchema.showHead = false;
    if (schema.enhancedColumnStyles) {
        const alignment = [...new Array(columns).keys()].reduce((acc, curr) => {
            acc[curr] =
                curr % 2 == 0
                    ? schema.enhancedColumnStyles.bulletColumn
                    : schema.enhancedColumnStyles.nonBulletColumn;
            return acc;
        }, {});
        tableSchema.columnStyles = { alignment: alignment };
    }
    const bulletWidth = schema.bulletWidth || 2;
    const percentageForEachBulletWidth = Math.floor(100 * (bulletWidth / schema.width));
    const percentageForEachNonBulletWidth = Math.floor((100 - percentageForEachBulletWidth * schema.columnGroups) / schema.columnGroups);
    tableSchema.headWidthPercentages = [...new Array(columns).keys()].map((index) => index % 2 == 0 ? percentageForEachBulletWidth : percentageForEachNonBulletWidth);
    return { body, tableSchema };
}
//# sourceMappingURL=helper.js.map