import { writeJsonFile } from 'ismi-node-tools';
import initData from '../initData';

/** 生成 ts config  文件 */
export function createTsconfig() {
  // 打包为类型声明文件的数据
  createTypeConfig();
  // 标准的 typeScript config 文件
  createConfig();
  // vitest typeScript config
  createVitestConfig();

  // 生成一个 node typeScript config
  createNodeConfig();
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
      'vitest.config.ts',
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
      'src/**/**/*.ts',
      'src/**/**/*.tsx',
      'static/**/**/*.ts',
      'static/**/**/*.tsx',
      'src/tools/**/*.ts',
      'index.ts',
    ],
    exclude: ['node_modules', 'exportTypes'],
  };
  writeJsonFile(`${initData.name}/tsconfig.json`, fileData);
}

/** 创建 vite test typeScript config 文件 */
function createVitestConfig() {
  writeJsonFile(`${initData.name}/tsconfig.vitest.json`, {
    extends: './tsconfig.json',
    compilerOptions: {
      types: ['node', 'jsdom'],
    },
  });
}

/** 创建 node typeScript config 文件 */
function createNodeConfig() {
  writeJsonFile(`${initData.name}/tsconfig.node.json`, {
    extends: './tsconfig.json',
    compilerOptions: {
      composite: true,
      noEmit: true,
      module: 'ESNExt',
      moduleResolution: 'Bundler',
      types: ['node'],
    },
  });
}
