import {ColumnListSchema} from "./types";
import {cloneDeep} from "@pdfme/common";
import {TableSchema} from "../tables/types";

function groupElements<T>(arr: T[], groupSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += groupSize) {
        result.push(arr.slice(i, i + groupSize));
    }
    return result;
}

export const getBody = (value: string | string[][], groupSize: number, bulletSymbol: string): string[][] => {
    if (typeof value === 'string') {
        const parsed: string[][] = JSON.parse(value || '[]') as string[][];
        if (parsed.find(s => s.length !== groupSize)) {
            return groupElements(parsed.flat().map(s => `${bulletSymbol} \t ${s}`), groupSize);
        }
        return parsed
    } else {
        return value || []
    }
};

export const getBodyWithRange = (value: string | string[][],
                                 groupSize: number,
                                 bulletSymbol: string,
                                 range?: { start: number; end?: number | undefined }) => {
    const body = getBody(value, groupSize, bulletSymbol);
    if (!range) return body;
    return body.slice(range.start, range.end);
};


export function groupBody(arg: { schema: ColumnListSchema, value: string }) {
    const {schema, value} = arg;
    const body = getBodyWithRange(value, schema.columnGroups, schema.bulletSymbol || '•', schema.__bodyRange);
    const tableSchema = cloneDeep(schema) as TableSchema;
    tableSchema.head = [...new Array(schema.columnGroups).keys()].map((u, i) => `Col ${i}`)
    tableSchema.type = "table"
    tableSchema.showHead = false
    tableSchema.__bodyRange = undefined
    tableSchema.headWidthPercentages = [...new Array(schema.columnGroups).keys()].map(_ => Math.floor(100 / schema.columnGroups))
    return {body, tableSchema};
}
