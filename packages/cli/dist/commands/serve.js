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
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run the server on', '4005')
    .action((filename = 'notebook.js', opts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, local_api_1.serve)(parseInt(opts.port), path_1.default.basename(filename), path_1.default.join(process.cwd(), path_1.default.dirname(filename)));
        console.log(`opened ${filename}. navigate to http://localhost:${opts.port} to edit.`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log('problem is that', err.message);
        }
        process.exit(1);
    }
}));
