"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyDataSourceOptionsForRuntimeEnvironment = exports.modifyDataSourceOptionForRuntimeEnvironment = exports.changeTSToJSPath = void 0;
const utils_1 = require("../../utils");
function changeTSToJSPath(raw, options) {
    const isArray = Array.isArray(raw);
    const value = Array.isArray(raw) ? raw : [raw];
    options !== null && options !== void 0 ? options : (options = {});
    options.src = options.src || 'src';
    options.dist = options.dist || 'dist';
    for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
            if (value[i].indexOf(options.src) !== -1 &&
                value[i].indexOf(options.dist) === -1) {
                const lastIndex = value[i].lastIndexOf(options.src);
                value[i] = value[i].substring(0, lastIndex) +
                    options.dist +
                    value[i].substring(lastIndex + options.src.length);
            }
            let lastPart;
            if (value[i].indexOf('\\') !== -1) {
                lastPart = value[i].split('\\').pop();
            }
            else {
                lastPart = value[i].split('/').pop();
            }
            if (
            // ignore pattern paths
            value[i].indexOf('*') === -1 &&
                lastPart.indexOf('ts') !== -1 &&
                lastPart.indexOf('js') === -1) {
                value[i] = value[i]
                    .replace('ts', 'js');
            }
        }
    }
    return isArray ? value : value[0];
}
exports.changeTSToJSPath = changeTSToJSPath;
function modifyDataSourceOptionForRuntimeEnvironment(options, key, pathOptions) {
    if (!(0, utils_1.hasOwnProperty)(options, key) ||
        (0, utils_1.isTsNodeRuntimeEnvironment)()) {
        return options;
    }
    switch (key) {
        case 'entities':
        case 'migrations':
        case 'subscribers':
        case 'seeds':
        case 'factories': {
            options[key] = changeTSToJSPath(options[key], pathOptions);
            break;
        }
    }
    return options;
}
exports.modifyDataSourceOptionForRuntimeEnvironment = modifyDataSourceOptionForRuntimeEnvironment;
function modifyDataSourceOptionsForRuntimeEnvironment(connectionOptions, options) {
    const keys = Object.keys(connectionOptions);
    for (let i = 0; i < keys.length; i++) {
        connectionOptions = modifyDataSourceOptionForRuntimeEnvironment(connectionOptions, keys[i], options);
    }
    return connectionOptions;
}
exports.modifyDataSourceOptionsForRuntimeEnvironment = modifyDataSourceOptionsForRuntimeEnvironment;
//# sourceMappingURL=utils.js.map