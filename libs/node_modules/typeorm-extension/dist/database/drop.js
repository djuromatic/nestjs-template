"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = void 0;
const driver_1 = require("./driver");
const error_1 = require("./error");
const utils_1 = require("./utils");
/**
 * Drop database for specified driver in ConnectionOptions.
 *
 * @throws NotSupportedDriver
 *
 * @param context
 */
function dropDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_1.buildDatabaseDropContext)(context);
        if (!context.options.type) {
            throw new error_1.NotSupportedDriver(context.options.type);
        }
        switch (context.options.type) {
            case 'mysql':
            case 'mariadb':
                return (0, driver_1.dropMySQLDatabase)(context);
            case 'postgres':
                return (0, driver_1.dropPostgresDatabase)(context);
            case 'cockroachdb':
                return (0, driver_1.dropCockroachDBDatabase)(context);
            case 'sqlite':
            case 'better-sqlite3':
                return (0, driver_1.dropSQLiteDatabase)(context);
            case 'oracle':
                return (0, driver_1.dropOracleDatabase)(context);
            case 'mssql':
                return (0, driver_1.dropMsSQLDatabase)(context);
        }
        throw new error_1.NotSupportedDriver(context.options.type);
    });
}
exports.dropDatabase = dropDatabase;
//# sourceMappingURL=drop.js.map