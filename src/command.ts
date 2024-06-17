import { Command } from 'ismi-command';

const command: Command = new Command('iuuu');

command
  .bind({
    'init  <i>  (初始化一个 vue 项目)': '',
    'create <c> (新增一个 vue 模块)': '',
  })
  .run();

export default command;
