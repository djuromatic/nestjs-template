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
exports.dropMySQLDatabase = exports.createMySQLDatabase = exports.executeSimpleMysqlQuery = exports.createSimpleMySQLConnection = void 0;
const utils_1 = require("./utils");
const utils_2 = require("../utils");
function createSimpleMySQLConnection(driver, options) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * mysql|mysql2 library
         */
        const { createConnection } = driver.mysql;
        const option = Object.assign({ host: options.host, user: options.user, password: options.password, port: options.port, ssl: options.ssl }, (options.extra ? options.extra : {}));
        return createConnection(option);
    });
}
exports.createSimpleMySQLConnection = createSimpleMySQLConnection;
function executeSimpleMysqlQuery(connection, query, endConnection = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(((resolve, reject) => {
            connection.query(query, (queryErr, queryResult) => {
                if (endConnection)
                    connection.end();
                if (queryErr) {
                    reject(queryErr);
                }
                resolve(queryResult);
            });
        }));
    });
}
exports.executeSimpleMysqlQuery = executeSimpleMysqlQuery;
function createMySQLDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseCreateContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield createSimpleMySQLConnection(driver, options);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/mysql/MysqlQueryRunner.ts#L297
         */
        let query = context.ifNotExist ?
            `CREATE DATABASE IF NOT EXISTS \`${options.database}\`` :
            `CREATE DATABASE \`${options.database}\``;
        if (typeof options.charset === 'string') {
            const { charset } = options;
            let { characterSet } = options;
            if (typeof characterSet === 'undefined') {
                if (charset.toLowerCase().startsWith('utf8mb4')) {
                    characterSet = 'utf8mb4';
                }
                else if (charset.toLowerCase().startsWith('utf8')) {
                    characterSet = 'utf8';
                }
            }
            if (typeof characterSet === 'string') {
                query += ` CHARACTER SET ${characterSet} COLLATE ${charset}`;
            }
        }
        const result = yield executeSimpleMysqlQuery(connection, query);
        if (context.synchronize) {
            yield (0, utils_2.setupDatabaseSchema)(context.options);
        }
        return result;
    });
}
exports.createMySQLDatabase = createMySQLDatabase;
function dropMySQLDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseDropContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield createSimpleMySQLConnection(driver, options);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/mysql/MysqlQueryRunner.ts#L306
         */
        const query = context.ifExist ?
            `DROP DATABASE IF EXISTS \`${options.database}\`` :
            `DROP DATABASE \`${options.database}\``;
        yield executeSimpleMysqlQuery(connection, 'SET FOREIGN_KEY_CHECKS=0;', false);
        const result = yield executeSimpleMysqlQuery(connection, query, false);
        yield executeSimpleMysqlQuery(connection, 'SET FOREIGN_KEY_CHECKS=1;');
        return result;
    });
}
exports.dropMySQLDatabase = dropMySQLDatabase;
//# sourceMappingURL=mysql.js.map