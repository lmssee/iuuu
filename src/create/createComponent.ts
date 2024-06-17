import { fileExist } from 'ismi-node-tools';
import { mkdirSync } from 'node:fs';
import createData from './createData';
import { appendToIndex } from './appendToIndex';
import { createScss } from './createScss';
import { createJsx } from './createJsx';
import printSome from '../tools/printSome';
import command from 'src/command';
import create from './create';

/** 创建一个组件 */
export default async function createComponent() {
    const { targetDir, targetName } = createData;
    const fileIsEx = fileExist(targetDir);
    if (fileIsEx && fileIsEx.isDirectory()) {
        printSome('抱歉，禁止添加同名组件：'.concat(targetName));
        await create({});
        return;
    }
    // 创建组件目录
    printSome('正在创建组件目录');
    mkdirSync(targetDir);
    // 创建组件 scss 文件
    printSome('正在创建组件 scss 文件');
    createScss();
    // 创建 jsx 文件
    printSome('正在创建组件 tsx 文件');
    createJsx();
    // 追加导出到 index 统一导出
    printSome('正在将组件追加到导出目录');
    appendToIndex();
}
