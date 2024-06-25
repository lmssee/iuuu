import { writeJsonFile } from 'ismi-node-tools';
import initData from '../initData';

/** 添加 package.json 文件 */
export function createPackage() {
  writeJsonFile(`${initData.name}/package.json`, {
    name: initData.name,
    version: '0.0.0',
    type: 'module',
    // private: 'true',
    author: '您的大名',
    license: 'ISC',
    description: '这是你的项目描述呀',
    main: 'out/index.cjs',
    module: 'out/index.mjs',
    typings: 'types/index.d.ts',
    exports: {
      '.': {
        import: {
          default: './exportMjs/index.mjs',
          types: './exportTypes/index.d.ts',
        },
        require: {
          default: './exportCjs/index.cjs',
          types: './exportTypes/index.d.ts',
        },
      },
    },
    scripts: {
      build: `echo '构建部分' && vite build && tsc -p tsconfig.types.json && npx iuuu mc`,
      create: "echo  '添加一个组件' &&  npx iuuu create",
      clean: 'npx ixxx rm  node_modules package-lock.json run install',
      clear: 'npx ixxx rm exportMjs exportCjs exportTypes',
      dev: "echo '测试' && vite",
      format: 'npm run prettier',
      lint: 'eslint . --ext .vue, .js, .jsx , .cjs, .mjs, .ts ,.tsx ,.cts, mts, --fix --ignore-path .gitignore',
      prettier: 'npx prettier . --write',
      'type-check': 'vue-tsc --build --force',
      test: 'vitest',
      up: `echo \'更新 npm 包\' && npx ixxx up -n`,
    },
    files: ['exportMjs', 'exportTypes', 'exportCjs'],
    repository: {
      type: 'git',
      url: 'git+https://github.com/...',
    },
    keywords: [initData.name],
    homepage: 'https://....github.io/',
    bugs: {
      url: 'https://github.com/.../.../issues',
      email: '...@....com',
    },
    publishConfig: initData.publishConfig,
    devDependencies: initData.devDependencies,
    dependencies: initData.dependencies,
  });
}
