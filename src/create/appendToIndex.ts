import { appendFileSync, readFileSync } from 'node:fs';
import createData from './createData';
import printSome from '../tools/printSome';

/** 将组件追加到 index 做统一导出 */
export function appendToIndex() {
  const { targetName } = createData;
  /// 添加 ts 导出到 index.ts
  const indexFileName = `src/index.ts`;
  /** 导出文本展示  */
  const appendExportStr = `export {  ${targetName} } from "./${targetName}/${targetName}";`;
  // 判断当前名称的组件是否已经导出，防止二次添加
  if (readFileSync(indexFileName).toString().indexOf(appendExportStr) == -1) {
    appendFileSync(indexFileName, appendExportStr.concat('\n'));
  }
  printSome('好的，已为您添加组件 '.concat(targetName).concat(' 完毕'));
}
