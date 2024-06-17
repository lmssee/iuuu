import { writeJsonFile } from 'ismi-node-tools';
import initData from '../initData';

/** 生成 ts config  文件 */
export function createTsconfig() {
    // 打包为类型声明文件的数据
    createTypeConfig();

    createConfig();
}

// 打包为类型声明文件的数据
function createTypeConfig() {
    // 打包为类型声明文件的数据
    const typesFileData = {
        extends: './tsconfig.json',
        compilerOptions: {
            // 打包类型声明
            emitDeclarationOnly: true,
            esModuleInterop: true,
            declaration: true,
            declarationDir: 'exportTypes/',
        },
        exclude: [
            'node_modules',
            'exportTypes',
            'static',
            'main.ts',
            'vite.config.ts',
        ],
    };
    writeJsonFile(`${initData.name}/tsconfig.types.json`, typesFileData);
}

/** 标准的 ts 配置 */
function createConfig() {
    const fileData = {
        compilerOptions: {
            allowSyntheticDefaultImports: true,
            baseUrl: '.',
            importHelpers: true,
            jsx: 'preserve',
            jsxImportSource: 'vue',
            lib: ['ESNext', 'DOM'],
            moduleResolution: 'Node',
            module: 'ESNext',
            strict: true,
            target: 'ESNext',
            skipLibCheck: true,
            esModuleInterop: true,
            sourceMap: false,
        },
        include: [
            'main.ts',
            'static/app.tsx',
            'src/index.ts',
            'src/**/**/*.tsx',
            'src/**/**/*.ts',
            'src/tools/**/*.ts',
            'index.ts',
        ],
        exclude: ['node_modules', 'exportTypes'],
    };
    writeJsonFile(`${initData.name}/tsconfig.json`, fileData);
}
