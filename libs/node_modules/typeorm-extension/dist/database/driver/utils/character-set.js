"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterSetFromDataSourceOptions = void 0;
const utils_1 = require("../../../utils");
function getCharacterSetFromDataSourceOptions(options) {
    var _a;
    if ((0, utils_1.hasOwnProperty)(options, 'characterSet') &&
        typeof options.characterSet === 'string') {
        return options.characterSet;
    }
    if (typeof ((_a = options === null || options === void 0 ? void 0 : options.extra) === null || _a === void 0 ? void 0 : _a.characterSet) === 'string') {
        return options.extra.characterSet;
    }
    return undefined;
}
exports.getCharacterSetFromDataSourceOptions = getCharacterSetFromDataSourceOptions;
//# sourceMappingURL=character-set.js.map