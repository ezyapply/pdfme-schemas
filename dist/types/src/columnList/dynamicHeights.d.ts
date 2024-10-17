import { BasePdf, CommonOptions, Schema } from '@pdfme/common';
export declare function dynamicHeights(args: {
    schema: Schema;
    basePdf: BasePdf;
    options: CommonOptions;
    _cache: Map<any, any>;
}, value: string): Promise<number[]>;
