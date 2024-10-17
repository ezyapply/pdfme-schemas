import type { Plugin } from '@pdfme/common';
import { pdfRender, uiRender } from './render';
import { ColumnListSchema } from './types';
import { propPanel } from './propPanel';

const listSchema: Plugin<ColumnListSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/> </svg>\n',
};
export default listSchema;
