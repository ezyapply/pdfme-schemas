import { propPanel as tablePropPanel } from "../tables/propPanel";
const groupedListSchema = { ...tablePropPanel.defaultSchema, type: 'groupedList' };
export const propPanel = {
    schema: () => {
        return {
            ...tablePropPanel.schema,
            columnGroups: {
                title: 'Columns Groups',
                type: 'number',
                widget: 'inputNumber',
                span: 6,
                props: { min: 0 },
            },
            bulletSymbol: {
                title: 'Bullet Symbol',
                type: 'string',
                widget: 'lineTitle',
                span: 6,
            }
        };
    },
    defaultSchema: {
        ...groupedListSchema,
        groupedListItemStyles: groupedListSchema,
        groupedListHeadStyles: groupedListSchema,
        bulletSymbol: ''
    },
};
//# sourceMappingURL=propPanel.js.map