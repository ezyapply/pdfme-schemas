import {cloneDeep, type PDFRenderProps, UIRenderProps} from "@pdfme/common";
import {GroupedListSchema} from "./types";
import {groupBody} from "./helper";
import {TableSchema} from "../tables/types";
import {uiRender as tableUIRender} from "../tables/uiRender";
import {pdfRender as tablePdfRender} from "../tables/pdfRender";


export const uiRender = async (arg: UIRenderProps<GroupedListSchema>) => {
    console.log(arg.schema.__bodyRange)
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y
    for (const input of inputs) {
        y += await tableUIRender({...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head)});
        y += await tableUIRender({...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items)});
    }

}
export const pdfRender = async (arg: PDFRenderProps<GroupedListSchema>) => {
    const {inputs, headSchema, itemsSchema} = groupBody(arg);
    let y = arg.schema.position.y;
    for (const input of inputs) {
        y += await tablePdfRender({...arg, schema: addPosition(headSchema, y), value: JSON.stringify(input.head)});
        y += await tablePdfRender({...arg, schema: addPosition(itemsSchema, y), value: JSON.stringify(input.items)});
    }
};


function addPosition(schema: TableSchema, y: number) {
    return Object.assign(cloneDeep(schema), {position: {x: schema.position.x, y}});
}

