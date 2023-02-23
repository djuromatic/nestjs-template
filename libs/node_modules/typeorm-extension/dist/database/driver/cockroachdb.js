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
exports.dropCockroachDBDatabase = exports.createCockroachDBDatabase = exports.executeSimpleCockroachDBQuery = void 0;
const postgres_1 = require("./postgres");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
function executeSimpleCockroachDBQuery(connection, query, endConnection = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(((resolve, reject) => {
            connection.query(query, (queryErr, queryResult) => {
                if (endConnection) {
                    connection.end();
                }
                if (queryErr) {
                    reject(queryErr);
                }
                resolve(queryResult);
            });
        }));
    });
}
exports.executeSimpleCockroachDBQuery = executeSimpleCockroachDBQuery;
function createCockroachDBDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseCreateContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield (0, postgres_1.createSimplePostgresConnection)(driver, options, context);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/cockroachdb/CockroachQueryRunner.ts#L347
         */
        const query = `CREATE DATABASE ${context.ifNotExist ? 'IF NOT EXISTS ' : ''} "${options.database}"`;
        const result = yield executeSimpleCockroachDBQuery(connection, query);
        if (context.synchronize) {
            yield (0, utils_2.setupDatabaseSchema)(context.options);
        }
        return result;
    });
}
exports.createCockroachDBDatabase = createCockroachDBDatabase;
function dropCockroachDBDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseDropContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = yield (0, postgres_1.createSimplePostgresConnection)(driver, options, context);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/cockroachdb/CockroachQueryRunner.ts#L356
         */
        const query = `DROP DATABASE ${context.ifExist ? 'IF EXISTS ' : ''} "${options.database}"`;
        return executeSimpleCockroachDBQuery(connection, query);
    });
}
exports.dropCockroachDBDatabase = dropCockroachDBDatabase;
//# sourceMappingURL=cockroachdb.js.map