import nodemon from 'nodemon';
import {Argv, CommandModule} from 'yargs';

export const command = 'serve [port]'

export const describe = 'start the dev server';

export function builder(yargs: Argv) {
    {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 8080
            })
    }
}

type HandlerProps = {
    port: number
}
export function handler({port}: HandlerProps) {
    nodemon({
        script: 'src/server.ts',
        watch: ['src/'],
        env: {
            NODE_ENV: 'development',
            PORT: port
        },
        ext: 'js,json,ts'
    });
}