import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 生成主入口文件 */
export default function createMain() {
    /** 生成 vue 主逻辑文件 */

    writeFileSync(
        `${initData.name}/main.ts`,
        `import { createApp } from "vue";
import App from "./static/app";
import * as CustomUI from './index';
const app = createApp(App);

app.use(CustomUI);

app.mount("#app");`,
    );
}
