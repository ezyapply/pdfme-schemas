"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const common_1 = require("@pdfme/common");
const text_1 = __importDefault(require("../text"));
const constants_js_1 = require("../constants.js");
const uiRender_1 = require("../text/uiRender");
const helper_js_1 = require("../text/helper.js");
const constants_js_2 = require("../text/constants.js");
const extraFormatter_1 = require("../text/extraFormatter");
const getLocale = (lang) => ({ en: undefined, zh: locale_1.zhCN, ja: locale_1.ja, ko: locale_1.ko, ar: locale_1.ar, th: locale_1.th, pl: locale_1.pl, it: locale_1.it, de: locale_1.de, es: locale_1.es, fr: locale_1.fr }[lang]);
const getPlugin = ({ type, defaultFormat, icon, inputType, formatsByLang, }) => {
    const plugin = {
        ui: async (arg) => {
            const { schema, value, onChange, rootElement, mode, options, _cache } = arg;
            rootElement.innerHTML = '';
            const font = options?.font || (0, common_1.getDefaultFont)();
            const fontKitFont = await (0, helper_js_1.getFontKitFont)(schema.fontName, font, _cache);
            const { topAdj, bottomAdj } = (0, helper_js_1.getBrowserVerticalFontAdjustments)(fontKitFont, schema.fontSize ?? constants_js_2.DEFAULT_FONT_SIZE, constants_js_2.DEFAULT_LINE_HEIGHT, schema.verticalAlignment ?? constants_js_2.DEFAULT_VERTICAL_ALIGNMENT);
            const topAdjustment = topAdj.toString();
            const bottomAdjustment = bottomAdj.toString();
            const textStyle = {
                fontFamily: schema.fontName ? `'${schema.fontName}'` : 'inherit',
                color: schema.fontColor ?? constants_js_2.DEFAULT_FONT_COLOR,
                fontSize: `${schema.fontSize ?? constants_js_2.DEFAULT_FONT_SIZE}pt`,
                letterSpacing: `${schema.characterSpacing ?? constants_js_2.DEFAULT_CHARACTER_SPACING}pt`,
                textAlign: schema.alignment ?? constants_js_2.DEFAULT_ALIGNMENT,
                backgroundColor: (0, uiRender_1.getBackgroundColor)(value, schema),
                margin: '0',
                width: `${schema.width}mm`,
                height: `${schema.height}mm`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: (0, uiRender_1.mapVerticalAlignToFlex)(schema.verticalAlignment),
                paddingTop: `${topAdjustment}px`,
                marginBottom: `${bottomAdjustment}px`,
                position: 'relative',
            };
            const textElement = document.createElement('p');
            Object.assign(textElement.style, textStyle);
            rootElement.appendChild(textElement);
            textElement.textContent = value
                ? (0, date_fns_1.format)(type === 'time' ? new Date(`2021-01-01T${value}`) : new Date(value), schema.format, { locale: getLocale(options?.lang || 'en') })
                : '';
            if (mode !== 'viewer' && !(mode === 'form' && schema.readOnly)) {
                const dateTimeInput = document.createElement('input');
                dateTimeInput.type = inputType;
                dateTimeInput.value = value;
                const dateTimeInputStyle = {
                    ...textStyle,
                    opacity: '0',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    border: 'none',
                    zIndex: '-1',
                };
                Object.assign(dateTimeInput.style, dateTimeInputStyle);
                rootElement.appendChild(dateTimeInput);
                textElement.style.cursor = 'pointer';
                textElement.addEventListener('click', () => {
                    dateTimeInput.showPicker();
                    textElement.style.opacity = '0';
                    dateTimeInput.style.opacity = '1';
                    dateTimeInput.style.zIndex = '1';
                });
                dateTimeInput.addEventListener('change', (e) => {
                    if (onChange && e.target instanceof HTMLInputElement) {
                        onChange({ key: 'content', value: e.target.value });
                    }
                });
                dateTimeInput.addEventListener('blur', () => {
                    textElement.style.opacity = '1';
                    dateTimeInput.style.opacity = '0';
                    dateTimeInput.style.zIndex = '-1';
                });
                const removeButton = document.createElement('button');
                removeButton.textContent = 'x';
                const buttonWidth = 30;
                const removeButtonStyle = {
                    position: 'absolute',
                    top: '0px',
                    right: `-${buttonWidth}px`,
                    padding: '5px',
                    width: `${buttonWidth}px`,
                    height: `${buttonWidth}px`,
                };
                Object.assign(removeButton.style, removeButtonStyle);
                removeButton.addEventListener('click', () => {
                    onChange && onChange({ key: 'content', value: '' });
                });
                rootElement.appendChild(removeButton);
            }
        },
        pdf: (arg) => {
            const { schema, value, options } = arg;
            if (!value)
                return void 0;
            const lang = (options.language || 'en');
            const locale = getLocale(lang);
            const date = schema.type === 'time' ? new Date(`2021-01-01T${value}`) : new Date(value);
            const formattedValue = (0, date_fns_1.format)(date, schema.format, { locale });
            return text_1.default.pdf(Object.assign(arg, {
                value: formattedValue,
                schema: { ...schema, lineHeight: constants_js_2.DEFAULT_LINE_HEIGHT },
            }));
        },
        propPanel: {
            schema: ({ options, i18n }) => {
                const font = options.font || { [common_1.DEFAULT_FONT_NAME]: { data: '', fallback: true } };
                const lang = options.lang || 'en';
                const locale = getLocale(lang);
                const fontNames = Object.keys(font);
                const fallbackFontName = (0, common_1.getFallbackFontName)(font);
                const formatter = (0, extraFormatter_1.getExtraFormatterSchema)(i18n);
                formatter.buttons = formatter.buttons.filter((button) => button.key !== extraFormatter_1.Formatter.STRIKETHROUGH && button.key !== extraFormatter_1.Formatter.UNDERLINE);
                const currentDate = new Date();
                const dateSchema = {
                    format: {
                        title: i18n('schemas.date.format'),
                        type: 'string',
                        widget: 'select',
                        props: {
                            options: formatsByLang[lang].map((formatString) => ({
                                label: `${formatString} (${(0, date_fns_1.format)(currentDate, formatString, { locale })})`,
                                value: formatString,
                            })),
                        },
                        span: 24,
                    },
                    fontName: {
                        title: i18n('schemas.text.fontName'),
                        type: 'string',
                        widget: 'select',
                        default: fallbackFontName,
                        props: { options: fontNames.map((name) => ({ label: name, value: name })) },
                        span: 12,
                    },
                    fontSize: {
                        title: i18n('schemas.text.size'),
                        type: 'number',
                        widget: 'inputNumber',
                        span: 6,
                        props: { min: 0 },
                    },
                    characterSpacing: {
                        title: i18n('schemas.text.spacing'),
                        type: 'number',
                        widget: 'inputNumber',
                        span: 6,
                        props: { min: 0 },
                    },
                    formatter,
                    fontColor: {
                        title: i18n('schemas.textColor'),
                        type: 'string',
                        widget: 'color',
                        rules: [
                            {
                                pattern: constants_js_1.HEX_COLOR_PATTERN,
                                message: i18n('validation.hexColor'),
                            },
                        ],
                    },
                    backgroundColor: {
                        title: i18n('schemas.bgColor'),
                        type: 'string',
                        widget: 'color',
                        rules: [
                            {
                                pattern: constants_js_1.HEX_COLOR_PATTERN,
                                message: i18n('validation.hexColor'),
                            },
                        ],
                    },
                };
                return dateSchema;
            },
            defaultSchema: {
                name: '',
                format: defaultFormat,
                type,
                content: (0, date_fns_1.format)(new Date(), defaultFormat),
                position: { x: 0, y: 0 },
                width: 70,
                height: 10,
                rotate: 0,
                alignment: constants_js_2.DEFAULT_ALIGNMENT,
                verticalAlignment: constants_js_2.DEFAULT_VERTICAL_ALIGNMENT,
                fontSize: constants_js_2.DEFAULT_FONT_SIZE,
                characterSpacing: constants_js_2.DEFAULT_CHARACTER_SPACING,
                fontColor: constants_js_2.DEFAULT_FONT_COLOR,
                fontName: undefined,
                backgroundColor: '',
                opacity: constants_js_1.DEFAULT_OPACITY,
            },
        },
        icon,
    };
    return plugin;
};
exports.getPlugin = getPlugin;
//# sourceMappingURL=helper.js.map