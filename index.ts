import { Color } from 'ismi-node-tools';
import create from 'src/create/create';
import init from 'src/init/init';
import command from 'src/command';
import { manageCss } from 'src/manageCss/index';

// 判断当前是否为结束符，若显示已结束，则没有其他动作，结束进程
command.isEnd.end;

/** 获取用户输入的参数  */
const arg: {
  [key: string]: {
    [key: string]: string[] | [];
  };
} = command.args.$map;

if (arg.init) {
  // 初始化
  init(arg.init);
} else if (arg.create) {
  // 添加组件
  create(arg.create);
} else if (arg.manageCss) {
  // 打包后整理文件
  manageCss();
} else {
  console.log(Color.darkBlack('您未使用任何有效命令').concat(Color.cyan('  可参见下面的命令列表')));
  command.help();
  process.exit();
}
