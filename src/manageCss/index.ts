import { pathJoin } from 'ismi-node-tools';
import { searchFiles } from './searchFiles';

/** 导出整理 css 分包导入问题 */
export function manageCss() {
    searchFiles(pathJoin(process.cwd(), 'exportMjs/src'));
    searchFiles(pathJoin(process.cwd(), 'exportCjs/src'));
}
