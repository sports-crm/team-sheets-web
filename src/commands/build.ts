import {copy, ensureDir} from 'fs-extra';
import {resolve} from 'path';
import {
    createProgram,
    findConfigFile,
    flattenDiagnosticMessageText,
    getLineAndCharacterOfPosition,
    getPreEmitDiagnostics,
    parseJsonConfigFileContent,
    readConfigFile,
    sys
} from "typescript";
import {Arguments, Argv} from "yargs";

const rootDir = resolve(__dirname, '../../');
const distDir = resolve(rootDir, 'dist');
const srcDir = resolve(rootDir, 'src');

function compileServer() {
    const configFileName = findConfigFile(rootDir, sys.fileExists, 'tsconfig.json') || "tsconfig.json";
    const configFile = readConfigFile(configFileName, sys.readFile);
    const compilerOptions = parseJsonConfigFileContent(
        configFile.config,
        sys,
        rootDir
    ).options;

    compilerOptions.outDir = distDir;

    let program = createProgram([resolve(__dirname, '../server.ts')], compilerOptions);
    let emitResult = program.emit();

    let allDiagnostics = getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
}

async function copyAssets() {
    const destDir = resolve(distDir, 'assets');
    await ensureDir(destDir);
    await copy(resolve(srcDir, 'assets'), destDir);
}

async function copyConfig() {
    const destDir = resolve(distDir, 'config');
    await ensureDir(destDir);
    await copy(resolve(rootDir, 'config'), destDir);
}


export const command = 'build';
export const describe = 'Build the server';
export function builder(argv: Argv) {
    return argv;
}

export async function handler(args: Arguments<{}>) {
    compileServer();
    await copyAssets();
    await copyConfig();
}