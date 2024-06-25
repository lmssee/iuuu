import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 添加 mi config  */
export default function createMiconfig() {
  const { name } = initData;
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
