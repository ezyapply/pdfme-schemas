import { Schema, Mode, ColorType } from '@pdfme/common';
export declare const convertForPdfLayoutProps: ({ schema, pageHeight, applyRotateTranslate, }: {
    schema: Schema;
    pageHeight: number;
    applyRotateTranslate?: boolean | undefined;
}) => {
    position: {
        x: number;
        y: number;
    };
    height: number;
    width: number;
    rotate: import("@pdfme/pdf-lib").Degrees;
    opacity: number | undefined;
};
export declare const rotatePoint: (point: {
    x: number;
    y: number;
}, pivot: {
    x: number;
    y: number;
}, angleDegrees: number) => {
    x: number;
    y: number;
};
export declare const getDynamicHeightsForTable: (value: string, args: {
    schema: import("zod").objectOutputType<{
        name: import("zod").ZodString;
        type: import("zod").ZodString;
        content: import("zod").ZodOptional<import("zod").ZodString>;
        position: import("zod").ZodObject<{
            x: import("zod").ZodNumber;
            y: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        width: import("zod").ZodNumber;
        height: import("zod").ZodNumber;
        rotate: import("zod").ZodOptional<import("zod").ZodNumber>;
        opacity: import("zod").ZodOptional<import("zod").ZodNumber>;
        readOnly: import("zod").ZodOptional<import("zod").ZodBoolean>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        __bodyRange: import("zod").ZodOptional<import("zod").ZodObject<{
            start: import("zod").ZodNumber;
            end: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            start: number;
            end?: number | undefined;
        }, {
            start: number;
            end?: number | undefined;
        }>>;
        __isSplit: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, import("zod").ZodTypeAny, "passthrough">;
    basePdf: string | Uint8Array | ArrayBuffer | {
        width: number;
        height: number;
        padding: [number, number, number, number];
    };
    options: import("zod").objectOutputType<{
        font: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
            data: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<ArrayBuffer, import("zod").ZodTypeDef, ArrayBuffer>, import("zod").ZodType<Uint8Array, import("zod").ZodTypeDef, Uint8Array>]>;
            fallback: import("zod").ZodOptional<import("zod").ZodBoolean>;
            subset: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            data: (string | Uint8Array | ArrayBuffer) & (string | Uint8Array | ArrayBuffer | undefined);
            fallback?: boolean | undefined;
            subset?: boolean | undefined;
        }, {
            data: (string | Uint8Array | ArrayBuffer) & (string | Uint8Array | ArrayBuffer | undefined);
            fallback?: boolean | undefined;
            subset?: boolean | undefined;
        }>>>;
    }, import("zod").ZodTypeAny, "passthrough">;
    _cache: Map<any, any>;
}) => Promise<number[]>;
export declare const addAlphaToHex: (hex: string, alphaPercentage: number) => string;
export declare const isEditable: (mode: Mode, schema: Schema) => boolean;
export declare const hex2RgbColor: (hexString: string | undefined) => import("@pdfme/pdf-lib").RGB | undefined;
export declare const hex2PrintingColor: (hexString: string | undefined, colorType?: ColorType) => import("@pdfme/pdf-lib").CMYK | import("@pdfme/pdf-lib").RGB | undefined;
export declare const readFile: (input: File | FileList | null) => Promise<string | ArrayBuffer>;
export declare const createErrorElm: () => HTMLDivElement;
