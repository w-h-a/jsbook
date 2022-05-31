import path from 'path';
import { Command } from 'commander';
import { serve } from '@w-h-a/jsbook-local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('open a file for editing')
  .option('-p, --port <number>', 'port to run the server on', '4005')
  .action(async (filename = 'notebook.js', opts: { port: string }) => {
    try {
      await serve(
        parseInt(opts.port),
        path.basename(filename),
        path.join(process.cwd(), path.dirname(filename)),
        !isProduction
      );
      console.log(
        `opened ${filename}. navigate to http://localhost:${opts.port} to edit.`
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log('problem is that', err.message);
      }
      process.exit(1);
    }
  });
