import { writeFileSync } from 'node:fs';
import { createPackage } from './createPackage';
import { createTsconfig } from './createTsconfig';
import { createViteConfig } from './createViteConfig';
import initData from '../initData';
import createPrettier from './createPrettier';
import printSome from '../../tools/printSome';

let name: string;

export default () => {
    name = initData.name;

    printSome('开始添加库 vite 配置文件：'.concat('vite.config.ts'));
    // vite config
    createViteConfig();
    printSome('开始添加库  typeScript 配置文件：'.concat('tsconfig.ts'));
    createTsconfig();
    // 生成  package.json
    printSome('开始添加库配置文件：'.concat('package.json'));
    createPackage();
    // 生成 read me
    printSome('开始添加库 README 文件：'.concat('README.md'));
    writeFileSync(`${name}/README.md`, `# ${name}`);
    /// 添加热更新
    printSome('开始添加库热更新文件：'.concat('miconfig.js'));
    createMiconfig();
    // 添加 License 文件
    printSome('开始添加库 LICENSE  文件：'.concat('LICENSE'));
    createLicense();
    // 添加更新日志
    printSome('开始添加库日志文件：'.concat('CHANGELOG.md'));
    createChangeLog();
    // 添加 git ignore
    printSome('开始添加库 git 忽略文件：'.concat('.gitignore'));
    createGitIgnore();
    // 添加格式化工具
    printSome('开始添加库格式化工具文件：'.concat('.prettierignore'));
    printSome('开始添加库格式化工具文件：'.concat('.prettierrc'));
    createPrettier();
};

/// 添加热更新
function createMiconfig() {
    writeFileSync(
        `${name}/miconfig.js`,
        `
/**  请勿在函数体外添加非注释内容  */
// 配置项 https://github.com/lmssee/ihot/blob/main/%E8%87%AA%E8%BF%B0%E6%96%87%E4%BB%B6.md#配置说明
() => ({
    //  热启动相关配置
    hot: {
        // 监听文件的相对路径（这里不影响 \`cwd\` 路径， cwd 依旧相对于配置文件目录 ）
        // "base": "../${name}",
        // 监听的文件/夹，但他们内部文件变化，可触发再次启动
        watch: ["src"],
        // 打包编译文件，不监听以下文件内文件变化
        skip: ["exportMjs", "exportCjs", "exportTypes"],
        // 启动 \`code\` 的相对目录，可以为空
        // cwd: "static",
        // 执行的具体的命令
        code: "echo i am run",
        // 启动时赋予 \`code\` 的参数
        // args: ["-v"],
        // 监听变化后，相对目录在再次启动前执行的命令
        // 这个属性应与 \`watch\` 元素相同
        beforeRestart: {
            "src": "npm  run build",
        },
    },
});
`,
    );
}

/** 生成 license 文件 */
function createLicense() {
    writeFileSync(
        `${name}/LICENSE`,
        `Copyright (c) <2024> <${name}>
    Permission to use, copy, modify, and/or distribute this software for any  
    purpose with or without fee is hereby granted, provided that the above  
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES  
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF  
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR  
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES  
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN  
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF  
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
    `,
    );
}

/*** 生成日志记录文件  */
function createChangeLog() {
    const { name } = initData;
    const time = new Date();
    const day = time.getDate(),
        month = time.getMonth() + 1,
        year = time.getFullYear();
    writeFileSync(
        `${name}/CHANGELOG.md`,
        `# ${name} 

## 0.0.0 (${month} 月 ${day} 日 ${year} 年)

- init this project
`,
    );
}

/** 生成 git ignore 文件 */
function createGitIgnore() {
    writeFileSync(
        `${name}/.gitignore`,
        `# dependencies 依赖文件
node_modules

# build file 打包文件
exportMjs
exportCjs
exportTypes
# mac  
.DS_Store

`,
    );
}
