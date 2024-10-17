import { TableSchema } from './types';
import type { PDFRenderProps } from '@pdfme/common';
import { Table } from './classes';
export declare const pdfRender: (arg: PDFRenderProps<TableSchema>) => Promise<Table>;
