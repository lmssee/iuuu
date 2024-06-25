import { question } from 'ismi-command';
import dirIsExist from '../tools/dirIsExist';
import initData from './initData';
import { Color, getDirectoryBy, initializeFile, pathJoin, runOtherCode } from 'ismi-node-tools';
import { copyFileSync, mkdirSync } from 'node:fs';
import createLibrary from './source/initSource';
import createReadMe from './package/createReadMe';
import createStatic from './static/createStatic';
import printSome from '../tools/printSome';

/// 初始化当前目录
const [__filename, __dirname] = initializeFile();
/** 项目名称 */
let name: string;

/** 初始化配置
 *
 * 当用户输入了包名，直接创建，当用户没有输入包名
 *
 * 则询问用户报名
 */
export default async (data: {
  [key in string]?: (string | boolean | number)[];
}) => {
  let projectName: string;
  if (!data['value']) {
    // 获取用户想创建的用户名称
    projectName = (await question({
      text: '请问您的项目名称',
      tip: '请使用英文字母',
      private: true,
    })) as string;
  } else projectName = data['value'][0].toString();
  name = initData.name = projectName;
  // 创建项目前的处理工作，若文件夹存在不为空，且用户禁止覆盖直接在方法退出程序
  await dirIsExist(projectName);
  console.log('已经开始喽，等下马上就好');
  // 生成所需的路径
  initData.dirList.forEach(currentEle => {
    printSome(currentEle.message);
    mkdirSync(currentEle.path);
  });
  // 添加配置文件
  createReadMe();
  /// 获取当前文件的路径
  const nowDir = getDirectoryBy('assets', 'directory', __filename) as string;
  printSome('开始添加网站图标：'.concat(name).concat('/public/favicon.ico'));
  /// 将
  copyFileSync(pathJoin(nowDir, 'assets/temporary.ico'), `./${name}/public/favicon.ico`);
  // 增加项目的文件
  createLibrary();
  // 新增项目的测试文件
  createStatic();
  printSome('请稍等，帮您安装依赖');
  await runOtherCode({ code: 'npm install', cwd: name });
  printSome('请稍等，正在初始化测试组件：'.concat('TestButton'));
  await runOtherCode({
    code: 'npx iuuu c test-button',
    cwd: `${name}`,
  });
  console.log(Color.cyan('构建完毕，您可以使用以下命令进行下一步操作：'));
  console.log();
  console.log(Color.darkMagenta(`cd ${name}`));
  console.log();
  console.log('启动测试服务  '.concat(Color.green('npm run dev')));
};
