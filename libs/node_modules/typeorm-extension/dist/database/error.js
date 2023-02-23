"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedDriver = void 0;
class NotSupportedDriver extends Error {
    constructor(driverName) {
        super(`The driver ${driverName} is not supported yet.`);
    }
}
exports.NotSupportedDriver = NotSupportedDriver;
//# sourceMappingURL=error.js.map