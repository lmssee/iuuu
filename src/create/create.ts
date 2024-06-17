import { Color, fileExist } from 'ismi-node-tools';
import createComponent from './createComponent';
import command from '../command';
import { basename } from 'node:path';
import createData from './createData';
import { question } from 'ismi-command';
import printSome from '../tools/printSome';

export default async function create(data: { [key in string]: string[] }) {
    let targetDir;
    // 判断是否是完善的路径
    const workDir = basename(process.cwd()),
        srcDir = fileExist('src'),
        indexTsDir = fileExist('src/index.ts');

    /** 草诏该有的文件是否存在 */
    if (srcDir && srcDir.isDirectory() && indexTsDir && indexTsDir.isFile()) {
        if (data.value && data.value.length > 0) {
            targetDir = data.value[0];
        } else {
            targetDir = (await question({
                text: '请输入组件名称',
                tip: "component yin'ge'lei'si  name",
                private: true,
            })) as string;
        }
        createData.targetName = targetDir;
        createData.name = workDir;
        printSome('请稍等，马上开始');
        return await createComponent();
    }
    console.log(
        Color.yellow('项目未初始化（可参见下面的初始化方法）或未找到项目地址'),
    );
    console.log(command.help('init'));
    process.exit();
}
