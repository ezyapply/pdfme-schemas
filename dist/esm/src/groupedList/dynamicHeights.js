import { groupBody } from "./helper";
import { createSingleTable } from "../tables/tableHelper";
export async function dynamicHeights(args, value) {
    const schema = args.schema;
    const { inputs, headSchema, itemsSchema } = groupBody({ schema, value });
    const heights = [];
    for (const input of inputs) {
        const head = await createSingleTable(input.head, { ...args, schema: headSchema });
        const items = await createSingleTable(input.items, { ...args, schema: itemsSchema });
        heights.push(...head.allRows());
        heights.push(...items.allRows());
    }
    return heights.map((row) => row.height);
}
//# sourceMappingURL=dynamicHeights.js.map