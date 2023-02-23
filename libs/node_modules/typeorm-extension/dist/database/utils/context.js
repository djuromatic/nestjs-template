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
exports.buildDatabaseDropContext = exports.buildDatabaseCreateContext = void 0;
const data_source_1 = require("../../data-source");
function setDatabaseContextOptions(context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!context.options) {
            const dataSource = yield (0, data_source_1.findDataSource)(context.findOptions);
            if (dataSource) {
                context.options = dataSource.options;
            }
            if (!context.options) {
                context.options = yield (0, data_source_1.buildDataSourceOptions)();
            }
        }
        Object.assign(context.options, {
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: [
                ...(process.env.NODE_ENV !== 'test' ? ['query', 'error', 'schema'] : []),
            ],
        });
        return context;
    });
}
function buildDatabaseCreateContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = context || {};
        context = yield setDatabaseContextOptions(context);
        if (typeof context.synchronize === 'undefined') {
            context.synchronize = true;
        }
        if (typeof context.ifNotExist === 'undefined') {
            context.ifNotExist = true;
        }
        return context;
    });
}
exports.buildDatabaseCreateContext = buildDatabaseCreateContext;
function buildDatabaseDropContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = context || {};
        context = yield setDatabaseContextOptions(context);
        if (typeof context.ifExist === 'undefined') {
            context.ifExist = true;
        }
        return context;
    });
}
exports.buildDatabaseDropContext = buildDatabaseDropContext;
//# sourceMappingURL=context.js.map