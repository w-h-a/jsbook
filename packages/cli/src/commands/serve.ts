import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run the server on', '4005')
    .action((filename = 'notebook.js', opts: { port: string }) => {
        serve(
            parseInt(opts.port), 
            path.basename(filename), 
            path.join(process.cwd(), path.dirname(filename))
        );
    });