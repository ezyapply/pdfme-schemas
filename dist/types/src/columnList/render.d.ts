import { type PDFRenderProps, UIRenderProps } from '@pdfme/common';
import { ColumnListSchema } from './types';
export declare const uiRender: (arg: UIRenderProps<ColumnListSchema>) => Promise<void>;
export declare const pdfRender: (arg: PDFRenderProps<ColumnListSchema>) => Promise<void>;
