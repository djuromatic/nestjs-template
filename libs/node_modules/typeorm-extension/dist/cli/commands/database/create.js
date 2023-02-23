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
exports.DatabaseCreateCommand = void 0;
const data_source_1 = require("../../../data-source");
const database_1 = require("../../../database");
class DatabaseCreateCommand {
    constructor() {
        this.command = 'db:create';
        this.describe = 'Create database.';
    }
    builder(args) {
        return args
            .option('root', {
            alias: 'r',
            default: process.cwd(),
            describe: 'Path to the data-source / config file.',
        })
            .option('connection', {
            alias: 'c',
            default: 'default',
            describe: 'Name of the connection on which run a query.',
            deprecated: true,
        })
            .option('config', {
            alias: 'f',
            default: 'ormconfig',
            describe: 'Name of the file with the data-source configuration.',
            deprecated: true,
        })
            .option('dataSource', {
            alias: 'd',
            default: 'data-source',
            describe: 'Name of the file with the data-source.',
        })
            .option('synchronize', {
            alias: 's',
            default: 'yes',
            describe: 'Create database schema for all entities.',
            choices: ['yes', 'no'],
        })
            .option('initialDatabase', {
            describe: 'Specify the initial database to connect to.',
        });
    }
    handler(raw, exitProcess = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = raw;
            const dataSourceOptions = yield (0, data_source_1.buildDataSourceOptions)({
                name: args.connection,
                configName: args.config,
                directory: args.root,
                dataSourceName: args.dataSource,
            });
            const context = {
                ifNotExist: true,
                options: dataSourceOptions,
            };
            if (typeof args.initialDatabase === 'string' &&
                args.initialDatabase !== '') {
                context.initialDatabase = args.initialDatabase;
            }
            context.synchronize = args.synchronize === 'yes';
            yield (0, database_1.createDatabase)(context);
            if (exitProcess) {
                process.exit(0);
            }
        });
    }
}
exports.DatabaseCreateCommand = DatabaseCreateCommand;
//# sourceMappingURL=create.js.map