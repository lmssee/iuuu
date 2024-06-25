import { initializeFile, getDirectoryBy, readFileToJsonSync, pathJoin } from 'ismi-node-tools';

/** 获取当前工作目录 */
const [__dirname] = initializeFile();
// 获取根
let cwd = getDirectoryBy('package.json', 'file', __dirname);
if (cwd == undefined) {
  cwd = process.cwd();
}
// 获取 package.json 配置信息
const packageJsonData = readFileToJsonSync(pathJoin(cwd, 'package.json'));

export default {
  /** 项目名称 */
  name: '',
  /** 依赖版本管理 */
  dependencies: packageJsonData.dependencies,
  /**开发依赖管理 */
  devDependencies: packageJsonData.devDependencies,
  /** 发布的位置 */
  publishConfig: packageJsonData.publishConfig,
  // /** 创建测试文件地址 */
  /**
   * 构建树形目录
   */
  get dirList() {
    const name = (str: string) => this.name.concat('/').concat(str);
    return [
      {
        path: name('src'),
        message: `开始添加库目录：${name('src')}`,
      },
      {
        path: name('src/tools'),
        message: `开始添加库目录：${name('src/tools')}`,
      },
      {
        path: name('static'),
        message: `开始添加库测试目录：${name('static')}`,
      },
      {
        path: name('static/stores'),
        message: `开始添加库测试 pinia 数据仓储目录：${name('static/stores')}`,
      },
      {
        path: name('static/router'),
        message: `开始添加库测试路由目录：${name('static/router')}`,
      },
      {
        path: name('static/view'),
        message: `开始添加库测试视图目录：${name('static/view')}`,
      },
      {
        path: name('static/page'),
        message: `开始添加库测试页面目录：${name('static/page')}`,
      },
      {
        path: name('public'),
        message: `开始添加库测试 ico 文件放置目录：${name('public')}`,
      },
    ];
  },
};
