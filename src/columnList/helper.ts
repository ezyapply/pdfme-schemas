import { ColumnListSchema } from './types';
import { cloneDeep } from '@pdfme/common';
import { TableSchema } from '../tables/types';
import { ALIGNMENT } from '../text';

function groupElements<T>(arr: T[], groupSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += groupSize) {
    result.push(arr.slice(i, i + groupSize));
  }
  return result;
}

export const getBody = (
  value: string | string[][],
  groupSize: number,
  bulletSymbol: string
): string[][] => {
  if (typeof value === 'string') {
    const parsed: string[][] = JSON.parse(value || '[]') as string[][];
    return groupElements(
      parsed.flat().flatMap((s) => [bulletSymbol, s]),
      groupSize
    );
  } else {
    return value || [];
  }
};

export const getBodyWithRange = (
  value: string | string[][],
  groupSize: number,
  bulletSymbol: string,
  range?: { start: number; end?: number | undefined }
) => {
  const body = getBody(value, groupSize, bulletSymbol);
  if (!range) return body;
  return body.slice(range.start, range.end);
};

export function groupBody(arg: { schema: ColumnListSchema; value: string }) {
  const { schema, value } = arg;
  const columns = schema.columnGroups * 2;
  const body = getBodyWithRange(value, columns, schema.bulletSymbol || '•', schema.__bodyRange);
  const tableSchema = cloneDeep(schema) as TableSchema;
  tableSchema.head = [...new Array(columns).keys()].map((index) => `Col ${index}`);
  tableSchema.type = 'table';
  tableSchema.showHead = false;
  if (schema.enhancedColumnStyles) {
    const alignment = [...new Array(columns).keys()].reduce((acc, curr) => {
      acc[curr] =
        curr % 2 == 0
          ? schema.enhancedColumnStyles!.bulletColumn!
          : schema.enhancedColumnStyles!.nonBulletColumn!;
      return acc;
    }, {} as { [key: number]: ALIGNMENT });
    tableSchema.columnStyles = { alignment: alignment };
  }
  const bulletWidth = schema.bulletWidth || 2;
  const percentageForEachBulletWidth = Math.floor(100 * (bulletWidth / schema.width));
  const percentageForEachNonBulletWidth = Math.floor(
    (100 - percentageForEachBulletWidth * schema.columnGroups) / schema.columnGroups
  );
  tableSchema.headWidthPercentages = [...new Array(columns).keys()].map((index) =>
    index % 2 == 0 ? percentageForEachBulletWidth : percentageForEachNonBulletWidth
  );
  return { body, tableSchema };
}
