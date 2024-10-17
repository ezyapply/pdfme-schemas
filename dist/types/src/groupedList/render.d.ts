import { type PDFRenderProps, UIRenderProps } from '@pdfme/common';
import { GroupedListSchema } from './types';
export declare const uiRender: (arg: UIRenderProps<GroupedListSchema>) => Promise<void>;
export declare const pdfRender: (arg: PDFRenderProps<GroupedListSchema>) => Promise<void>;
