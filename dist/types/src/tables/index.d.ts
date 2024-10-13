import type { Plugin } from '@pdfme/common';
import type { TableSchema } from './types.js';
declare const tableSchema: Plugin<TableSchema>;
export default tableSchema;
export * from './pdfRender';
export * from './propPanel';
export * from './uiRender';
export * from './types';
export * from './classes';
