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
exports.buildDataSourceOptions = exports.buildLegacyDataSourceOptions = exports.extendDataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const seeder_1 = require("../../seeder");
const utils_1 = require("./utils");
const tsconfig_1 = require("../../utils/tsconfig");
const find_1 = require("../find");
function extendDataSourceOptions(options, tsConfigDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        options = (0, seeder_1.setDefaultSeederOptions)(options);
        let { compilerOptions } = yield (0, tsconfig_1.readTsConfig)(tsConfigDirectory || process.cwd());
        compilerOptions = compilerOptions || {};
        (0, utils_1.modifyDataSourceOptionsForRuntimeEnvironment)(options, {
            dist: compilerOptions.outDir,
        });
        return options;
    });
}
exports.extendDataSourceOptions = extendDataSourceOptions;
/**
 * Build DataSourceOptions from configuration.
 *
 * @deprecated
 * @param context
 */
function buildLegacyDataSourceOptions(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const directory = context.directory || process.cwd();
        const tsconfigDirectory = context.tsconfigDirectory || process.cwd();
        const connectionOptionsReader = new typeorm_1.ConnectionOptionsReader({
            root: directory,
            configName: context.configName,
        });
        const dataSourceOptions = yield connectionOptionsReader.get(context.name || 'default');
        return extendDataSourceOptions(dataSourceOptions, tsconfigDirectory);
    });
}
exports.buildLegacyDataSourceOptions = buildLegacyDataSourceOptions;
/**
 * Build DataSourceOptions from DataSource or from configuration.
 *
 * @param context
 */
function buildDataSourceOptions(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context = context !== null && context !== void 0 ? context : {};
        const directory = context.directory || process.cwd();
        const tsconfigDirectory = context.tsconfigDirectory || process.cwd();
        const dataSource = yield (0, find_1.findDataSource)({
            directory,
            fileName: context.dataSourceName,
        });
        if (dataSource) {
            return extendDataSourceOptions(dataSource.options, tsconfigDirectory);
        }
        return buildLegacyDataSourceOptions(context);
    });
}
exports.buildDataSourceOptions = buildDataSourceOptions;
//# sourceMappingURL=module.js.map