import type { Plugin } from '@pdfme/common';
import type { TableSchema } from './types.js';
declare const tableSchema: Plugin<TableSchema>;
export default tableSchema;
export declare const tablePdfRender: (arg: import("@pdfme/common").PDFRenderProps<TableSchema>) => Promise<number>;
export declare const tableUIRender: (arg: import("@pdfme/common").UIRenderProps<TableSchema>) => Promise<number>;
