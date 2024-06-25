/** 添加 router 文件 */

import { writeFileSync } from 'fs';
import initData from '../initData';

export default function createRouter() {
  writeFileSync(
    `${initData.name}/static/router/index.ts`,
    `import { createRouter, createWebHistory } from 'vue-router'
import  TestButtonPage  from '../page/TestButtonPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: '/', path: '/', redirect: 'testButton' }, 
    {name:"testButton", component:TestButtonPage ,path:'/TestButton'}, 
  ],
})

export default router`,
  );
}
