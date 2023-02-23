"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharsetFromDataSourceOptions = void 0;
const utils_1 = require("../../../utils");
function getCharsetFromDataSourceOptions(options) {
    var _a;
    if ((0, utils_1.hasOwnProperty)(options, 'charset') &&
        typeof options.charset === 'string') {
        return options.charset;
    }
    if (typeof ((_a = options === null || options === void 0 ? void 0 : options.extra) === null || _a === void 0 ? void 0 : _a.charset) === 'string') {
        return options.extra.charset;
    }
    return undefined;
}
exports.getCharsetFromDataSourceOptions = getCharsetFromDataSourceOptions;
//# sourceMappingURL=charset.js.map