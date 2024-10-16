import { propPanel as tablePropPanel } from "../tables/propPanel";
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
            },
            bulletWidth: {
                title: 'Bullet Width',
                type: 'number',
                widget: 'inputNumber',
                span: 6,
                props: { min: 0 },
            },
        };
    },
    defaultSchema: { ...tablePropPanel.defaultSchema, type: "columnList", columnGroups: 3, bulletSymbol: '•', bulletWidth: 2 },
};
//# sourceMappingURL=propPanel.js.map