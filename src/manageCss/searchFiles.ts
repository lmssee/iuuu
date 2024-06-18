import { fileExist, pathJoin } from 'ismi-node-tools';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'node:path';

/** 开启自动检测 */
export function searchFiles(rootPath: string) {
    // 获取参数指示的文件
    const testPthIsExist = fileExist(rootPath);
    /// 判断该文件是否存在且为目录
    if (!testPthIsExist || !testPthIsExist.isDirectory()) return;
    readdirSync(rootPath, { withFileTypes: true }).forEach(dirent => {
        const fullPath = pathJoin(rootPath, dirent.name);
        if (dirent.isDirectory()) {
            // 递归搜索子目录
            searchFiles(fullPath);
        } else if (dirent.isFile() && dirent.name.endsWith('.css')) {
            // 找到了 .css 文件
            const cssFileName = dirent.name;
            const baseFileName = parse(cssFileName).name;
            // 构建 .mjs 和 .cjs 文件的路径
            const esModuleName = pathJoin(rootPath, `${baseFileName}.mjs`);
            const commandModuleName = pathJoin(rootPath, `${baseFileName}.cjs`);
            const oldString = new RegExp(
                '\\/\\*\\s*empty\\s*css\\s*\\*\\/',
                'mg',
            );
            // 检查是否存在对应的 .mjs 或 .cjs 文件
            if (fileExist(esModuleName)) {
                // 读取 .mjs 文件内容
                let content = readFileSync(esModuleName, 'utf8');

                // 查找并替换占位符（这里假设占位符为 "/* empty css */"）
                const newString = `;import "./${cssFileName}";`;
                content = content.replace(oldString, newString);
                // 写入修改后的内容
                writeFileSync(esModuleName, content);
            }

            if (fileExist(commandModuleName)) {
                // 读取 .cjs 文件内容
                let content = readFileSync(commandModuleName, 'utf8');

                // 查找并替换占位符
                const newString = `;require("./${cssFileName}");`;
                content = content.replace(oldString, newString);

                // 写入修改后的内容
                writeFileSync(commandModuleName, content);
            }
        }
    });
}
