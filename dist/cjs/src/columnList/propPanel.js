"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propPanel = void 0;
const propPanel_1 = require("../tables/propPanel");
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
    defaultSchema: {
        ...propPanel_1.propPanel.defaultSchema,
        type: 'columnList',
        columnGroups: 3,
        bulletSymbol: '•',
        bulletWidth: 2,
    },
};
//# sourceMappingURL=propPanel.js.map