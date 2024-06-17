import { t } from 'ismi-js-tools';

const { stdout } = process;

export default function printSome(message: string) {
    console.log(new Date().toLocaleTimeString(), message);
}
