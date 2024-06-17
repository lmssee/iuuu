import { writeFileSync } from 'node:fs';
import initData from '../initData';
import { writeJsonFile } from 'ismi-node-tools';

/** 添加格式化工具 */
export default function createPrettier() {
    createPrettierIgnore();
    createPrettierrc();
}

function createPrettierIgnore() {
    writeFileSync(
        `${initData.name}/.prettierignore`,
        `# Ignore artifacts:

exportBin
exportMjs
exportCjs
exportTypes
test/out
`,
    );
}

function createPrettierrc() {
    writeJsonFile(`${initData.name}/.prettierrc`, {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
    });
}
