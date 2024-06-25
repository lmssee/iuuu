import createRouter from './createRouter';
import createStore from './createStore';
import initData from '../initData';
import createIndexHtml from './createIndexHtml';
import createMain from './createMain';
import createApp from './createApp';
import printSome from '../../tools/printSome';

// 项目名称
let name: string;
export default function createStatic() {
  name = initData.name;
  // 生成主要的入口文件
  printSome(`请稍等，正在安装测试主入口文件：${name}/main.ts`);
  createMain();
  // 生成测试跟 html 文件
  printSome(`请稍等，正在安装测试网页主入口文件：${name}/index.html`);
  createIndexHtml();
  // 创建跟组件
  printSome(`请稍等，正在安装测试 App 跟组件文件：${name}/static/app.tsx`);
  createApp();
  printSome(`请稍等，正在安装测试路由文件：${name}/static/router/index.ts`);
  createRouter();
  printSome(`请稍等，正在安装测试数据仓储文件：${name}/static/store/test.ts`);
  createStore();
}
