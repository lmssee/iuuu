import { writeFileSync } from 'node:fs';
import { createPackage } from './createPackage';
import { createTsconfig } from './createTsconfig';
import { createViteConfig } from './createViteConfig';
import initData from '../initData';
import createPrettier from './createPrettier';
import printSome from '../../tools/printSome';
import { createLicense } from './createLicense';
import createGitIgnore from './createGitIgnore';
import createChangeLog from './createChangeLog';
import createMiconfig from './createMiconfig';
import createEslint from './createEslint';

export default () => {
  const name = initData.name;

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
  /** 生成 license 文件 */
  createLicense();
  // 添加更新日志
  printSome('开始添加库日志文件：'.concat('CHANGELOG.md'));
  /*** 生成日志记录文件  */
  createChangeLog();
  // 添加 git ignore
  printSome('开始添加库 git 忽略文件：'.concat('.gitignore'));

  /** 生成 git ignore 文件 */
  createGitIgnore();
  // 添加格式化工具
  printSome('开始添加库格式化工具文件：'.concat('.prettierignore'));
  printSome('开始添加库格式化工具文件：'.concat('.prettierrc'));
  createPrettier();
  printSome('开始添加 eslint 配置文件');
  createEslint();
};
