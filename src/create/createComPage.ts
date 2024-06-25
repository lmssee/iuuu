import { writeFileSync } from 'fs';
import { fileExist } from 'ismi-node-tools';
import createData from './createData';
import printSome from '../tools/printSome';

/** 导出生成该生成的组件测试页面 *
 *
 */
export default function createComPage() {
  const pagePath = fileExist(`static/page`);
  /** 如果不存在  page 文件夹这不创建文件 */
  if (!pagePath || !pagePath.isDirectory()) {
    printSome('正在添加生成组件的测试页面');
    return;
  }
  /// 如果目录存在则写入
  writeFileSync(
    `static/page/${createData.targetName}Page.tsx`,
    `import {defineComponent} from 'vue';
import { ${createData.targetName} } from '../../index';

export default defineComponent({
    name:"${createData.targetName}Page",
    setup(){
        return ()=>  (<>
            <div>你好，这里是一个测试组件 ${createData.targetName}  页面</div>
            <${createData.targetName}></${createData.targetName}>
        </>)
    }
})
        
`,
  );
}
