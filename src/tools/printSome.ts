import { Color } from 'ismi-node-tools';

/**  打印消息 */
export default function printSome(message: string) {
  console.log(Color.random(new Date().toLocaleTimeString()), message);
}
