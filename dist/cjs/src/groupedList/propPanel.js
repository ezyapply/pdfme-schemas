"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propPanel = void 0;
const propPanel_1 = require("../tables/propPanel");
const groupedListSchema = { ...propPanel_1.propPanel.defaultSchema, type: 'GroupedList' };
exports.propPanel = {
    schema: () => {
        return {
            ...propPanel_1.propPanel.schema,
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