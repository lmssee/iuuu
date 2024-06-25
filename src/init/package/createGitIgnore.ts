import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 生成 git ignore 文件 */
export default function createGitIgnore() {
  writeFileSync(
    `${initData.name}/.gitignore`,
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
