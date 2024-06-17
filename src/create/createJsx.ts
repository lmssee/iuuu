import { writeFileSync } from 'node:fs';
import createData from './createData';

/** 导出组件的 jsx 主文件  */
export function createJsx() {
    const { targetDir, targetName, className } = createData;
    // 写入组件的 jsx 文件
    writeFileSync(
        `${targetDir}/${targetName}.tsx`,
        `import  {defineComponent, ref} from 'vue';
import type { App } from "vue";
import './${targetName}.scss';

/**  组件 ${targetName} 内容部分   */
const ${targetName}  =  defineComponent({
name:"${targetName}",
setup(props, ctx) {
    /** 点击计数  */
    const clickCount = ref(0);
    /// 点击计数重置
    const resetCount = (event: any) => (
      event.preventDefault(),
      event.stopPropagation(),
      (clickCount.value = 0),
      false
    );
    return ()=> ( <button class={'${className}_class'} 
        onClick={() => clickCount.value++}
        onContextmenu={resetCount}>
         {clickCount.value == 0
          ? '测试按钮'
          : '您点击了 ' + clickCount.value + ' 下'}
          </button>);
}
});

${targetName}.install = function (app: App) {
app.component(${targetName}.name as string, ${targetName});
return app;
};

export { ${targetName} };
`,
    );
}
