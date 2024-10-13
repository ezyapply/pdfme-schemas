import type { Plugin } from '@pdfme/common';
import type { TextSchema } from './types';
declare const textSchema: Plugin<TextSchema>;
export default textSchema;
export * from './pdfRender';
export * from './propPanel';
export * from './uiRender';
export * from './types';
export * from './constants';
