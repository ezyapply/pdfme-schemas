import {cloneDeep, type PDFRenderProps, UIRenderProps} from "@pdfme/common";
import {GroupedListSchema} from "./types";
import {groupBody} from "./helper";
import {TableSchema} from "../tables/types";
import {uiRender as tableUIRender} from "../tables/uiRender";
import {pdfRender as tablePdfRender} from "../tables/pdfRender";
import {createSingleTable} from "../tables/tableHelper";


export const uiRender = async (arg: UIRenderProps<GroupedListSchema>) => {
    const {rootElement} = arg
    rootElement.innerHTML = '';
    console.log(arg.schema.__bodyRange)
    arg.schema.__bodyRange = undefined
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y
    for (const input of inputs) {
        let div = document.createElement('div');
        rootElement.appendChild(div)
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(headSchema, y),
            value: JSON.stringify(input.head)
        });
        y += await getHeight(input.head, arg, headSchema)
        div = document.createElement('div');
        rootElement.appendChild(div)
        await tableUIRender({
            ...arg,
            rootElement: div,
            schema: addPosition(itemsSchema, y),
            value: JSON.stringify(input.items)
        });
        y += await getHeight(input.items, arg, itemsSchema)
    }

}
export const pdfRender = async (arg: PDFRenderProps<GroupedListSchema>) => {
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        await tablePdfRender({...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head)});
        y += await getHeight(input.head, arg, headSchema)
        await tablePdfRender({...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items)});
        y += await getHeight(input.items, arg, itemsSchema)
    }
};

async function getHeight(input: string[][], arg: PDFRenderProps<GroupedListSchema> | UIRenderProps<GroupedListSchema>, schema: TableSchema): Promise<number> {
    return (await createSingleTable(input, {...arg, schema})).allRows()
                                                             .map((row) => row.height)
                                                             .reduce((acc, height) => acc + height, 0)
}

function addPosition(schema: TableSchema, y: number) {
    const tableSchema = cloneDeep(schema);
    tableSchema.position.y = y;
    return tableSchema;
}

