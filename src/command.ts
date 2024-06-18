import { Command } from 'ismi-command';

const command: Command = new Command('iuuu');

command
    .bind({
        'init  <i>  (初始化一个 vue 项目)': '',
        'create <c> (新增一个 vue 模块)': '',
        'manageCss <mc> (整理打包后的 css 分包引入问题)': '',
    })
    .run();

export default command;
