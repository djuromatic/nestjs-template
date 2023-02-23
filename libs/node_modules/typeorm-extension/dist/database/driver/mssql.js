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
exports.dropMsSQLDatabase = exports.createMsSQLDatabase = exports.createSimpleMsSQLConnection = void 0;
const utils_1 = require("./utils");
const utils_2 = require("../utils");
function createSimpleMsSQLConnection(driver, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const option = Object.assign(Object.assign({ user: options.user, password: options.password, server: options.host, port: options.port || 1433 }, (options.extra ? options.extra : {})), (options.domain ? { domain: options.domain } : {}));
        yield driver.mssql.connect(option);
        return driver.mssql;
    });
}
exports.createSimpleMsSQLConnection = createSimpleMsSQLConnection;
function createMsSQLDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseCreateContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield createSimpleMsSQLConnection(driver, options);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/sqlserver/SqlServerQueryRunner.ts#L416
         */
        let query = context.ifNotExist ?
            `IF DB_ID('${options.database}') IS NULL CREATE DATABASE "${options.database}"` :
            `CREATE DATABASE "${options.database}"`;
        if (typeof options.characterSet === 'string') {
            query += ` CHARACTER SET ${options.characterSet}`;
        }
        const result = yield connection.query(query);
        if (context.synchronize) {
            yield (0, utils_2.setupDatabaseSchema)(context.options);
        }
        return result;
    });
}
exports.createMsSQLDatabase = createMsSQLDatabase;
function dropMsSQLDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseDropContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield createSimpleMsSQLConnection(driver, options);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/sqlserver/SqlServerQueryRunner.ts#L425
         */
        const query = context.ifExist ?
            `IF DB_ID('${options.database}') IS NOT NULL DROP DATABASE "${options.database}"` :
            `DROP DATABASE "${options.database}"`;
        return connection.query(query);
    });
}
exports.dropMsSQLDatabase = dropMsSQLDatabase;
//# sourceMappingURL=mssql.js.map