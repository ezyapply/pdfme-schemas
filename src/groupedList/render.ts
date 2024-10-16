import {cloneDeep, type PDFRenderProps, UIRenderProps} from "@pdfme/common";
import {GroupedListSchema} from "./types";
import {createDiv, groupBody} from "./helper";
import {TableSchema} from "../tables/types";
import {uiRender as tableUIRender} from "../tables/uiRender";
import {pdfRender as tablePdfRender} from "../tables/pdfRender";
import {createSingleTable} from "../tables/tableHelper";
import {Table} from "../tables/classes";


export const uiRender = async (arg: UIRenderProps<GroupedListSchema>) => {
    const {rootElement} = arg
    rootElement.innerHTML = ''
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit
        const headTable = await createSingleTable(input.head, {...arg, schema: headSchema})
        let height = await getHeight(headTable)
        let div = createDiv(headSchema, height, y - arg.schema.position.y);
        rootElement.appendChild(div)
        await tableUIRender({
            ...arg,
            table: headTable,
            rootElement: div,
            schema: addPosition(headSchema, y, height),
            value: JSON.stringify(input.head)
        });
        y += height
        const itemsTable = await createSingleTable(input.items, {...arg, schema: itemsSchema})
        height = await getHeight(itemsTable)
        div = createDiv(itemsSchema, height, y - arg.schema.position.y);
        rootElement.appendChild(div)
        await tableUIRender({
            ...arg,
            table: itemsTable,
            rootElement: div,
            schema: addPosition(itemsSchema, y, height),
            value: JSON.stringify(input.items)
        });
        y += height
    }

}
export const pdfRender = async (arg: PDFRenderProps<GroupedListSchema>) => {
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        headSchema.__isSplit = input.__isSplit
        const headTable = await createSingleTable(input.head, {...arg, schema: headSchema})
        let height = await getHeight(headTable)
        await tablePdfRender({
            ...arg,
            table: headTable,
            schema: addPosition(headSchema, y, height),
            value: JSON.stringify(input.head)
        });
        y += height
        const itemsTable = await createSingleTable(input.items, {...arg, schema: itemsSchema})
        height = await getHeight(itemsTable)
        await tablePdfRender({
            ...arg,
            table: itemsTable,
            schema: addPosition(itemsSchema, y, height),
            value: JSON.stringify(input.items)
        });
        y += height
    }
};

async function getHeight(table: Table): Promise<number> {
    return table.allRows()
                .map((row) => row.height)
                .reduce((acc, height) => acc + height, 0)
}

function addPosition(schema: TableSchema, y: number, height: number) {
    const tableSchema = cloneDeep(schema);
    tableSchema.position.y = y;
    tableSchema.height = height;
    return tableSchema;
}

