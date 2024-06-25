import { writeFileSync } from 'node:fs';
import initData from '../initData';
import printSome from '../../tools/printSome';

/** 组件库名称 */
let name: string;

/** 添加组件库表  */
export default () => {
  name = initData.name;
  printSome('开始写入 index 文件：'.concat(name).concat('/index.ts'));
  // 新增 index.ts
  createIndex();
  /** 写入模块组的统一导出 */
  printSome('开始写入统一导出文件：'.concat(name).concat('/src/index.ts'));
  writeFileSync(`${name}/src/index.ts`, '');
};

/** 新增  index 文件
 *
 *
 * 这里是模块导出的根路径
 */
function createIndex() {
  writeFileSync(
    `${name}/index.ts`,
    `import * as components from './src/index';
export * from './src/index';
import type { App } from 'vue';

/** 
 *  也可以将其他模块， type 在这里进行导出
 */
export const install = function (app: App) {
    for (const key in components) {
        const element: any = (components as any)[key];
        if (element.install)
            app.use(element);
    }

    return app;
}

export default {
    install
}`,
  );
}
