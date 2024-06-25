import { writeFileSync } from 'node:fs';
import initData from '../initData';

/** 添加 app.ts 文件 */
export default function createApp() {
  const { name } = initData;
  writeFileSync(
    `${name}/static/app.tsx`,
    `import {defineComponent} from 'vue';
import { TestButton } from '../index';

export default defineComponent({
    name:"app",
    setup(){
        return ()=>  (<>
        <div>
            
        </div>
         <div>
            <router-view></router-view>        
         </div>
        </>)
    }
})`,
  );
}
