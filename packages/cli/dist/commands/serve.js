"use strict";
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
    .action((filename = 'notebook.js', opts) => {
    (0, local_api_1.serve)(parseInt(opts.port), path_1.default.basename(filename), path_1.default.join(process.cwd(), path_1.default.dirname(filename)));
});
