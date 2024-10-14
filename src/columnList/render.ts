import {type PDFRenderProps, UIRenderProps} from "@pdfme/common";
import {ColumnListSchema} from "./types";
import {groupBody} from "./helper";
import {uiRender as tableUIRender} from "../tables/uiRender";
import {pdfRender as tablePdfRender} from "../tables/pdfRender";
import {createDiv} from "../groupedList/helper";
import {createSingleTable} from "../tables/tableHelper";

export const uiRender = async (arg: UIRenderProps<ColumnListSchema>) => {
    const {rootElement} = arg
    rootElement.innerHTML = ''
    const {body, tableSchema} = groupBody(arg);
    const table = await createSingleTable(body, {...arg, schema: tableSchema});
    const div = createDiv(tableSchema, table.getHeight(), tableSchema.position.y);
    rootElement.appendChild(div)
    await tableUIRender({...arg, rootElement: div, schema: tableSchema, value: JSON.stringify(body)});
}


export const pdfRender = async (arg: PDFRenderProps<ColumnListSchema>) => {
    const {body, tableSchema} = groupBody(arg);
    await tablePdfRender({...arg, schema: tableSchema, value: JSON.stringify(body)});
};
