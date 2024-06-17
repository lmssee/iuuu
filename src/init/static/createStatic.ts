import initData from '../initData';
import createIndexHtml from './createIndexHtml';
import createMain from './createMain';
import createApp from './createApp';
import printSome from '../../tools/printSome';

// 项目名称
let name: string;
export default () => {
    name = initData.name;

    // 生成主要的入口文件
    printSome(
        '请稍等，正在安装测试主入口文件：'.concat(name).concat('/main.ts'),
    );
    createMain();
    // 生成测试跟 html 文件
    printSome(
        '请稍等，正在安装测试网页主入口文件：'
            .concat(name)
            .concat('/index.html'),
    );
    createIndexHtml();
    // 创建跟组件
    printSome(
        '请稍等，正在安装测试 App 跟组件文件：'
            .concat(name)
            .concat('/static/app.tsx'),
    );
    createApp();
};
