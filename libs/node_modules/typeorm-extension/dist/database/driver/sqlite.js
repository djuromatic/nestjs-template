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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropSQLiteDatabase = exports.createSQLiteDatabase = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const utils_2 = require("../utils");
function createSQLiteDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseCreateContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const filePath = path_1.default.isAbsolute(options.database) ?
            options.database :
            path_1.default.join(process.cwd(), options.database);
        const directoryPath = path_1.default.dirname(filePath);
        yield fs_1.default.promises.access(directoryPath, fs_1.default.constants.W_OK);
        if (context.synchronize) {
            yield (0, utils_2.setupDatabaseSchema)(context.options);
        }
    });
}
exports.createSQLiteDatabase = createSQLiteDatabase;
function dropSQLiteDatabase(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield (0, utils_2.buildDatabaseDropContext)(context);
        const options = (0, utils_1.buildDriverOptions)(context.options);
        const filePath = path_1.default.isAbsolute(options.database) ?
            options.database :
            path_1.default.join(process.cwd(), options.database);
        try {
            yield fs_1.default.promises.access(filePath, fs_1.default.constants.F_OK | fs_1.default.constants.W_OK);
            if (context.ifExist) {
                yield fs_1.default.promises.unlink(filePath);
            }
        }
        catch (e) {
            // ...
        }
    });
}
exports.dropSQLiteDatabase = dropSQLiteDatabase;
//# sourceMappingURL=sqlite.js.map