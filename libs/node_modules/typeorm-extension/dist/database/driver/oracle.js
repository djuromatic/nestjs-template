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
exports.dropOracleDatabase = exports.createOracleDatabase = exports.createSimpleOracleConnection = void 0;
const utils_1 = require("./utils");
const utils_2 = require("../utils");
function createSimpleOracleConnection(driver, options) {
    const { getConnection } = driver.oracle;
    if (!options.connectString) {
        let address = '(PROTOCOL=TCP)';
        if (options.host) {
            address += `(HOST=${options.host})`;
        }
        if (options.port) {
            address += `(PORT=${options.port})`;
        }
        let connectData = '(SERVER=DEDICATED)';
        if (options.sid) {
            connectData += `(SID=${options.sid})`;
        }
        if (options.serviceName) {
            connectData += `(SERVICE_NAME=${options.serviceName})`;
        }
        options.connectString = `(DESCRIPTION=(ADDRESS=${address})(CONNECT_DATA=${connectData}))`;
    }
    return getConnection(Object.assign({ user: options.user, password: options.password, connectString: options.connectString || options.url }, (options.extra ? options.extra : {})));
}
exports.createSimpleOracleConnection = createSimpleOracleConnection;
function createOracleDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseCreateContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const driver = (0, utils_1.createDriver)(context.options);
        const connection = createSimpleOracleConnection(driver, options);
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/oracle/OracleQueryRunner.ts#L295
         */
        const query = `CREATE DATABASE IF NOT EXISTS ${options.database}`;
        const result = yield connection.execute(query);
        if (context.synchronize) {
            yield (0, utils_2.setupDatabaseSchema)(context.options);
        }
        return result;
    });
}
exports.createOracleDatabase = createOracleDatabase;
function dropOracleDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * @link https://github.com/typeorm/typeorm/blob/master/src/driver/oracle/OracleQueryRunner.ts#L295
         */
        return Promise.resolve();
    });
}
exports.dropOracleDatabase = dropOracleDatabase;
//# sourceMappingURL=oracle.js.map