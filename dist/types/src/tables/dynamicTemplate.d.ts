import { BasePdf, CommonOptions, Schema } from '@pdfme/common';
export declare const getDynamicHeightsForTable: (value: string, args: {
    schema: Schema;
    basePdf: BasePdf;
    options: CommonOptions;
    _cache: Map<any, any>;
}) => Promise<number[]>;
